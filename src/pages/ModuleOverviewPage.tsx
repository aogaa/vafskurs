import { ModuleGrid } from "../components/course/ModuleGrid";
import { ProgressSummary } from "../components/course/ProgressSummary";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionTitle } from "../components/ui/SectionTitle";
import { courseModules } from "../data/courseModules";
import { useProgress } from "../hooks/useProgress";

export function ModuleOverviewPage() {
  const { isModuleComplete } = useProgress();
  const nextModule = courseModules.find((courseModule) => !isModuleComplete(courseModule.id));
  const completedCount = courseModules.filter((courseModule) =>
    isModuleComplete(courseModule.id),
  ).length;

  return (
    <PageContainer className="space-y-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow="Moduloversikt"
          title="10 moduler, ett tydelig kursløp"
          description="Start med første modul. Kursløpet er nå samlet i 10 moduler, med rolig fremdrift og tydelig retning videre."
        />
      </header>
      <ProgressSummary
        completedCount={completedCount}
        nextModuleTitle={nextModule?.title}
        totalCount={courseModules.length}
      />
      <ModuleGrid
        modules={courseModules}
        nextModuleId={nextModule?.id}
        isModuleComplete={isModuleComplete}
      />
    </PageContainer>
  );
}
