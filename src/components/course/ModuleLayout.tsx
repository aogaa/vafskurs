import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { InsightCard } from "./InsightCard";

type ModuleLayoutProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

export function ModuleLayout({ courseModule, isComplete, onComplete }: ModuleLayoutProps) {
  return (
    <article className="space-y-8">
      <header className="rounded-[2rem] border border-white/70 bg-white/76 p-7 shadow-soft md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">
          Modul {courseModule.order}
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">
          {courseModule.title}
        </h1>
        <p className="mt-4 text-base font-semibold text-harbor">
          Ca. {courseModule.durationMinutes} minutter
        </p>
        {courseModule.ingress ? (
          <p className="mt-6 max-w-3xl text-xl leading-9 text-ink/76">
            {courseModule.ingress}
          </p>
        ) : null}
      </header>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-7">
          <h2 className="text-2xl font-bold text-ink">Dette skal du sitte igjen med</h2>
          <ul className="mt-5 space-y-4">
            {courseModule.learningGoals.length > 0 ? (
              courseModule.learningGoals.map((goal) => (
                <li key={goal} className="flex gap-3 text-base leading-7 text-ink/76">
                  <span
                    className="mt-2 size-3 shrink-0 rounded-full bg-pine"
                    aria-hidden="true"
                  />
                  <span>{goal}</span>
                </li>
              ))
            ) : (
              <li className="text-base leading-7 text-ink/76">
                Læringsmål legges inn når modulen bygges ut.
              </li>
            )}
          </ul>
        </Card>

        <Card className="p-7">
          <h2 className="text-2xl font-bold text-ink">Innhold</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-ink/76">
            {(courseModule.contentBlocks ?? [
              "Denne modulen er foreløpig en plassholder. Innhold, scenarioer og refleksjoner kan kobles på senere i samme struktur.",
            ]).map((block) => (
              <p key={block}>{block}</p>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-7">
        <h2 className="text-2xl font-bold text-ink">Interaktiv øvelse</h2>
        <div className="mt-5 rounded-3xl border border-dashed border-harbor/28 bg-mist/60 p-6">
          <p className="max-w-3xl text-base leading-8 text-ink/76">
            Her kommer en enkel øvelse i neste byggesteg. Målet er at du kan
            reflektere over frivilligrollen i praksis, uten at svar lagres som
            personopplysninger.
          </p>
        </div>
      </Card>

      {courseModule.insight ? <InsightCard>{courseModule.insight}</InsightCard> : null}

      <div className="flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/70 p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <Button to="/moduler" variant="secondary">
          Tilbake til moduloversikt
        </Button>
        <Button onClick={onComplete} disabled={isComplete}>
          {isComplete ? "Modul er fullført" : "Marker som fullført"}
        </Button>
      </div>
    </article>
  );
}
