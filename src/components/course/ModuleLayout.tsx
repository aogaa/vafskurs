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
      <header className="overflow-hidden rounded-[2rem] border border-harbor/8 bg-white shadow-soft">
        <div className="h-2 bg-gradient-to-r from-pine via-leaf to-harbor" />
        <div className="p-7 md:p-10">
          <p className="text-sm font-bold uppercase tracking-normal text-leaf">
            Del {courseModule.order}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            {courseModule.title}
          </h1>
          {courseModule.ingress ? (
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate">
              {courseModule.ingress}
            </p>
          ) : null}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-7">
          <h2 className="text-2xl font-bold text-ink">Dette skal du sitte igjen med</h2>
          <ul className="mt-5 space-y-4">
            {courseModule.learningGoals.length > 0 ? (
              courseModule.learningGoals.map((goal) => (
                <li key={goal} className="flex gap-3 text-base leading-7 text-slate">
                  <span
                    className="mt-1 grid size-7 shrink-0 place-items-center rounded-2xl bg-pine/18 text-sm font-black text-harbor"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>{goal}</span>
                </li>
              ))
            ) : (
              <li className="text-base leading-7 text-slate">
                Læringsmål legges inn når delen bygges ut.
              </li>
            )}
          </ul>
        </Card>

        <Card className="p-7">
          <h2 className="text-2xl font-bold text-ink">Innhold</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-slate">
            {(courseModule.contentBlocks ?? [
              "Denne delen er foreløpig en plassholder. Innhold, scenarioer og refleksjoner kan kobles på senere i samme struktur.",
            ]).map((block) => (
              <p key={block}>{block}</p>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-7">
        <h2 className="text-2xl font-bold text-ink">Interaktiv øvelse</h2>
        <div className="mt-5 rounded-3xl border border-dashed border-harbor/18 bg-mist p-6">
          <p className="max-w-3xl text-base leading-8 text-slate">
            Her kommer en enkel øvelse i neste byggesteg. Målet er at du kan
            reflektere over frivilligrollen i praksis, uten at svar lagres som
            personopplysninger.
          </p>
        </div>
      </Card>

      {courseModule.insight ? <InsightCard>{courseModule.insight}</InsightCard> : null}

      <div className="flex flex-col gap-3 rounded-3xl border border-harbor/8 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <Button to="/trygg-som-frivillig/deler" variant="secondary">
          Tilbake til deloversikt
        </Button>
        <Button onClick={onComplete} disabled={isComplete}>
          {isComplete ? "Del er fullført" : "Marker del som fullført"}
        </Button>
      </div>
    </article>
  );
}
