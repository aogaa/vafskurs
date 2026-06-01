import { CourseHeroTranslatable } from "../../components/course/translatable/CourseHeroTranslatable";
import { ProgressSummaryTranslatable } from "../../components/course/translatable/ProgressSummaryTranslatable";
import { PageContainer } from "../../components/layout/PageContainer";
import { visibleCourseModulesUK } from "../../data/courseModulesUK";
import { useProgressWithPrefix } from "../../hooks/useProgressWithPrefix";

export function HomePageUK() {
  const { completedModuleIds } = useProgressWithPrefix("uk:trygg-som-frivillig");
  const completedCount = visibleCourseModulesUK.filter((m) =>
    completedModuleIds.includes(m.id),
  ).length;
  const nextPart =
    visibleCourseModulesUK.find((m) => !completedModuleIds.includes(m.id)) ??
    visibleCourseModulesUK[visibleCourseModulesUK.length - 1];

  return (
    <PageContainer className="space-y-2">
      <CourseHeroTranslatable
        title="Безпечний волонтер"
        subtitle="Базовий курс для тих, хто хоче допомагати людям та громаді."
        description1="Волонтерство — одне з найкращих, що ми робимо разом. Це про людей, які бачать одне одного, підтримують одне одного та будують спільноту там, де живуть. Будучи волонтером, ви допомагаєте зробити своє сусідство теплішим, безпечнішим та живішим."
        description2="Цей курс дасть вам чіткіше розуміння ролі волонтера, щоб легше допомагати з впевненістю, турботою та здоровим глуздом."
        startLabel="Почати курс"
        overviewLabel="Переглянути розділи"
        startTo="/ukrainsk/trygg-som-frivillig/deler/modul-1"
        overviewTo="/ukrainsk/trygg-som-frivillig/deler"
      />
      <ProgressSummaryTranslatable
        completedCount={completedCount}
        nextModuleTitle={nextPart?.title}
        totalCount={visibleCourseModulesUK.length}
        journeyLabel="Шлях до безпеки"
        notStartedText="Ваш шлях ще попереду"
        completedText="Весь шлях завершено"
        inProgressText="Ви вже на шляху"
        nextStepLabel="Наступний крок"
        completedPercentLabel={(pct) => `Завершено: ${pct}%.`}
        partsCompletedLabel={(done, total) => `${done} з ${total} розділів завершено`}
      />
    </PageContainer>
  );
}
