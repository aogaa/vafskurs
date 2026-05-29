import type { ReactNode } from "react";
import { CookieConsentBanner } from "../analytics/CookieConsentBanner";
import { GoogleAnalyticsTracker } from "../analytics/GoogleAnalyticsTracker";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col text-ink">
      <ScrollToTop />
      <GoogleAnalyticsTracker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
