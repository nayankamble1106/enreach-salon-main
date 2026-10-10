/// <reference types="vite/client" />

/**
 * Resolves asset URLs taking Vite's base path (e.g. '/enreach-salon-main/') into account.
 * Ensures images and assets load properly when deployed to GitHub Pages subpaths.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('data:') ||
    path.startsWith('blob:') ||
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path;
  }

  // Retrieve base URL injected by Vite (defaults to '/')
  const base = import.meta.env?.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  // Remove leading './' or '/'
  const cleanPath = path.replace(/^(\.\/|\/)/, '');

  return `${cleanBase}${cleanPath}`;
}


