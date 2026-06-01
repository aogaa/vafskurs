import { CourseHeroTranslatable } from "../../components/course/translatable/CourseHeroTranslatable";
import { ProgressSummaryTranslatable } from "../../components/course/translatable/ProgressSummaryTranslatable";
import { PageContainer } from "../../components/layout/PageContainer";
import { visibleCourseModulesEN } from "../../data/courseModulesEN";
import { useProgressWithPrefix } from "../../hooks/useProgressWithPrefix";

export function HomePageEN() {
  const { completedModuleIds } = useProgressWithPrefix("en:trygg-som-frivillig");
  const completedCount = visibleCourseModulesEN.filter((m) =>
    completedModuleIds.includes(m.id),
  ).length;
  const nextPart =
    visibleCourseModulesEN.find((m) => !completedModuleIds.includes(m.id)) ??
    visibleCourseModulesEN[visibleCourseModulesEN.length - 1];

  return (
    <PageContainer className="space-y-2">
      <CourseHeroTranslatable
        title="Safe as a Volunteer"
        subtitle="A foundation course for those who want to help people and community."
        description1="Volunteering is one of the finest things we do together. It is about people who see each other, support each other, and build community where they live. As a volunteer, you help make your neighbourhood warmer, safer, and more vibrant."
        description2="This course will give you a clearer understanding of the volunteer role, making it easier to contribute with confidence, care, and good judgement."
        startLabel="Start the course"
        overviewLabel="See the parts"
        startTo="/engelsk/trygg-som-frivillig/deler/modul-1"
        overviewTo="/engelsk/trygg-som-frivillig/deler"
      />
      <ProgressSummaryTranslatable
        completedCount={completedCount}
        nextModuleTitle={nextPart?.title}
        totalCount={visibleCourseModulesEN.length}
        journeyLabel="Safety journey"
        notStartedText="Your safety journey lies ahead"
        completedText="The entire safety journey is complete"
        inProgressText="You have started the safety journey"
        nextStepLabel="Next step"
        completedPercentLabel={(pct) => `Completed: ${pct}%.`}
        partsCompletedLabel={(done, total) => `${done} of ${total} parts completed`}
      />
    </PageContainer>
  );
}
