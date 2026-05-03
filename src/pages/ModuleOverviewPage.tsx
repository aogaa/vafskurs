import { ModuleGrid } from "../components/course/ModuleGrid";
import { ProgressSummary } from "../components/course/ProgressSummary";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionTitle } from "../components/ui/SectionTitle";
import { courseModules } from "../data/courseModules";
import { useProgress } from "../hooks/useProgress";

export function ModuleOverviewPage() {
  const { getCompletedCount, isModuleComplete } = useProgress();

  return (
    <PageContainer className="space-y-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow="Moduloversikt"
          title="Rolig fremdrift, ett steg om gangen"
          description="Start med første modul. Resten av kursløpet ligger klart som struktur og bygges ut videre."
        />
      </header>
      <ProgressSummary
        completedCount={getCompletedCount()}
        totalCount={courseModules.length}
      />
      <ModuleGrid modules={courseModules} isModuleComplete={isModuleComplete} />
    </PageContainer>
  );
}
