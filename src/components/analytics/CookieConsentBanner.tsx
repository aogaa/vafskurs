import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  type AnalyticsConsent,
  CONSENT_SETTINGS_EVENT,
  disableGoogleAnalytics,
  getStoredAnalyticsConsent,
  storeAnalyticsConsent,
  trackPageView,
} from "../../utils/analytics";

export function CookieConsentBanner() {
  const location = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsent | null>(() =>
    getStoredAnalyticsConsent(),
  );
  const [isOpen, setIsOpen] = useState(() => getStoredAnalyticsConsent() === null);

  useEffect(() => {
    if (consent === "accepted") {
      trackPageView(`${location.pathname}${location.search}`);
    }

    if (consent === "declined") {
      disableGoogleAnalytics();
    }
  }, [consent, location.pathname, location.search]);

  useEffect(() => {
    function handleOpenConsentSettings() {
      setIsOpen(true);
    }

    window.addEventListener(CONSENT_SETTINGS_EVENT, handleOpenConsentSettings);

    return () => {
      window.removeEventListener(CONSENT_SETTINGS_EVENT, handleOpenConsentSettings);
    };
  }, []);

  function chooseConsent(nextConsent: AnalyticsConsent) {
    storeAnalyticsConsent(nextConsent);
    setConsent(nextConsent);
    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 bg-harbor px-5 py-5 text-white shadow-[0_-18px_45px_rgba(11,31,51,0.25)] sm:px-8"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-4xl">
          <h2 id="cookie-consent-title" className="text-lg font-extrabold leading-7">
            Kan vi måle trafikk og funksjoner?
          </h2>
          <p className="mt-2 text-sm font-medium leading-6 text-white">
            Vi bruker Google Analytics kun hvis du sier ja. Det hjelper oss å se
            hvilke kurs og funksjoner som brukes, slik at vi kan forbedre
            kursportalen. Vi har ikke reklame, bruker aldri informasjonen til
            markedsføring og deler den under ingen omstendighet med andre for
            andre formål.
          </p>
          <p className="mt-2 text-sm leading-6 text-white">
            Nødvendige lokale lagringer for progresjon og dette valget brukes
            uansett, fordi de får kurset til å fungere på enheten din.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <button
            type="button"
            className="min-h-12 rounded-2xl bg-pine px-5 py-3 text-base font-bold text-harbor transition hover:bg-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
            onClick={() => chooseConsent("accepted")}
          >
            Ja, tillat måling
          </button>
          <button
            type="button"
            className="min-h-12 rounded-2xl border border-white/45 bg-white/10 px-5 py-3 text-base font-bold text-white transition hover:border-white hover:bg-white/20 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
            onClick={() => chooseConsent("declined")}
          >
            Nei takk
          </button>
        </div>
      </div>
    </div>
  );
}
