/**
 * Centralized analytics. Components only ever call `trackEvent`.
 * Wire up a provider (GA4, GTM, Meta Pixel, Plausible…) by loading its
 * script in layout.tsx — the forwarding below picks it up automatically.
 */

export type AnalyticsEvent =
  | "estimate_started"
  | "service_selected"
  | "project_viewed"
  | "before_after_used"
  | "estimate_submitted"
  | "phone_clicked"
  | "whatsapp_clicked"
  | "email_clicked";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Params }) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.("event", event, params);
    window.fbq?.("trackCustom", event, params);
    window.plausible?.(event, { props: params });
  } catch {
    // Analytics must never break the page.
  }
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, params);
  }
}
