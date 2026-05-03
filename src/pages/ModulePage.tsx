import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CompletionPanel } from "../components/course/CompletionPanel";
import { ModuleLayout } from "../components/course/ModuleLayout";
import { PageContainer } from "../components/layout/PageContainer";
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
        <section className="rounded-3xl border border-white/70 bg-white/76 p-8 shadow-soft">
          <h1 className="text-3xl font-black text-ink">Fant ikke modulen</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/76">
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
        className="inline-flex rounded-full px-2 py-1 text-sm font-bold text-harbor hover:text-pine"
      >
        Til moduloversikt
      </Link>
      {showCompletion ? (
        <CompletionPanel />
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
