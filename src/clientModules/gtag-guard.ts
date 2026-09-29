export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

if (typeof window !== 'undefined' && typeof window.gtag !== 'function') {
  window.gtag = (...args) => (window.dataLayer ??= []).push(args);
}
