import { CourseHero } from "../components/course/CourseHero";
import { ProgressSummary } from "../components/course/ProgressSummary";
import { PageContainer } from "../components/layout/PageContainer";
import { courseModules } from "../data/courseModules";
import { useProgress } from "../hooks/useProgress";

export function HomePage() {
  const { completedModuleIds } = useProgress();
  const completedCount = completedModuleIds.length;
  const nextPart =
    courseModules.find((courseModule) => !completedModuleIds.includes(courseModule.id)) ??
    courseModules[courseModules.length - 1];

  return (
    <PageContainer className="space-y-2">
      <CourseHero />
      <ProgressSummary
        completedCount={completedCount}
        nextModuleTitle={nextPart?.title}
        totalCount={courseModules.length}
      />
    </PageContainer>
  );
}
