/**
 * 4TM Phase 2 QA: Public Registration Control & Global Ad System Verification Suite
 */

import { shouldDisplayAds, DEFAULT_SYSTEM_SETTINGS, SystemSettingsState } from '../shared/systemSettings';
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

console.log('=====================================================');
console.log(`QA Test Summary: ${passed} Passed, ${failed} Failed`);
console.log('=====================================================');

if (failed > 0) {
  process.exit(1);
}
