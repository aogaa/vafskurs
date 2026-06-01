import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CompletionPanelTranslatable } from "../../components/course/translatable/CompletionPanelTranslatable";
import { ModuleProgressTranslatable } from "../../components/course/translatable/ModuleProgressTranslatable";
import { PageContainer } from "../../components/layout/PageContainer";
import { ModuleOneUK } from "../../components/modules/uk/ModuleOneUK";
import { ModuleTwoUK } from "../../components/modules/uk/ModuleTwoUK";
import { ModuleThreeUK } from "../../components/modules/uk/ModuleThreeUK";
import { ModuleFourUK } from "../../components/modules/uk/ModuleFourUK";
import { Button } from "../../components/ui/Button";
import { getModuleByIdUK, visibleCourseModulesUK } from "../../data/courseModulesUK";
import { useProgressWithPrefix } from "../../hooks/useProgressWithPrefix";

const COURSE_PREFIX = "uk:trygg-som-frivillig";
const OVERVIEW_URL = "/ukrainsk/trygg-som-frivillig/deler";
const HOME_URL = "/ukrainsk";

const transitionCopy: Record<string, string> = {
  "modul-1":
    "Тепер ви зрозуміли, чому волонтерство важливе. Наступний крок — чіткіше визначити, що таке волонтерство і як ця роль може бути одночасно теплою та безпечною.",
  "modul-2":
    "Тепер ви сформували свій рольовий компас. Наступний крок — про те, що робити, коли щось стає незрозумілим.",
  "modul-3":
    "Ви практикувалися зупинятися, уточнювати та звертатися по допомогу, коли щось незрозуміло. Наступний крок — зібрати отримані знання та підготуватися до участі.",
  "modul-4":
    "Ви завершили курс. Вам не потрібно знати все. Вам потрібно знати, що робити, коли ви не знаєте.",
};

export function ModulePageUK() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const courseModule = moduleId ? getModuleByIdUK(moduleId) : undefined;
  const { isModuleComplete, markModuleComplete } = useProgressWithPrefix(COURSE_PREFIX);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [moduleId]);

  if (!courseModule) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-harbor/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-ink">Розділ не знайдено</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
            Цей розділ ще не існує в структурі курсу.
          </p>
          <div className="mt-7">
            <Button to={OVERVIEW_URL}>Назад до огляду</Button>
          </div>
        </section>
      </PageContainer>
    );
  }

  const previousModules = visibleCourseModulesUK.filter(
    (item) => item.order < courseModule.order,
  );
  const canOpenModule = previousModules.every((item) => isModuleComplete(item.id));

  if (!canOpenModule) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-harbor/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-ink">Цей розділ ще не відкрито</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
            Завершіть попередній розділ, і цей стане доступним.
          </p>
          <div className="mt-7">
            <Button to={OVERVIEW_URL}>Назад до огляду</Button>
          </div>
        </section>
      </PageContainer>
    );
  }

  const isComplete = isModuleComplete(courseModule.id);
  const courseModuleId = courseModule.id;
  const nextCourseModule = visibleCourseModulesUK.find(
    (item) => item.order === courseModule.order + 1,
  );

  function handleComplete() {
    markModuleComplete(courseModuleId);
    if (nextCourseModule) {
      navigate(`/ukrainsk/trygg-som-frivillig/deler/${nextCourseModule.id}`);
      return;
    }
    setShowCompletion(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <PageContainer className="space-y-7">
      <Link
        to={OVERVIEW_URL}
        className="inline-flex w-fit items-center gap-2 rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor ring-1 ring-harbor/10 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
      >
        <span aria-hidden="true">←</span>
        До огляду розділів
      </Link>
      {!showCompletion ? (
        <ModuleProgressTranslatable
          courseModule={courseModule}
          allModules={visibleCourseModulesUK}
          isModuleComplete={isModuleComplete}
          partLabel="Розділ"
          ofLabel="з"
        />
      ) : null}
      {showCompletion ? (
        <CompletionPanelTranslatable
          nextLabel={!nextCourseModule ? "На головну" : undefined}
          nextTo={!nextCourseModule ? HOME_URL : undefined}
          title={!nextCourseModule ? "Курс завершено" : undefined}
          transitionText={transitionCopy[courseModule.id]}
          defaultTitle="Розділ завершено"
          stepText="Ви зробили важливий крок на шляху до безпечного волонтерства."
          backToOverviewLabel="Назад до огляду"
          overviewTo={OVERVIEW_URL}
        />
      ) : courseModule.id === "modul-1" ? (
        <ModuleOneUK
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : courseModule.id === "modul-2" ? (
        <ModuleTwoUK
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : courseModule.id === "modul-3" ? (
        <ModuleThreeUK
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : courseModule.id === "modul-4" ? (
        <ModuleFourUK
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : null}
    </PageContainer>
  );
}
