const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

export const safeStorage = {
  getItem(key: string): string | null {
    if (!isBrowser) return null;
    try { return localStorage.getItem(key); } catch { return null; }
  },
  setItem(key: string, value: string): void {
    if (!isBrowser) return;
    try { localStorage.setItem(key, value); } catch {}
  },
  removeItem(key: string): void {
    if (!isBrowser) return;
    try { localStorage.removeItem(key); } catch {}
  },
  isBrowser,
};
