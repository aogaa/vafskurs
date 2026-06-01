import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CompletionPanelTranslatable } from "../../components/course/translatable/CompletionPanelTranslatable";
import { ModuleProgressTranslatable } from "../../components/course/translatable/ModuleProgressTranslatable";
import { PageContainer } from "../../components/layout/PageContainer";
import { ModuleOneEN } from "../../components/modules/en/ModuleOneEN";
import { ModuleTwoEN } from "../../components/modules/en/ModuleTwoEN";
import { ModuleThreeEN } from "../../components/modules/en/ModuleThreeEN";
import { ModuleFourEN } from "../../components/modules/en/ModuleFourEN";
import { Button } from "../../components/ui/Button";
import { getModuleByIdEN, visibleCourseModulesEN } from "../../data/courseModulesEN";
import { useProgressWithPrefix } from "../../hooks/useProgressWithPrefix";

const COURSE_PREFIX = "en:trygg-som-frivillig";
const OVERVIEW_URL = "/engelsk/trygg-som-frivillig/deler";
const HOME_URL = "/engelsk";

const transitionCopy: Record<string, string> = {
  "modul-1":
    "You have now seen why volunteering matters. The next step is to get clearer on what volunteering is, and how the role can be both warm and safe.",
  "modul-2":
    "You have now built your role compass. The next step is about what to do when something becomes unclear.",
  "modul-3":
    "You have practised stopping, clarifying, and using the right help when something is unclear. The next step is to gather your learning and get ready to contribute.",
  "modul-4":
    "You have completed the course. You don't need to know everything. You need to know what to do when you don't know.",
};

export function ModulePageEN() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const courseModule = moduleId ? getModuleByIdEN(moduleId) : undefined;
  const { isModuleComplete, markModuleComplete } = useProgressWithPrefix(COURSE_PREFIX);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [moduleId]);

  if (!courseModule) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-harbor/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-ink">Part not found</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
            This part does not yet exist in the course structure.
          </p>
          <div className="mt-7">
            <Button to={OVERVIEW_URL}>Back to part overview</Button>
          </div>
        </section>
      </PageContainer>
    );
  }

  const previousModules = visibleCourseModulesEN.filter(
    (item) => item.order < courseModule.order,
  );
  const canOpenModule = previousModules.every((item) => isModuleComplete(item.id));

  if (!canOpenModule) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-harbor/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-ink">This part is not yet unlocked</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
            Complete the previous part and this one will become available.
          </p>
          <div className="mt-7">
            <Button to={OVERVIEW_URL}>Back to part overview</Button>
          </div>
        </section>
      </PageContainer>
    );
  }

  const isComplete = isModuleComplete(courseModule.id);
  const courseModuleId = courseModule.id;
  const nextCourseModule = visibleCourseModulesEN.find(
    (item) => item.order === courseModule.order + 1,
  );

  function handleComplete() {
    markModuleComplete(courseModuleId);
    if (nextCourseModule) {
      navigate(`/engelsk/trygg-som-frivillig/deler/${nextCourseModule.id}`);
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
        To part overview
      </Link>
      {!showCompletion ? (
        <ModuleProgressTranslatable
          courseModule={courseModule}
          allModules={visibleCourseModulesEN}
          isModuleComplete={isModuleComplete}
          partLabel="Part"
          ofLabel="of"
        />
      ) : null}
      {showCompletion ? (
        <CompletionPanelTranslatable
          nextLabel={!nextCourseModule ? "To home page" : undefined}
          nextTo={!nextCourseModule ? HOME_URL : undefined}
          title={!nextCourseModule ? "Course completed" : undefined}
          transitionText={transitionCopy[courseModule.id]}
          defaultTitle="Part completed"
          stepText="You have taken an important step on your safety journey as a volunteer."
          backToOverviewLabel="Back to part overview"
          overviewTo={OVERVIEW_URL}
        />
      ) : courseModule.id === "modul-1" ? (
        <ModuleOneEN
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : courseModule.id === "modul-2" ? (
        <ModuleTwoEN
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : courseModule.id === "modul-3" ? (
        <ModuleThreeEN
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : courseModule.id === "modul-4" ? (
        <ModuleFourEN
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : null}
    </PageContainer>
  );
}
