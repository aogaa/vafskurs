import { ModuleGridTranslatable } from "../../components/course/translatable/ModuleGridTranslatable";
import { PageContainer } from "../../components/layout/PageContainer";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { visibleCourseModulesEN } from "../../data/courseModulesEN";
import { useProgressWithPrefix } from "../../hooks/useProgressWithPrefix";

const statusCopy = {
  complete: { statusLabel: "Completed", button: "Try again" },
  next: { statusLabel: "", button: "Continue" },
  upcoming: { statusLabel: "Not yet unlocked", button: "View part" },
} as const;

export function ModuleOverviewPageEN() {
  const { isModuleComplete } = useProgressWithPrefix("en:trygg-som-frivillig");
  const nextModule = visibleCourseModulesEN.find((m) => !isModuleComplete(m.id));

  return (
    <PageContainer className="space-y-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow="Part overview"
          title="The course"
          description="Here you can see the full course. Start with the first part if you are new, or continue from where you left off."
        />
      </header>
      <ModuleGridTranslatable
        modules={visibleCourseModulesEN}
        nextModuleId={nextModule?.id}
        isModuleComplete={isModuleComplete}
        urlPrefix="/engelsk/trygg-som-frivillig"
        partLabel="Part"
        statusCopy={statusCopy}
      />
    </PageContainer>
  );
}
