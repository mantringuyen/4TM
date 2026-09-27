/**
 * 4TM Ecosystem Centralized Ad & AdSense Eligibility Engine
 * Single source of truth enforcing Google AdSense Program Policies across all products.
 */

import { SystemSettingsState, DEFAULT_SYSTEM_SETTINGS, shouldDisplayAds } from '../systemSettings';
import { AdProductKey } from './AdConfig';

export const DEFAULT_ADSENSE_CLIENT_ID = 'ca-pub-3414472167895157';

export type AdIneligibilityReason =
  | 'root_disabled'
  | 'settings_or_user_disabled'
  | 'loading_state'
  | 'auth_checking_state'
  | 'sso_processing_state'
  | 'error_state'
  | 'empty_result_state'
  | 'auth_or_modal_state'
  | 'content_not_ready'
  | 'disallowed_pathname'
  | 'sso_or_auth_url_params'
  | 'private_or_admin_view'
  | 'ebook_reader_view'
  | 'invalid_route';

export interface AdEligibilityContext {
  product: AdProductKey;
  user?: { id?: string; email?: string; ad_free?: boolean; role?: string } | null;
  settings?: SystemSettingsState;
  /** Current logical view / screen identifier within the product SPA */
  view?: string;
  /** Explicit route validity override from product router */
  isValidRoute?: boolean;
  /** True while view, data, or Suspense chunk is loading */
  isLoading?: boolean;
  /** True while authentication session is being verified */
  isAuthChecking?: boolean;
  /** True while SSO handshake or ticket exchange is in progress */
  isSsoProcessing?: boolean;
  /** True when an error state or load failure is displayed */
  isError?: boolean;
  /** True when search/filter criteria return zero results */
  isEmptyResult?: boolean;
  /** True when an authentication modal or full-screen utility modal is active */
  isModalOpen?: boolean;
  /** False before primary publisher content has finished mounting */
  isContentReady?: boolean;
  /** Optional explicit location overrides (useful for SSR/testing) */
  pathname?: string;
  search?: string;
  hash?: string;
}

export interface AdEligibilityResult {
  eligible: boolean;
  shouldLoadAdSense: boolean;
  reason?: AdIneligibilityReason;
}

/**
 * Canonical Study Course IDs
 */
export const VALID_STUDY_COURSE_IDS = new Set([
  'python',
  'javascript',
  'html',
  'css',
  'sql',
  'excel',
  'powerbi',
  'ai',
]);

/**
 * Canonical Study Public Content Views
 */
export const VALID_STUDY_PUBLIC_VIEWS = new Set([
  'home',
  'courses',
  'course-detail',
  'lesson',
  'learning-paths',
  'learning-path',
  'learning-process',
  'playground',
  'free-tier',
]);

/**
 * Canonical Study Private / Disallowed Views
 */
export const DISALLOWED_STUDY_VIEWS = new Set([
  'admin',
  'dashboard',
  'my-courses',
  '/my-courses',
  'bookmarks',
  'notes',
  'review',
  'auth',
  'sso',
  'error',
  'not-found',
  '404',
]);

/**
 * Canonical 4TM Tools Slugs & IDs (36 tools + legacy aliases)
 */
export const VALID_TOOLS_SLUGS = new Set([
  'excel-formula-explainer',
  'excel-formula-builder',
  'excel-formula-debugger',
  'dax-explainer',
  'dax-time-intelligence',
  'powerquery-m-explainer',
  'sql-join-visualizer',
  'sql-null-tester',
  'sql-query-explainer',
  'sql-formatter',
  'python-error-explainer',
  'python-structure-visualizer',
  'python-complexity-inspector',
  'pandas-expression-explorer',
  'prompt-structure-analyzer',
  'prompt-diff',
  'rag-chunking-playground',
  'json-schema-prompt-builder',
  'react-trace-visualizer',
  'prompt-defense-playground',
  'data-converter',
  'jsonpath-explorer',
  'regex-playground',
  'jwt-debugger',
  'jwt',
  'http-request-builder',
  'cron-builder',
  'encoder-decoder',
  'crypto-hasher',
  'hasher',
  'uuid-generator',
  'uuid',
  'unix-timestamp',
  'timestamp',
  'text-case-converter',
  'base64',
  'json',
  'css-specificity-calculator',
  'html-accessibility-inspector',
  'url-inspector',
  'css-layout-generator',
  'css-generator',
  'qr-generator',
]);

/**
 * Disallowed pathname segments/prefixes across all 4TM domains
 */
const DISALLOWED_PATH_PREFIXES = [
  '/auth',
  '/sso',
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
  '/api',
  '/health',
  '/404',
  '/not-found',
];

/**
 * Disallowed URL query / hash parameter keys indicating auth, SSO, recovery, or error states
 */
const DISALLOWED_URL_PARAM_KEYS = [
  'ticket',
  'state',
  'from',
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

/**
 * Checks whether a query string or hash fragment contains any auth/SSO/recovery/error parameters.
 */
export function hasDisallowedUrlParams(search = '', hash = ''): boolean {
  const cleanSearch = search.startsWith('?') ? search.substring(1) : search;
  const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;

  const checkParamString = (str: string): boolean => {
    if (!str) return false;
    // Strip leading hash-route prefix if query params are attached or if hash is key=value
    const queryPart = str.includes('?') ? str.split('?').slice(1).join('&') : str;
    const candidateStrings = [str, queryPart];

    for (const candidate of candidateStrings) {
      const lower = candidate.toLowerCase();
      if (lower.includes('type=recovery')) return true;

      const params = new URLSearchParams(candidate.replace(/^\/+/, ''));
      for (const key of DISALLOWED_URL_PARAM_KEYS) {
        if (params.has(key)) return true;
      }

      // Also check raw key= pattern in case hash combines path and fragments
      for (const key of DISALLOWED_URL_PARAM_KEYS) {
        const regex = new RegExp(`(^|[?&#])${key}=`, 'i');
        if (regex.test(candidate)) return true;
      }
    }
    return false;
  };

  return checkParamString(cleanSearch) || checkParamString(cleanHash);
}

/**
 * Checks whether a pathname matches any globally disallowed auth, SSO, admin, or private prefix.
 */
export function isDisallowedPathname(pathname: string): boolean {
  const normalized = ('/' + (pathname || '').replace(/^\/+|\/+$/g, '')).toLowerCase();
  if (normalized === '/') return false;

  for (const prefix of DISALLOWED_PATH_PREFIXES) {
    if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
      return true;
    }
  }
  return false;
}

/**
 * Validates whether a pathname (and optional hash) is a known valid public content route for a given product.
 */
export function isValidProductPublicRoute(
  product: AdProductKey,
  pathname: string,
  hash = ''
): boolean {
  const productKey = (product || '').toLowerCase();
  const cleanPath = (pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();

  if (isDisallowedPathname(pathname)) {
    return false;
  }

  if (productKey === 'root') {
    return cleanPath === '' || cleanPath === 'index.html';
  }

  if (productKey === 'study') {
    if (
      cleanPath === '' ||
      cleanPath === 'index.html' ||
      cleanPath === 'courses' ||
      cleanPath === 'learning-path' ||
      cleanPath === 'learning-paths' ||
      cleanPath === 'process' ||
      cleanPath === 'learning-process' ||
      cleanPath === 'playground' ||
      cleanPath === 'free-tier'
    ) {
      return true;
    }
    const courseMatch = cleanPath.match(/^course\/([a-z0-9_-]+)$/);
    if (courseMatch && VALID_STUDY_COURSE_IDS.has(courseMatch[1])) {
      return true;
    }
    return false;
  }

  if (productKey === 'ebook') {
    if (cleanPath !== '' && cleanPath !== 'index.html') {
      return false;
    }
    const cleanHash = (hash || '').replace(/^#\/?/, '').trim();
    if (!cleanHash || cleanHash === 'catalog') {
      return true;
    }
    // Reader view (#/book/:slug/ch/:index) is never eligible for ads
    if (/^book\/[^/]+\/ch\/\d+$/i.test(cleanHash)) {
      return false;
    }
    // Book detail view (#/book/:slug)
    if (/^book\/[^/]+$/i.test(cleanHash)) {
      return true;
    }
    return false;
  }

  if (productKey === 'tools') {
    if (cleanPath === '' || cleanPath === 'index.html' || cleanPath === 'tools') {
      return true;
    }
    const segments = cleanPath.split('/');
    if (segments.length === 1 && VALID_TOOLS_SLUGS.has(segments[0])) {
      return true;
    }
    if (segments.length === 2 && segments[0] === 'tools' && VALID_TOOLS_SLUGS.has(segments[1])) {
      return true;
    }
    return false;
  }

  // Fallback for other products (e.g. games, apps)
  return cleanPath === '' || cleanPath === 'index.html';
}

/**
 * Central reusable Ad & AdSense eligibility check for the entire 4TM ecosystem.
 */
export function evaluateAdEligibility(context: AdEligibilityContext): AdEligibilityResult {
  const productKey = (context.product || '').toLowerCase();
  const settings = context.settings || DEFAULT_SYSTEM_SETTINGS;

  // 1. Root product is an ecosystem navigation portal — Google advertising is disabled on Root
  if (productKey === 'root') {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'root_disabled',
    };
  }

  // 2. Check global switch, provider type, product switch, and user ad_free status
  if (!shouldDisplayAds(productKey, context.user, settings)) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'settings_or_user_disabled',
    };
  }

  // 3. Check explicit component lifecycle & content readiness states
  if (context.isContentReady === false) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'content_not_ready',
    };
  }

  if (context.isLoading) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'loading_state',
    };
  }

  if (context.isAuthChecking) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'auth_checking_state',
    };
  }

  if (context.isSsoProcessing) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'sso_processing_state',
    };
  }

  if (context.isError) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'error_state',
    };
  }

  if (context.isEmptyResult) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'empty_result_state',
    };
  }

  if (context.isModalOpen) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'auth_or_modal_state',
    };
  }

  if (context.isValidRoute === false) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'invalid_route',
    };
  }

  // 4. Resolve URL location (from explicit context or browser window)
  const pathname =
    context.pathname !== undefined
      ? context.pathname
      : typeof window !== 'undefined'
      ? window.location.pathname
      : '/';
  const search =
    context.search !== undefined
      ? context.search
      : typeof window !== 'undefined'
      ? window.location.search
      : '';
  const hash =
    context.hash !== undefined
      ? context.hash
      : typeof window !== 'undefined'
      ? window.location.hash
      : '';

  // 5. Reject disallowed pathnames (/auth, /sso, /sso/handoff, /admin, /dashboard, /my-courses, etc.)
  if (isDisallowedPathname(pathname)) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'disallowed_pathname',
    };
  }

  // 6. Reject SSO/auth/recovery/error query or hash parameters
  if (hasDisallowedUrlParams(search, hash)) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'sso_or_auth_url_params',
    };
  }

  // 7. Product-specific view checks
  if (productKey === 'study' && context.view) {
    const viewLower = context.view.toLowerCase();
    if (DISALLOWED_STUDY_VIEWS.has(viewLower) || !VALID_STUDY_PUBLIC_VIEWS.has(viewLower)) {
      return {
        eligible: false,
        shouldLoadAdSense: false,
        reason: viewLower === 'not-found' || viewLower === '404' ? 'invalid_route' : 'private_or_admin_view',
      };
    }
    // For lesson pages, ads must only become eligible after actual lesson content has loaded
    if (viewLower === 'lesson' && context.isContentReady !== true) {
      return {
        eligible: false,
        shouldLoadAdSense: false,
        reason: 'content_not_ready',
      };
    }
  }

  if (productKey === 'ebook') {
    const viewLower = (context.view || '').toLowerCase();
    if (viewLower === 'reader') {
      return {
        eligible: false,
        shouldLoadAdSense: false,
        reason: 'ebook_reader_view',
      };
    }
    if (viewLower && viewLower !== 'catalog' && viewLower !== 'detail') {
      return {
        eligible: false,
        shouldLoadAdSense: false,
        reason: 'invalid_route',
      };
    }
  }

  // 8. Validate URL route against product public route allowlist
  if (!isValidProductPublicRoute(productKey, pathname, hash)) {
    return {
      eligible: false,
      shouldLoadAdSense: false,
      reason: 'invalid_route',
    };
  }

  const isAdSenseProvider =
    settings.ad_provider?.type === 'adsense' &&
    Boolean(settings.ads_enabled) &&
    settings.ads_products?.[productKey] !== false;

  return {
    eligible: true,
    shouldLoadAdSense: isAdSenseProvider,
  };
}

/**
 * Boolean convenience wrapper for evaluateAdEligibility
 */
export function isAdEligible(context: AdEligibilityContext): boolean {
  return evaluateAdEligibility(context).eligible;
}

/**
 * Returns true ONLY when the current screen is eligible AND AdSense is the active provider
 */
export function shouldLoadAdSenseScript(context: AdEligibilityContext): boolean {
  return evaluateAdEligibility(context).shouldLoadAdSense;
}

let adsenseScriptPromise: Promise<boolean> | null = null;

/**
 * Removes any dynamically injected AdSense script tag if a screen transitions to an ineligible state.
 */
export function removeAdSenseScript(): void {
  adsenseScriptPromise = null;
  if (typeof document === 'undefined') return;
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  );
  scripts.forEach((s) => s.parentNode?.removeChild(s));
}

/**
 * Dynamically loads the Google AdSense script ONLY when called from an eligible content screen
 * with provider type === 'adsense'. Never loads on Root or ineligible screens.
 */
export function ensureAdSenseScriptLoaded(
  clientId: string,
  context?: AdEligibilityContext
): Promise<boolean> {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !clientId) {
    return Promise.resolve(false);
  }

  if (context && !shouldLoadAdSenseScript(context)) {
    removeAdSenseScript();
    return Promise.resolve(false);
  }

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  );
  if (existing) {
    return Promise.resolve(true);
  }

  if (adsenseScriptPromise) {
    return adsenseScriptPromise;
  }

  adsenseScriptPromise = new Promise<boolean>((resolve) => {
    try {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
        clientId
      )}`;
      script.onload = () => resolve(true);
      script.onerror = () => {
        adsenseScriptPromise = null;
        resolve(false);
      };
      document.head.appendChild(script);
    } catch {
      adsenseScriptPromise = null;
      resolve(false);
    }
  });

  return adsenseScriptPromise;
}
