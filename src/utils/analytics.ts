export const GA_MEASUREMENT_ID = "G-BE971YZ1Q5";
const LEGACY_GA_MEASUREMENT_IDS = ["G-0JSYB8Y5PF"];
export const ANALYTICS_CONSENT_STORAGE_KEY = "vafskurs:analytics-consent";
export const CONSENT_SETTINGS_EVENT = "vafskurs:open-consent-settings";

export type AnalyticsConsent = "accepted" | "declined";

type GtagCommand = "js" | "config" | "event" | "consent";
type Gtag = (command: GtagCommand, targetId: string | Date, config?: Record<string, unknown>) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let isGoogleAnalyticsLoaded = false;
let inMemoryAnalyticsConsent: AnalyticsConsent | null = null;

function getDisableKey() {
  return `ga-disable-${GA_MEASUREMENT_ID}`;
}

function deleteCookie(name: string) {
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const hostParts = window.location.hostname.split(".");
  const domains = hostParts.map((_, index) => `.${hostParts.slice(index).join(".")}`);

  document.cookie = `${name}=; ${expires}; path=/`;
  domains.forEach((domain) => {
    document.cookie = `${name}=; ${expires}; path=/; domain=${domain}`;
  });
}

export function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const storedConsent = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);

    return storedConsent === "accepted" || storedConsent === "declined"
      ? storedConsent
      : inMemoryAnalyticsConsent;
  } catch {
    return inMemoryAnalyticsConsent;
  }
}

export function storeAnalyticsConsent(consent: AnalyticsConsent) {
  inMemoryAnalyticsConsent = consent;

  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Consent still applies for the current page view if storage is unavailable.
  }
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT));
}

export function enableGoogleAnalytics(pagePath: string) {
  Object.defineProperty(window, getDisableKey(), {
    value: false,
    configurable: true,
    writable: true,
  });

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  if (!window.gtag) {
    window.gtag = function gtag(...args) {
      window.dataLayer?.push(args);
    } as Gtag;
  }

  if (!isGoogleAnalyticsLoaded) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.analytics = "google";
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: document.title,
    });
    isGoogleAnalyticsLoaded = true;

    return true;
  }

  return false;
}

export function disableGoogleAnalytics() {
  Object.defineProperty(window, getDisableKey(), {
    value: true,
    configurable: true,
    writable: true,
  });
  deleteCookie("_ga");
  deleteCookie(`_ga_${GA_MEASUREMENT_ID.replace("G-", "")}`);
  LEGACY_GA_MEASUREMENT_IDS.forEach((measurementId) => {
    deleteCookie(`_ga_${measurementId.replace("G-", "")}`);
  });
}

export function trackPageView(path: string) {
  if (getStoredAnalyticsConsent() !== "accepted") {
    return;
  }

  const wasLoadedNow = enableGoogleAnalytics(path);

  if (wasLoadedNow) {
    return;
  }

  window.gtag?.("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
}
