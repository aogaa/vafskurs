import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getStoredAnalyticsConsent, trackPageView } from "../../utils/analytics";

export function GoogleAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (getStoredAnalyticsConsent() !== "accepted") {
      return;
    }

    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
}
