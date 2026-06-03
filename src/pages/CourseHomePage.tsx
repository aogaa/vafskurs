import { Navigate, useParams } from "react-router-dom";
import { CourseHeroTranslatable } from "../components/course/translatable/CourseHeroTranslatable";
import { ProgressSummaryTranslatable } from "../components/course/translatable/ProgressSummaryTranslatable";
import { PageContainer } from "../components/layout/PageContainer";
import type { CourseDescriptor } from "../courses/types";
import { getCourseBySlug } from "../courses/registry";
import { useProgressWithPrefix } from "../hooks/useProgressWithPrefix";

function CourseHomeContent({ course }: { course: CourseDescriptor }) {
  const { completedModuleIds } = useProgressWithPrefix(course.storagePrefix);
  const completedCount = course.modules.filter((courseModule) =>
    completedModuleIds.includes(courseModule.id),
  ).length;
  const nextPart =
    course.modules.find(
      (courseModule) => !completedModuleIds.includes(courseModule.id),
    ) ?? course.modules[course.modules.length - 1];

  const overviewTo = `/${course.slug}/deler`;
  const startTo = `${overviewTo}/${course.modules[0]?.id ?? ""}`;

  return (
    <PageContainer className="space-y-2">
      <CourseHeroTranslatable
        title={course.title}
        subtitle={course.hero.subtitle}
        description1={course.hero.description1}
        description2={course.hero.description2}
        startLabel="Start kurset"
        overviewLabel="Se delene"
        startTo={startTo}
        overviewTo={overviewTo}
      />
      <ProgressSummaryTranslatable
        completedCount={completedCount}
        nextModuleTitle={nextPart?.title}
        totalCount={course.modules.length}
        journeyLabel={course.progressCopy.journeyLabel}
        notStartedText={course.progressCopy.notStartedText}
        completedText={course.progressCopy.completedText}
        inProgressText={course.progressCopy.inProgressText}
        nextStepLabel="Neste steg"
        completedPercentLabel={(pct) => `Fullført: ${pct}%.`}
        partsCompletedLabel={(done, total) => `${done} av ${total} deler fullført`}
      />
    </PageContainer>
  );
}

export function CourseHomePage() {
  const { courseSlug } = useParams();
  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  return <CourseHomeContent course={course} />;
}
