/**
 * Cloudflare R2 Client-Side Asset & Storage Helper
 * 
 * NOTE: Sensitive credentials (ACCOUNT_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY)
 * are NEVER accessed here or bundled into the client build.
 * Only the public CDN/Bucket URL (VITE_CLOUDFLARE_R2_PUBLIC_URL) is accessed client-side.
 */

const meta = import.meta as any;
export const R2_PUBLIC_URL = (meta.env && meta.env.VITE_CLOUDFLARE_R2_PUBLIC_URL ? meta.env.VITE_CLOUDFLARE_R2_PUBLIC_URL : '').replace(/\/+$/, '');

/**
 * Check if the public R2 CDN/Bucket URL is configured
 */
export const isR2Configured = (): boolean => {
  return Boolean(R2_PUBLIC_URL);
};

/**
 * Resolves an asset path to its full Cloudflare R2 public URL
 * @param path - e.g. "assets/diagrams/python_memory.svg" or "/courses/sql/joins.png"
 * @param fallback - optional fallback URL if R2 is not configured
 */
export const getR2AssetUrl = (path: string, fallback?: string): string => {
  if (!path) return fallback || '';
  
  // If already absolute URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (R2_PUBLIC_URL) {
    return `${R2_PUBLIC_URL}/${cleanPath}`;
  }

  // Fallback to local asset or provided fallback
  return fallback || `/${cleanPath}`;
};

export interface R2StatusResponse {
  configured: boolean;
  bucket: string | null;
  publicUrl: string | null;
  s3Connected?: boolean;
  message?: string;
  error?: string;
}

/**
 * Checks server-side Cloudflare R2 health & connectivity status
 */
export const checkR2ServerStatus = async (): Promise<R2StatusResponse> => {
  try {
    const res = await fetch('/api/r2/status');
    if (!res.ok) {
      return {
        configured: false,
        bucket: null,
        publicUrl: R2_PUBLIC_URL || null,
        error: `Server returned status ${res.status}`,
      };
    }
    const data: R2StatusResponse = await res.json();
    return data;
  } catch (err: any) {
    return {
      configured: false,
      bucket: null,
      publicUrl: R2_PUBLIC_URL || null,
      error: err.message || 'Failed to connect to backend R2 service',
    };
  }
};

/**
 * Requests a secure presigned download URL from the server for protected/private R2 assets
 */
export const getR2PresignedUrl = async (key: string): Promise<{ url: string | null; error?: string }> => {
  try {
    const res = await fetch(`/api/r2/presigned-url?key=${encodeURIComponent(key)}`);
    if (!res.ok) {
      const data: any = await res.json().catch(() => ({}));
      return { url: null, error: data?.error || `HTTP error ${res.status}` };
    }
    const data: any = await res.json();
    return { url: data?.url || null };
  } catch (err: any) {
    return { url: null, error: err.message || 'Presigned URL request failed' };
  }
};
