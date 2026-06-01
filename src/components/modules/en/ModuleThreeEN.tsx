import type { CourseModule } from "../../../data/courseModules";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

type ModuleThreeENProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

export function ModuleThreeEN({ courseModule, isComplete, onComplete }: ModuleThreeENProps) {
  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-6 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-pine">
          Part {courseModule.order} &middot; Safe as a Volunteer
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          {courseModule.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white">
          {courseModule.description}
        </p>
      </section>

      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
          Learning goals for this part
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {courseModule.learningGoals.map((goal) => (
            <li
              key={goal}
              className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl bg-mist p-4 text-center text-base font-semibold leading-7 text-harbor [text-wrap:balance]"
            >
              {goal}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="border-pine/30 bg-pine/10 p-6 md:p-8">
        <h2 className="text-xl font-extrabold text-harbor">
          Full content coming soon
        </h2>
        <p className="mt-3 text-base leading-8 text-ink">
          The full translation of this part with interactive exercises will be added soon.
          You can already continue to the next part.
        </p>
      </Card>

      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
          You have completed Part 3
        </h2>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={onComplete} className="w-full bg-pine text-harbor hover:bg-leaf sm:w-auto">
            Go to Part 4
          </Button>
          <Button to="/engelsk" variant="secondary" className="w-full sm:w-auto">
            To home page
          </Button>
        </div>
      </Card>

      {isComplete ? (
        <div className="sr-only" aria-live="polite">Part 3 is already completed.</div>
      ) : null}
    </article>
  );
}
