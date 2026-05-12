import { CourseHero } from "../components/course/CourseHero";
import { ProgressSummary } from "../components/course/ProgressSummary";
import { PageContainer } from "../components/layout/PageContainer";
import { visibleCourseModules } from "../data/courseModules";
import { useProgress } from "../hooks/useProgress";

export function HomePage() {
  const { completedModuleIds } = useProgress();
  const completedCount = visibleCourseModules.filter((courseModule) =>
    completedModuleIds.includes(courseModule.id),
  ).length;
  const nextPart =
    visibleCourseModules.find(
      (courseModule) => !completedModuleIds.includes(courseModule.id),
    ) ?? visibleCourseModules[visibleCourseModules.length - 1];

  return (
    <PageContainer className="space-y-2">
      <CourseHero />
      <ProgressSummary
        completedCount={completedCount}
        nextModuleTitle={nextPart?.title}
        totalCount={visibleCourseModules.length}
      />
    </PageContainer>
  );
}
