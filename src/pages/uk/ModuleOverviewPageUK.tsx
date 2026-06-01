import { ModuleGridTranslatable } from "../../components/course/translatable/ModuleGridTranslatable";
import { PageContainer } from "../../components/layout/PageContainer";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { visibleCourseModulesUK } from "../../data/courseModulesUK";
import { useProgressWithPrefix } from "../../hooks/useProgressWithPrefix";

const statusCopy = {
  complete: { statusLabel: "Завершено", button: "Пройти знову" },
  next: { statusLabel: "", button: "Продовжити" },
  upcoming: { statusLabel: "Ще не відкрито", button: "Переглянути розділ" },
} as const;

export function ModuleOverviewPageUK() {
  const { isModuleComplete } = useProgressWithPrefix("uk:trygg-som-frivillig");
  const nextModule = visibleCourseModulesUK.find((m) => !isModuleComplete(m.id));

  return (
    <PageContainer className="space-y-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow="Огляд розділів"
          title="Курс"
          description="Тут ви бачите весь курс. Починайте з першого розділу, якщо ви новачок, або продовжуйте з того місця, де зупинилися."
        />
      </header>
      <ModuleGridTranslatable
        modules={visibleCourseModulesUK}
        nextModuleId={nextModule?.id}
        isModuleComplete={isModuleComplete}
        urlPrefix="/ukrainsk/trygg-som-frivillig"
        partLabel="Розділ"
        statusCopy={statusCopy}
      />
    </PageContainer>
  );
}
