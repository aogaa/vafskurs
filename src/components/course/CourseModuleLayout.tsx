import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { InsightCard } from "./InsightCard";
import { ModuleHero } from "./ModuleHero";

type CourseModuleLayoutProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
  overviewTo: string;
};

/**
 * Generisk modul-layout brukt som stillas for deler uten egen interaktiv
 * komponent. Tilsvarer ModuleLayout, men med parametrisert tilbake-lenke
 * slik at den fungerer for ethvert kurs.
 */
export function CourseModuleLayout({
  courseModule,
  isComplete,
  onComplete,
  overviewTo,
}: CourseModuleLayoutProps) {
  return (
    <article className="space-y-8">
      <ModuleHero courseModule={courseModule} />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-7 ring-1 ring-harbor/10">
          <h2 className="text-2xl font-bold text-ink">Dette skal du sitte igjen med</h2>
          <ul className="mt-5 space-y-4">
            {courseModule.learningGoals.length > 0 ? (
              courseModule.learningGoals.map((goal) => (
                <li key={goal} className="flex gap-3 text-base leading-7 text-slate">
                  <span
                    className="mt-1 grid size-7 shrink-0 place-items-center rounded-2xl bg-pine/20 text-sm font-black text-harbor"
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

        <Card className="p-7 ring-1 ring-harbor/10">
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

      <Card className="p-7 ring-1 ring-harbor/10">
        <h2 className="text-2xl font-bold text-ink">Interaktiv øvelse</h2>
        <div className="mt-5 rounded-3xl border border-dashed border-harbor/20 bg-mist p-6">
          <p className="max-w-3xl text-base leading-8 text-slate">
            Her kommer en enkel øvelse i neste byggesteg. Målet er at du kan
            reflektere over innholdet i praksis, uten at svar lagres som
            personopplysninger.
          </p>
        </div>
      </Card>

      {courseModule.insight ? <InsightCard>{courseModule.insight}</InsightCard> : null}

      <div className="mt-12 flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-harbor/10 sm:flex-row sm:items-center sm:justify-between">
        <Button to={overviewTo} variant="secondary">
          Tilbake til deloversikt
        </Button>
        <Button
          onClick={onComplete}
          className="bg-pine text-harbor hover:bg-leaf"
        >
          {isComplete ? "✓ Fullført - gå til neste del" : "Fullfør og gå videre"}
        </Button>
      </div>
    </article>
  );
}
