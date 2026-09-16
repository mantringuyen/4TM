import { isValidSsoTargetOrigin } from '@shared';

export interface IssueSsoTicketOptions {
  supabaseClient?: any;
  accessToken?: string;
  targetOrigin: string;
  state: string;
  redirectPath?: string;
  workerUrl?: string;
}

export interface IssueSsoTicketResult {
  success: boolean;
  ticket?: string;
  redirectUrl?: string;
  errorCategory?: string;
  error?: string;
}

/**
 * Service function invoked by Root (4tm.io.vn) to issue a single-use SSO ticket
 * via the Root Broker (/api/sso/issue) or service_role RPC.
 * Authenticated peers are rejected by PostgreSQL with 42501 if attempting direct execution.
 */
export async function issueSsoTicket(
  options: IssueSsoTicketOptions
): Promise<IssueSsoTicketResult> {
  const {
    supabaseClient,
    accessToken: providedToken,
    targetOrigin,
    state,
    redirectPath = '',
    workerUrl = '',
  } = options;

  if (!isValidSsoTargetOrigin(targetOrigin)) {
    return {
      success: false,
      errorCategory: 'invalid_target_origin',
      error: `Target origin ${targetOrigin} is not in the allowed SSO origins list`,
    };
  }

  if (!state || typeof state !== 'string' || state.trim().length === 0) {
    return {
      success: false,
      errorCategory: 'missing_state',
      error: 'Authorization request state parameter is required',
    };
  }

  // 1. If workerUrl is specified or in standard frontend broker mode without direct RPC:
  if (workerUrl || (!supabaseClient?.rpc && (providedToken || supabaseClient?.auth))) {
    let token = providedToken;
    if (!token && supabaseClient && supabaseClient.auth) {
      if (typeof supabaseClient.auth.getSession === 'function') {
        const { data: sessionData } = await supabaseClient.auth.getSession();
        token = sessionData?.session?.access_token;
      }
      if (!token && typeof supabaseClient.auth.getUser === 'function') {
        const { data: userData } = await supabaseClient.auth.getUser();
        token = userData?.user?.id;
      }
    }

    if (!token) {
      return {
        success: false,
        errorCategory: 'unauthenticated',
        error: 'Active Root authentication session required to issue SSO ticket',
      };
    }

    const endpoint = `${workerUrl.replace(/\/+$/, '')}/api/sso/issue`;
    let res: Response;
    try {
      res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          target_origin: targetOrigin,
          state,
        }),
      });
    } catch (err: any) {
      return {
        success: false,
        errorCategory: 'network_error',
        error: `Failed to contact SSO issuance broker: ${err?.message || 'Network error'}`,
      };
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success || !data.ticket) {
      return {
        success: false,
        errorCategory: data.errorCategory || 'issuance_failed',
        error: data.message || data.error || 'SSO ticket issuance was rejected by server',
      };
    }

    const formattedPath = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
    const cleanPath = formattedPath === '/' ? '' : formattedPath;
    const redirectUrl =
      data.redirect_url ||
      `${targetOrigin.replace(/\/+$/, '')}${cleanPath}#ticket=${encodeURIComponent(
        data.ticket
      )}&state=${encodeURIComponent(state)}`;

    return {
      success: true,
      ticket: data.ticket,
      redirectUrl,
    };
  }

  // 2. Direct Supabase client RPC execution (e.g. backend service_role broker or direct test harness)
  if (!supabaseClient || !supabaseClient.auth) {
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
      error: 'Active Root authentication session required to issue SSO ticket',
    };
  }

  // Call database RPC issue_sso_ticket directly (restricted to service_role / postgres by PostgreSQL)
  const { data: rawTicket, error: rpcError } = await supabaseClient.rpc('issue_sso_ticket', {
    p_target_origin: targetOrigin,
    p_state: state,
  });

  if (rpcError || !rawTicket || typeof rawTicket !== 'string') {
    return {
      success: false,
      errorCategory: 'rpc_issue_failed',
      error: rpcError?.message || 'Failed to issue SSO ticket from database',
    };
  }

  const formattedPath = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
  const cleanPath = formattedPath === '/' ? '' : formattedPath;

  const redirectUrl = `${targetOrigin.replace(/\/+$/, '')}${cleanPath}#ticket=${encodeURIComponent(
    rawTicket
  )}&state=${encodeURIComponent(state)}`;

  return {
    success: true,
    ticket: rawTicket,
    redirectUrl,
  };
}
