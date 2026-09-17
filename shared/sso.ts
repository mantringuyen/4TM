/**
 * 4TM Ecosystem SSO Foundation Utility
 * Architecture A: Custom 4TM SSO Ticket + Exact Authorization-Request State Binding
 */

export const SSO_ALLOWED_ORIGINS = [
  'https://4tm.io.vn',
  'https://study.4tm.io.vn',
  'https://apps.4tm.io.vn',
  'https://games.4tm.io.vn',
  'https://ebook.4tm.io.vn',
  'https://tools.4tm.io.vn',
  'http://localhost:3000',
  'http://localhost:3001',
] as const;

export const SSO_STATE_STORAGE_KEY = '4tm_sso_state';
export const SSO_DOWNSTREAM_TARGET_STORAGE_KEY = '4tm_sso_downstream_target';

/**
 * Validates target origin against exact allowlist.
 * NO wildcards, substring, suffix, or URL subpath matching allowed.
 */
export function isValidSsoTargetOrigin(origin: string): boolean {
  if (!origin || typeof origin !== 'string') return false;
  const trimmed = origin.trim();
  return (SSO_ALLOWED_ORIGINS as readonly string[]).includes(trimmed);
}

/**
 * Generates a cryptographically unpredictable state nonce for authorization request binding.
 */
export function generateSsoState(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return `sso_state_${hex}`;
  }
  // Fallback for non-browser/test environments
  return `sso_state_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
}

export interface InitiateSsoRequestOptions {
  rootUrl?: string;
  targetOrigin: string;
  redirectPath?: string;
}

export interface InitiateSsoRequestResult {
  state: string;
  authUrl: string;
}

/**
 * Initiates an SSO authorization request from a peer product.
 * Stores the state in sessionStorage and returns the Root Auth redirect URL.
 */
export function initiateSsoAuthRequest(
  options: InitiateSsoRequestOptions
): InitiateSsoRequestResult {
  const { rootUrl = 'https://4tm.io.vn', targetOrigin, redirectPath = '' } = options;

  if (!isValidSsoTargetOrigin(targetOrigin)) {
    throw new Error(`Invalid target origin for SSO: ${targetOrigin}`);
  }

  const state = generateSsoState();

  if (typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.setItem(SSO_STATE_STORAGE_KEY, state);
  }

  const authUrl = `${rootUrl.replace(/\/+$/, '')}/auth?target_origin=${encodeURIComponent(
    targetOrigin
  )}&state=${encodeURIComponent(state)}${
    redirectPath ? `&redirect_path=${encodeURIComponent(redirectPath)}` : ''
  }`;

  return { state, authUrl };
}

export interface ParsedSsoCallback {
  ticket: string | null;
  state: string | null;
  rawFragmentScrubbed: boolean;
}

/**
 * Parses callback parameters (#ticket=...&state=...) from URL fragment or query string
 * and IMMEDIATELY scrubs the fragment/query from browser history BEFORE any network call.
 */
export function parseAndScrubSsoCallback(): ParsedSsoCallback {
  if (typeof window === 'undefined') {
    return { ticket: null, state: null, rawFragmentScrubbed: false };
  }

  let ticket: string | null = null;
  let state: string | null = null;

  const hash = window.location.hash ? window.location.hash.substring(1) : '';
  const search = window.location.search ? window.location.search.substring(1) : '';

  // 1. Try parsing from URL hash fragment first
  if (hash) {
    const params = new URLSearchParams(hash);
    ticket = params.get('ticket');
    state = params.get('state');
  }

  // 2. Fallback to query params if not in hash fragment
  if (!ticket && search) {
    const params = new URLSearchParams(search);
    ticket = params.get('ticket');
    state = params.get('state');
  }

  // 3. IMMEDIATELY scrub URL fragment and query parameters from history
  if ((hash || search) && typeof window.history !== 'undefined' && window.history.replaceState) {
    const cleanUrl = window.location.pathname;
    const docTitle = typeof document !== 'undefined' ? document.title : '';
    window.history.replaceState({}, docTitle, cleanUrl);
  }

  return { ticket, state, rawFragmentScrubbed: true };
}

export interface VerifyStateResult {
  valid: boolean;
  errorCategory?: string;
  error?: string;
}

/**
 * Performs strict equality comparison between received state and stored sessionStorage state.
 */
export function verifySsoState(
  receivedState: string | null,
  customExpectedState?: string | null
): VerifyStateResult {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    if (customExpectedState !== undefined) {
      if (!receivedState) {
        return {
          valid: false,
          errorCategory: 'missing_state',
          error: 'Authorization callback received empty or missing state parameter',
        };
      }
      if (!customExpectedState) {
        return {
          valid: false,
          errorCategory: 'missing_stored_state',
          error: 'No stored authorization state found in initiating browser sessionStorage',
        };
      }
      if (receivedState !== customExpectedState) {
        return {
          valid: false,
          errorCategory: 'state_mismatch',
          error: 'Callback state mismatch: received state does not match stored authorization request state',
        };
      }
      return { valid: true };
    }
    return {
      valid: false,
      errorCategory: 'session_storage_unavailable',
      error: 'sessionStorage is not available in current environment',
    };
  }

  const expectedState =
    customExpectedState !== undefined
      ? customExpectedState
      : window.sessionStorage.getItem(SSO_STATE_STORAGE_KEY);

  if (customExpectedState === undefined) {
    window.sessionStorage.removeItem(SSO_STATE_STORAGE_KEY);
  }

  if (!receivedState) {
    return {
      valid: false,
      errorCategory: 'missing_state',
      error: 'Authorization callback received empty or missing state parameter',
    };
  }

  if (!expectedState) {
    return {
      valid: false,
      errorCategory: 'missing_stored_state',
      error: 'No stored authorization state found in initiating browser sessionStorage',
    };
  }

  if (receivedState !== expectedState) {
    return {
      valid: false,
      errorCategory: 'state_mismatch',
      error: 'Callback state mismatch: received state does not match stored authorization request state',
    };
  }

  return { valid: true };
}

export interface ProcessSsoCallbackOptions {
  supabaseClient: any;
  workerUrl?: string;
  targetOrigin?: string;
  expectedState?: string;
}

export interface ProcessSsoCallbackResult {
  success: boolean;
  session?: any;
  user?: any;
  errorCategory?: string;
  error?: string;
}

/**
 * Reusable peer callback processor executing state verification, immediate URL scrubbing,
 * ticket exchange via Root Worker, and origin-scoped Supabase session creation.
 */
export async function processSsoCallback(
  options: ProcessSsoCallbackOptions
): Promise<ProcessSsoCallbackResult> {
  const { supabaseClient, workerUrl = 'https://4tm.io.vn', targetOrigin: customTargetOrigin, expectedState: customExpectedState } = options;

  // Step 1: Parse callback and IMMEDIATELY scrub URL fragment
  const { ticket, state } = parseAndScrubSsoCallback();

  if (!ticket) {
    return {
      success: false,
      errorCategory: 'missing_ticket',
      error: 'Missing SSO ticket in authorization callback',
    };
  }

  // Step 2: Perform strict state verification against sessionStorage
  const stateVerification = verifySsoState(state, customExpectedState);
  if (!stateVerification.valid) {
    // STATE MISMATCH / MISSING: ABORT IMMEDIATELY, DO NOT CALL EXCHANGE ENDPOINT
    return {
      success: false,
      errorCategory: stateVerification.errorCategory,
      error: stateVerification.error,
    };
  }

  // Step 3: Validate current window origin against allowlist
  const currentOrigin = customTargetOrigin || (typeof window !== 'undefined' ? window.location.origin : '');
  if (!isValidSsoTargetOrigin(currentOrigin)) {
    return {
      success: false,
      errorCategory: 'invalid_target_origin',
      error: `Current origin ${currentOrigin} is not an allowed SSO target origin`,
    };
  }

  // Step 4: Exchange ticket via Root Worker endpoint POST /api/sso/exchange
  const endpoint = `${workerUrl.replace(/\/+$/, '')}/api/sso/exchange`;
  let exchangeRes: Response;
  try {
    exchangeRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticket,
        target_origin: currentOrigin,
        state,
      }),
    });
  } catch (err: any) {
    return {
      success: false,
      errorCategory: 'network_error',
      error: `Failed to connect to SSO exchange endpoint: ${err?.message || 'Network error'}`,
    };
  }

  const resData = await exchangeRes.json().catch(() => ({}));

  if (!exchangeRes.ok || !resData.success || !resData.token_hash) {
    return {
      success: false,
      errorCategory: resData.errorCategory || resData.error || 'ticket_exchange_failed',
      error: resData.message || resData.error || 'SSO ticket exchange was rejected by server',
    };
  }

  // Step 5: Redeem token_hash via Supabase verifyOtp to establish fresh origin session
  if (!supabaseClient || !supabaseClient.auth || typeof supabaseClient.auth.verifyOtp !== 'function') {
    return {
      success: false,
      errorCategory: 'invalid_supabase_client',
      error: 'Provided Supabase client is invalid or missing verifyOtp method',
    };
  }

  const otpRes = await supabaseClient.auth.verifyOtp({
    token_hash: resData.token_hash,
    type: 'email',
  });

  if (otpRes.error || !otpRes.data?.session) {
    return {
      success: false,
      errorCategory: 'verify_otp_failed',
      error: otpRes.error?.message || 'Failed to verify OTP token hash with Supabase Auth',
    };
  }

  return {
    success: true,
    session: otpRes.data.session,
    user: otpRes.data.user,
  };
}

export interface IssuePeerRootHandoffOptions {
  supabaseClient: any;
  state?: string;
  targetOrigin?: string;
  rootUrl?: string;
  redirectPath?: string;
}

export interface IssuePeerRootHandoffResult {
  success: boolean;
  ticket?: string;
  state?: string;
  redirectUrl?: string;
  errorCategory?: string;
  error?: string;
}

/**
 * Initiates an authenticated peer-to-Root SSO handoff.
 * If a state nonce is provided from Root (SP-initiated), it uses that state.
 * Otherwise generates a new state nonce.
 * Calls issue_root_handoff_ticket(state) on the authenticated peer session.
 * The returned ticket is hardcoded in the DB to target https://4tm.io.vn.
 */
export async function issuePeerRootHandoff(
  options: IssuePeerRootHandoffOptions
): Promise<IssuePeerRootHandoffResult> {
  const {
    supabaseClient,
    state: customState,
    targetOrigin,
    rootUrl = 'https://4tm.io.vn',
    redirectPath = '',
  } = options;

  if (!supabaseClient || !supabaseClient.auth || typeof supabaseClient.rpc !== 'function') {
    return {
      success: false,
      errorCategory: 'invalid_supabase_client',
      error: 'Invalid or uninitialized Supabase client',
    };
  }

  const { data: userData, error: userError } = await supabaseClient.auth.getUser();
  if (userError || !userData?.user) {
    return {
      success: false,
      errorCategory: 'unauthenticated',
      error: 'Active authentication session required on peer to issue handoff ticket',
    };
  }

  // Use Root-provided state for SP-initiated flow or generate one
  const state = customState || generateSsoState();

  if (typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.setItem(SSO_STATE_STORAGE_KEY, state);
  }

  // Call the database function issue_root_handoff_ticket (granted to authenticated)
  const { data: rawTicket, error: rpcError } = await supabaseClient.rpc(
    'issue_root_handoff_ticket',
    { p_state: state }
  );

  if (rpcError || !rawTicket || typeof rawTicket !== 'string') {
    return {
      success: false,
      errorCategory: 'rpc_handoff_failed',
      error: rpcError?.message || 'Failed to issue Root handoff ticket from peer session',
    };
  }

  // If a downstream target origin is requested (Peer -> Peer via Root), pass target_origin query param
  let targetParam = '';
  if (targetOrigin && targetOrigin !== rootUrl && isValidSsoTargetOrigin(targetOrigin)) {
    targetParam = `&target_origin=${encodeURIComponent(targetOrigin)}`;
  }
  const pathParam = redirectPath ? `&redirect_path=${encodeURIComponent(redirectPath)}` : '';

  const redirectUrl = `${rootUrl.replace(/\/+$/, '')}/auth#ticket=${encodeURIComponent(
    rawTicket
  )}&state=${encodeURIComponent(state)}${targetParam}${pathParam}`;

  return {
    success: true,
    ticket: rawTicket,
    state,
    redirectUrl,
  };
}

