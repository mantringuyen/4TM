import { isValidSsoTargetOrigin } from '@shared';

export interface IssueSsoTicketOptions {
  supabaseClient: any;
  targetOrigin: string;
  state: string;
  redirectPath?: string;
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
 * for an authenticated user requesting single sign-on to an allowed peer product.
 */
export async function issueSsoTicket(
  options: IssueSsoTicketOptions
): Promise<IssueSsoTicketResult> {
  const { supabaseClient, targetOrigin, state, redirectPath = '' } = options;

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

  // Call database RPC issue_sso_ticket
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

  // Format URL fragment redirect strictly: https://peer.example/path#ticket=<rawTicket>&state=<state>
  const redirectUrl = `${targetOrigin.replace(/\/+$/, '')}${cleanPath}#ticket=${encodeURIComponent(
    rawTicket
  )}&state=${encodeURIComponent(state)}`;

  return {
    success: true,
    ticket: rawTicket,
    redirectUrl,
  };
}
