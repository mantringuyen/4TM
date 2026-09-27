/**
 * 4TM Phase 2 QA: Public Registration Control & Global Ad System Verification Suite
 */

import { shouldDisplayAds, DEFAULT_SYSTEM_SETTINGS, SystemSettingsState } from '../shared/systemSettings';
import {
  evaluateAdEligibility,
  shouldLoadAdSenseScript,
  ensureAdSenseScriptLoaded,
  removeAdSenseScript,
  isDisallowedPathname,
  hasDisallowedUrlParams,
  VALID_TOOLS_SLUGS,
} from '../shared/ads/AdEligibility';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}${details ? `: ${details}` : ''}`);
    failed++;
  }
}

console.log('=====================================================');
console.log('Running 4TM Registration Control & Ad System QA Suite');
console.log('=====================================================');

// ----------------------------------------------------
// 1. ADMIN ADD USER SECURITY & METADATA TAMPERING AUDIT
// ----------------------------------------------------
const rootMigrationPath = path.resolve(__dirname, '../supabase/migrations/20260919000001_global_settings_and_ads.sql');
const studyMigrationPath = path.resolve(__dirname, '../products/study/supabase/migrations/20260919000001_global_settings_and_ads.sql');

const rootMigrationSql = fs.readFileSync(rootMigrationPath, 'utf8');
const studyMigrationSql = fs.readFileSync(studyMigrationPath, 'utf8');

// A. Verify check_public_registration_allowed() does NOT grant bypass on client metadata
assert(
  !rootMigrationSql.includes("(NEW.raw_user_meta_data->>'created_by_admin')::boolean = true THEN\n        RETURN NEW;"),
  'Root migration does not grant bypass on raw_user_meta_data created_by_admin'
);
assert(
  !studyMigrationSql.includes("(NEW.raw_user_meta_data->>'created_by_admin')::boolean = true THEN\n        RETURN NEW;"),
  'Study migration does not grant bypass on raw_user_meta_data created_by_admin'
);

// B. Verify server-side admin or service_role check is enforced
assert(
  rootMigrationSql.includes('public.is_admin(v_caller_id)') && rootMigrationSql.includes("'service_role'"),
  'Root migration verifies server-side public.is_admin(auth.uid()) or service_role'
);
assert(
  studyMigrationSql.includes('public.is_admin(v_caller_id)') && studyMigrationSql.includes("'service_role'"),
  'Study migration verifies server-side public.is_admin(auth.uid()) or service_role'
);

// C. Verify protect_profile_sensitive_fields protects ad_free
assert(
  rootMigrationSql.includes('NEW.ad_free := OLD.ad_free;'),
  'Root migration neutralizes client self-escalation to ad_free'
);
assert(
  studyMigrationSql.includes('NEW.ad_free := OLD.ad_free;'),
  'Study migration neutralizes client self-escalation to ad_free'
);

// D. Verify admin_update_system_setting RPC enforces public.is_admin check
assert(
  rootMigrationSql.includes('admin_update_system_setting') &&
  rootMigrationSql.includes('IF NOT public.is_admin(v_caller_id) THEN'),
  'admin_update_system_setting RPC enforces server-side is_admin check'
);

// E. Verify admin_set_user_ad_free RPC enforces public.is_admin check
assert(
  rootMigrationSql.includes('admin_set_user_ad_free') &&
  rootMigrationSql.includes('IF NOT public.is_admin(v_caller_id) THEN'),
  'admin_set_user_ad_free RPC enforces server-side is_admin check'
);

// ----------------------------------------------------
// 2. EXACTLY ONE AD POSITION PER PAGE AUDIT
// ----------------------------------------------------
const products = [
  { name: 'Root', filePath: path.resolve(__dirname, '../src/App.tsx') },
  { name: 'Study', filePath: path.resolve(__dirname, '../products/study/src/App.tsx') },
  { name: 'Ebook', filePath: path.resolve(__dirname, '../products/ebook/src/App.tsx') },
  { name: 'Tools', filePath: path.resolve(__dirname, '../products/tools/src/App.tsx') },
  { name: 'Games', filePath: path.resolve(__dirname, '../products/games/src/App.tsx') },
  { name: 'Apps', filePath: path.resolve(__dirname, '../products/apps/src/App.tsx') },
];

for (const prod of products) {
  const content = fs.readFileSync(prod.filePath, 'utf8');
  const adSlotMatches = content.match(/<AdSlot\b/g);
  const count = adSlotMatches ? adSlotMatches.length : 0;

  assert(
    count === 1,
    `Product ${prod.name} has EXACTLY ONE <AdSlot> rendered (found ${count})`
  );

  // Check that AdSlot occurs before Footer / footer
  const adSlotIdx = content.indexOf('<AdSlot');
  const footerIdx = Math.max(content.indexOf('<Footer'), content.indexOf('<footer'));

  assert(
    adSlotIdx > 0 && footerIdx > 0 && adSlotIdx < footerIdx,
    `Product ${prod.name} places <AdSlot> directly preceding Footer (Header -> Main -> AdSlot -> Footer)`
  );
}

// ----------------------------------------------------
// 3. AD-FREE ENFORCEMENT & DISPLAY LOGIC MATRIX
// ----------------------------------------------------
const defaultSettings: SystemSettingsState = { ...DEFAULT_SYSTEM_SETTINGS };

// Test 3.1: Normal user with ads enabled -> displays ads
assert(
  shouldDisplayAds('study', { id: 'user-1', ad_free: false }, defaultSettings) === true,
  'Standard user on Study with ads_enabled=true sees ads'
);

// Test 3.2: User with profiles.ad_free = true -> SUPPRESSED
assert(
  shouldDisplayAds('study', { id: 'user-vip', ad_free: true }, defaultSettings) === false,
  'User with ad_free=true suppresses ads logic-level on Study'
);
assert(
  shouldDisplayAds('ebook', { id: 'user-vip', ad_free: true }, defaultSettings) === false,
  'User with ad_free=true suppresses ads logic-level on Ebook'
);
assert(
  shouldDisplayAds('root', { id: 'user-vip', ad_free: true }, defaultSettings) === false,
  'User with ad_free=true suppresses ads logic-level on Root'
);

// Test 3.3: Master switch ads_enabled = false -> SUPPRESSED FOR ALL
const adsDisabledSettings: SystemSettingsState = {
  ...defaultSettings,
  ads_enabled: false,
};
assert(
  shouldDisplayAds('study', { id: 'user-1', ad_free: false }, adsDisabledSettings) === false,
  'Global ads_enabled=false suppresses ads for all users'
);
assert(
  shouldDisplayAds('tools', null, adsDisabledSettings) === false,
  'Global ads_enabled=false suppresses ads for anonymous visitors'
);

// Test 3.4: Provider type = 'none' -> SUPPRESSED
const noProviderSettings: SystemSettingsState = {
  ...defaultSettings,
  ad_provider: { type: 'none' },
};
assert(
  shouldDisplayAds('games', { id: 'user-1', ad_free: false }, noProviderSettings) === false,
  'ad_provider.type="none" suppresses ads logic-level'
);

// Test 3.5: Product-specific disabled -> SUPPRESSED for that product, ENABLED for others
const perProductSettings: SystemSettingsState = {
  ...defaultSettings,
  ads_products: {
    study: true,
    ebook: false, // Ebook disabled
    tools: true,
    games: false, // Games disabled
    apps: true,
    root: true,
  },
};
assert(
  shouldDisplayAds('ebook', { id: 'user-1', ad_free: false }, perProductSettings) === false,
  'Product-specific disabled (ebook=false) suppresses ads on ebook'
);
assert(
  shouldDisplayAds('games', { id: 'user-1', ad_free: false }, perProductSettings) === false,
  'Product-specific disabled (games=false) suppresses ads on games'
);
assert(
  shouldDisplayAds('study', { id: 'user-1', ad_free: false }, perProductSettings) === true,
  'Product-specific enabled (study=true) displays ads on study'
);
assert(
  shouldDisplayAds('apps', { id: 'user-1', ad_free: false }, perProductSettings) === true,
  'Product-specific enabled (apps=true) displays ads on apps'
);

// ----------------------------------------------------
// 4. REGISTRATION CONTROL LOGIC MATRIX
// ----------------------------------------------------
// Default registration state is FALSE
assert(
  DEFAULT_SYSTEM_SETTINGS.public_registration_enabled === false,
  'Default public_registration_enabled is FALSE'
);

// ----------------------------------------------------
// 5. ADSENSE AUDIT COMPLIANCE & CENTRALIZED ELIGIBILITY
// ----------------------------------------------------
// 5.1 Root ads disabled by default and ineligible for AdSense
assert(
  DEFAULT_SYSTEM_SETTINGS.ads_products.root === false,
  'Root product ads are disabled by default (ads_products.root === false)'
);
assert(
  shouldDisplayAds('root', null, DEFAULT_SYSTEM_SETTINGS) === false,
  'shouldDisplayAds("root") returns false'
);
assert(
  evaluateAdEligibility({ product: 'root', pathname: '/' }).eligible === false,
  'evaluateAdEligibility rejects Root product'
);
assert(
  shouldLoadAdSenseScript({
    product: 'root',
    pathname: '/',
    settings: {
      ...DEFAULT_SYSTEM_SETTINGS,
      ad_provider: { type: 'adsense', network: 'ca-pub-3414472167895157', slotId: '12345' },
    },
  }) === false,
  'shouldLoadAdSenseScript never loads AdSense on Root'
);

// 5.2 Static index.html files must NOT hardcode adsbygoogle.js
const htmlFilesToVerify = [
  '../index.html',
  '../products/study/index.html',
  '../products/ebook/index.html',
  '../products/tools/index.html',
];
for (const relHtml of htmlFilesToVerify) {
  const htmlContent = fs.readFileSync(path.resolve(__dirname, relHtml), 'utf8');
  assert(
    !htmlContent.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'),
    `Static HTML (${relHtml}) does not unconditionally load adsbygoogle.js`
  );
}

// 5.3 Disallowed pathnames & URL parameters rejected
const ALL_REQUIRED_DISALLOWED_ROUTES = [
  '/auth',
  '/sso',
  '/sso/handoff',
  '/callback',
  '/login',
  '/signin',
  '/signup',
  '/register',
  '/logout',
  '/reset-password',
  '/forgot-password',
  '/admin',
  '/dashboard',
  '/my-courses',
  '/404',
  '/not-found',
];

for (const badPath of ALL_REQUIRED_DISALLOWED_ROUTES) {
  assert(
    isDisallowedPathname(badPath) === true &&
      evaluateAdEligibility({ product: 'study', pathname: badPath }).eligible === false &&
      shouldLoadAdSenseScript({
        product: 'study',
        pathname: badPath,
        settings: {
          ...DEFAULT_SYSTEM_SETTINGS,
          ad_provider: { type: 'adsense', network: 'ca-pub-3414472167895157', slotId: '12345' },
        },
      }) === false,
    `Centralized eligibility rejects disallowed pathname: ${badPath}`
  );
}

const ALL_REQUIRED_DISALLOWED_PARAMS = [
  'ticket',
  'state',
  'target_origin',
  'redirect_path',
  'auth',
  'login',
  'signup',
  'register',
  'recovery',
  'error',
  'error_code',
  'error_description',
  'access_token',
  'refresh_token',
  'token_hash',
  'code',
];

for (const paramKey of ALL_REQUIRED_DISALLOWED_PARAMS) {
  const queryStr = `?${paramKey}=test_val`;
  const hashStr = `#${paramKey}=test_val`;
  assert(
    hasDisallowedUrlParams(queryStr, '') === true &&
      hasDisallowedUrlParams('', hashStr) === true &&
      evaluateAdEligibility({ product: 'study', pathname: '/', search: queryStr }).eligible === false &&
      evaluateAdEligibility({ product: 'ebook', pathname: '/', hash: hashStr }).eligible === false &&
      evaluateAdEligibility({ product: 'tools', pathname: '/', search: queryStr }).eligible === false,
    `Centralized eligibility blocks disallowed URL parameter (${paramKey}) in query and hash`
  );
}

// 5.4 Root verification (/ , /auth, /sso, unknown routes -> 0 AdSlot, 0 adsbygoogle.js)
for (const rootRoute of ['/', '/auth', '/sso', '/unknown-route']) {
  const rootRes = evaluateAdEligibility({
    product: 'root',
    pathname: rootRoute,
    settings: {
      ...DEFAULT_SYSTEM_SETTINGS,
      ad_provider: { type: 'adsense', network: 'ca-pub-3414472167895157', slotId: '12345' },
    },
  });
  assert(
    rootRes.eligible === false && rootRes.shouldLoadAdSense === false,
    `Root route (${rootRoute}) renders 0 AdSlot and 0 adsbygoogle.js`
  );
}

// 5.5 Component states (loading, auth-checking, sso, error, empty-result, modal, reader, invalid route) rejected
assert(
  evaluateAdEligibility({ product: 'study', pathname: '/', isLoading: true }).eligible === false,
  'Centralized eligibility rejects loading state'
);
assert(
  evaluateAdEligibility({ product: 'study', pathname: '/', isAuthChecking: true }).eligible === false,
  'Centralized eligibility rejects auth-checking state'
);
assert(
  evaluateAdEligibility({ product: 'study', pathname: '/', isSsoProcessing: true }).eligible === false,
  'Centralized eligibility rejects SSO processing state'
);
assert(
  evaluateAdEligibility({ product: 'ebook', pathname: '/', isError: true }).eligible === false,
  'Centralized eligibility rejects error state'
);
assert(
  evaluateAdEligibility({ product: 'tools', pathname: '/', isEmptyResult: true }).eligible === false,
  'Centralized eligibility rejects empty-result state'
);
assert(
  evaluateAdEligibility({ product: 'study', pathname: '/', isModalOpen: true }).eligible === false,
  'Centralized eligibility rejects open modal state'
);
assert(
  evaluateAdEligibility({ product: 'ebook', pathname: '/', view: 'reader', hash: '#/book/python-core-concepts-definitions/ch/0' }).eligible === false,
  'Centralized eligibility rejects Ebook reader view'
);
assert(
  evaluateAdEligibility({ product: 'study', pathname: '/course/nonexistent-course' }).eligible === false,
  'Centralized eligibility rejects unknown Study course route'
);
assert(
  evaluateAdEligibility({ product: 'tools', pathname: '/unknown-tool-slug' }).eligible === false,
  'Centralized eligibility rejects unknown Tools route'
);

// 5.6 Study public routes & lesson content readiness verification
for (const validStudyRoute of [
  '/',
  '/courses',
  '/learning-path',
  '/process',
  '/playground',
  '/free-tier',
  '/course/python',
  '/course/javascript',
  '/course/html',
  '/course/css',
  '/course/sql',
  '/course/excel',
  '/course/powerbi',
  '/course/ai',
]) {
  assert(
    evaluateAdEligibility({ product: 'study', pathname: validStudyRoute, isContentReady: true }).eligible === true,
    `Study public route is eligible for ads when content is ready: ${validStudyRoute}`
  );
}

// Lesson pages must only become eligible AFTER actual lesson content has loaded (not solely valid route)
assert(
  evaluateAdEligibility({ product: 'study', pathname: '/course/python', view: 'lesson' }).eligible === false &&
    evaluateAdEligibility({ product: 'study', pathname: '/course/python', view: 'lesson', isContentReady: false }).eligible === false,
  'Study lesson page is ineligible before actual lesson content has loaded (even when route is valid)'
);
assert(
  evaluateAdEligibility({ product: 'study', pathname: '/course/python', view: 'lesson', isContentReady: true }).eligible === true,
  'Study lesson page becomes eligible only after actual lesson content has loaded (isContentReady=true)'
);

// 5.7 Ebook verification (Catalog -> 1, Detail -> 1, Reader -> 0, Loading/Error/Empty/SSO -> 0)
assert(
  evaluateAdEligibility({ product: 'ebook', pathname: '/', hash: '#/catalog', view: 'catalog', isContentReady: true }).eligible === true,
  'Ebook catalog view is eligible for 1 bottom AdSlot'
);
assert(
  evaluateAdEligibility({ product: 'ebook', pathname: '/', hash: '#/book/python-handbook', view: 'detail', isContentReady: true }).eligible === true,
  'Ebook book detail view is eligible for 1 bottom AdSlot'
);
assert(
  evaluateAdEligibility({ product: 'ebook', pathname: '/', hash: '#/book/python-handbook/ch/0', view: 'reader', isContentReady: true }).eligible === false,
  'Ebook reader view is never eligible for ads (0 AdSlot)'
);

// 5.8 Tools verification (Homepage -> 1, Valid slug -> 1, Loading/Error/Empty/SSO/Invalid -> 0)
assert(
  evaluateAdEligibility({ product: 'tools', pathname: '/', isContentReady: true }).eligible === true,
  'Tools homepage is eligible for 1 bottom AdSlot'
);
for (const slug of Array.from(VALID_TOOLS_SLUGS).slice(0, 5)) {
  assert(
    evaluateAdEligibility({ product: 'tools', pathname: `/${slug}`, isContentReady: true }).eligible === true,
    `Tools valid slug (/${slug}) is eligible for 1 bottom AdSlot`
  );
}
assert(
  evaluateAdEligibility({ product: 'tools', pathname: '/invalid-tool-xyz', isValidRoute: true }).eligible === false,
  'Tools invalid slug is rejected even if isValidRoute prop defaults to true'
);

// 5.9 AdSense script transition safety (never remains loaded if screen becomes loading/error/auth/empty)
const adsenseSettings: SystemSettingsState = {
  ...DEFAULT_SYSTEM_SETTINGS,
  ads_enabled: true,
  ad_provider: { type: 'adsense', network: 'ca-pub-3414472167895157', slotId: '987654321' },
};
assert(
  shouldLoadAdSenseScript({
    product: 'study',
    pathname: '/courses',
    view: 'courses',
    isContentReady: true,
    settings: adsenseSettings,
  }) === true,
  'shouldLoadAdSenseScript returns true when all 9 AdSense eligibility conditions are met'
);
assert(
  shouldLoadAdSenseScript({
    product: 'study',
    pathname: '/courses',
    view: 'courses',
    isContentReady: true,
    isEmptyResult: true,
    settings: adsenseSettings,
  }) === false,
  'shouldLoadAdSenseScript returns false immediately when screen transitions to empty/loading/error/auth'
);

console.log('=====================================================');
console.log(`QA Test Summary: ${passed} Passed, ${failed} Failed`);
console.log('=====================================================');

if (failed > 0) {
  process.exit(1);
}
