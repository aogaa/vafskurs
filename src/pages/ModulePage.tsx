import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CompletionPanel } from "../components/course/CompletionPanel";
import { ModuleLayout } from "../components/course/ModuleLayout";
import { ModuleProgress } from "../components/course/ModuleProgress";
import { PageContainer } from "../components/layout/PageContainer";
import { ModuleFour } from "../components/modules/ModuleFour";
import { ModuleOne } from "../components/modules/ModuleOne";
import { ModuleThree } from "../components/modules/ModuleThree";
import { ModuleTwo } from "../components/modules/ModuleTwo";
import { Button } from "../components/ui/Button";
import { courseModules, getModuleById } from "../data/courseModules";
import { useProgress } from "../hooks/useProgress";

const transitionCopy: Record<string, string> = {
  "modul-1":
    "Nå har du sett hvorfor frivillighet betyr noe. Neste steg er å bli tydeligere på hva frivillighet er, og hvordan rollen kan være både varm og trygg.",
  "modul-2":
    "Nå har du bygget rollekompasset ditt. Neste steg er å se nærmere på trygge valg i praksis.",
  "modul-3":
    "Nå har du øvd på trygge valg i øyeblikket. Neste steg handler om tillit, taushet og hva som må tas videre.",
  "modul-4":
    "Nå har du trent på hva du gjør med informasjon du får vite som frivillig. Neste steg handler om gode møter med mennesker.",
};

export function ModulePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const courseModule = moduleId ? getModuleById(moduleId) : undefined;
  const { isModuleComplete, markModuleComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);

  if (!courseModule) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-harbor/8 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-ink">Fant ikke delen</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
            Denne delen finnes ikke i kursstrukturen ennå.
          </p>
          <div className="mt-7">
            <Button to="/trygg-som-frivillig/deler">Tilbake til deloversikt</Button>
          </div>
        </section>
      </PageContainer>
    );
  }

  const previousModules = courseModules.filter(
    (item) => item.order < courseModule.order,
  );
  const canOpenModule = previousModules.every((item) => isModuleComplete(item.id));

  if (!canOpenModule) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-harbor/8 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-ink">
            Denne delen er ikke åpnet ennå
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
            Fullfør delen før, så blir denne tilgjengelig.
          </p>
          <div className="mt-7">
            <Button to="/trygg-som-frivillig/deler">Tilbake til deloversikt</Button>
          </div>
        </section>
      </PageContainer>
    );
  }

  const isComplete = isModuleComplete(courseModule.id);
  const courseModuleId = courseModule.id;
  const nextCourseModule = courseModules.find(
    (item) => item.order === courseModule.order + 1,
  );

  function handleComplete() {
    markModuleComplete(courseModuleId);

    if (nextCourseModule) {
      navigate(`/trygg-som-frivillig/deler/${nextCourseModule.id}`);
      return;
    }

    setShowCompletion(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <PageContainer className="space-y-7">
      <Link
        to="/trygg-som-frivillig/deler"
        className="inline-flex w-fit items-center gap-2 rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor ring-1 ring-harbor/10 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
      >
        <span aria-hidden="true">←</span>
        Til deloversikt
      </Link>
      {!showCompletion ? (
        <ModuleProgress
          courseModule={courseModule}
          isModuleComplete={isModuleComplete}
        />
      ) : null}
      {showCompletion ? (
        <CompletionPanel transitionText={transitionCopy[courseModule.id]} />
      ) : courseModule.id === "modul-1" ? (
        <ModuleOne
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : courseModule.id === "modul-2" ? (
        <ModuleTwo
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : courseModule.id === "modul-3" ? (
        <ModuleThree
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : courseModule.id === "modul-4" ? (
        <ModuleFour
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : (
        <ModuleLayout
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      )}
    </PageContainer>
  );
}
