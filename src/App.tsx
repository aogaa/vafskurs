import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { HomePage } from "./pages/HomePage";
import { ModuleOverviewPage } from "./pages/ModuleOverviewPage";
import { ModulePage } from "./pages/ModulePage";
import { PortalPage } from "./pages/PortalPage";
import { PortalPageUK } from "./pages/PortalPageUK";
import { PortalPageEN } from "./pages/PortalPageEN";
import { HomePageUK } from "./pages/uk/HomePageUK";
import { ModuleOverviewPageUK } from "./pages/uk/ModuleOverviewPageUK";
import { ModulePageUK } from "./pages/uk/ModulePageUK";
import { HomePageEN } from "./pages/en/HomePageEN";
import { ModuleOverviewPageEN } from "./pages/en/ModuleOverviewPageEN";
import { ModulePageEN } from "./pages/en/ModulePageEN";

function LegacyModuleRedirect() {
  const { moduleId } = useParams();

  return (
    <Navigate
      to={`/trygg-som-frivillig/deler/${moduleId ?? ""}`}
      replace
    />
  );
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<PortalPage />} />
        <Route path="/trygg-som-frivillig" element={<HomePage />} />
        <Route path="/trygg-som-frivillig/deler" element={<ModuleOverviewPage />} />
        <Route path="/trygg-som-frivillig/deler/:moduleId" element={<ModulePage />} />
        <Route path="/moduler" element={<Navigate to="/trygg-som-frivillig/deler" replace />} />
        <Route path="/moduler/:moduleId" element={<LegacyModuleRedirect />} />

        {/* Ukrainian */}
        <Route path="/ukrainsk" element={<PortalPageUK />} />
        <Route path="/ukrainsk/trygg-som-frivillig" element={<HomePageUK />} />
        <Route path="/ukrainsk/trygg-som-frivillig/deler" element={<ModuleOverviewPageUK />} />
        <Route path="/ukrainsk/trygg-som-frivillig/deler/:moduleId" element={<ModulePageUK />} />

        {/* English */}
        <Route path="/engelsk" element={<PortalPageEN />} />
        <Route path="/engelsk/trygg-som-frivillig" element={<HomePageEN />} />
        <Route path="/engelsk/trygg-som-frivillig/deler" element={<ModuleOverviewPageEN />} />
        <Route path="/engelsk/trygg-som-frivillig/deler/:moduleId" element={<ModulePageEN />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
