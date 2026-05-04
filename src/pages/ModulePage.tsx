import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CompletionPanel } from "../components/course/CompletionPanel";
import { ModuleLayout } from "../components/course/ModuleLayout";
import { PageContainer } from "../components/layout/PageContainer";
import { ModuleOne } from "../components/modules/ModuleOne";
import { ModuleThree } from "../components/modules/ModuleThree";
import { ModuleTwo } from "../components/modules/ModuleTwo";
import { Button } from "../components/ui/Button";
import { getModuleById } from "../data/courseModules";
import { useProgress } from "../hooks/useProgress";

export function ModulePage() {
  const { moduleId } = useParams();
  const courseModule = moduleId ? getModuleById(moduleId) : undefined;
  const { isModuleComplete, markModuleComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);

  if (!courseModule) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-harbor/8 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-ink">Fant ikke modulen</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
            Denne modulen finnes ikke i kursstrukturen ennå.
          </p>
          <div className="mt-7">
            <Button to="/moduler">Tilbake til moduloversikt</Button>
          </div>
        </section>
      </PageContainer>
    );
  }

  const isComplete = isModuleComplete(courseModule.id);
  const courseModuleId = courseModule.id;

  function handleComplete() {
    markModuleComplete(courseModuleId);
    setShowCompletion(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <PageContainer className="space-y-7">
      <Link
        to="/moduler"
        className="inline-flex rounded-2xl px-3 py-2 text-sm font-bold text-harbor hover:bg-mist hover:text-fjord"
      >
        Til moduloversikt
      </Link>
      {showCompletion ? (
        <CompletionPanel
          nextLabel={
            courseModule.id === "modul-1"
              ? "Gå til modul 2"
              : courseModule.id === "modul-2"
                ? "Gå til modul 3"
                : courseModule.id === "modul-3"
                  ? "Gå til modul 4"
                : undefined
          }
          nextTo={
            courseModule.id === "modul-1"
              ? "/moduler/modul-2"
              : courseModule.id === "modul-2"
                ? "/moduler/modul-3"
                : courseModule.id === "modul-3"
                  ? "/moduler/modul-4"
                : undefined
          }
          transitionText={
            courseModule.id === "modul-1"
              ? "Nå har vi sett hvorfor frivillighet betyr noe. Neste steg er å bli tydeligere på hva frivillighet er – og hva det ikke er."
              : courseModule.id === "modul-2"
                ? "Nå har du bygget rollekompasset ditt. Neste steg er å se nærmere på din rolle som frivillig i praksis."
                : courseModule.id === "modul-3"
                  ? "Nå har du øvd på trygge valg i øyeblikket. Neste steg handler om tillit, taushet og hva som må tas videre."
              : undefined
          }
        />
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
