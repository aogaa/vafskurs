import { ModuleGrid } from "../components/course/ModuleGrid";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionTitle } from "../components/ui/SectionTitle";
import { courseModules } from "../data/courseModules";
import { useProgress } from "../hooks/useProgress";

export function ModuleOverviewPage() {
  const { isModuleComplete } = useProgress();
  const nextModule = courseModules.find((courseModule) => !isModuleComplete(courseModule.id));

  return (
    <PageContainer className="space-y-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow="Deloversikt"
          title="Kursløpet"
          description="Her ser du hele kursløpet. Start med første del hvis du er ny, eller fortsett der du slapp."
        />
      </header>
      <ModuleGrid
        modules={courseModules}
        nextModuleId={nextModule?.id}
        isModuleComplete={isModuleComplete}
      />
    </PageContainer>
  );
}
