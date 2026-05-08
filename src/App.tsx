import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { HomePage } from "./pages/HomePage";
import { ModuleOverviewPage } from "./pages/ModuleOverviewPage";
import { ModulePage } from "./pages/ModulePage";
import { PortalPage } from "./pages/PortalPage";

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
