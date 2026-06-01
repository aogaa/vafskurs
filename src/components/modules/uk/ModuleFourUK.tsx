import type { CourseModule } from "../../../data/courseModules";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

type ModuleFourUKProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

export function ModuleFourUK({ courseModule, isComplete, onComplete }: ModuleFourUKProps) {
  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-6 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-white">
          Розділ {courseModule.order} &middot; Завершення
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          {courseModule.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white">
          Вам не потрібно знати все. Вам потрібно знати, що робити, коли ви не знаєте.
        </p>
      </section>

      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
          Ключові моменти цього розділу
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
          Цей розділ ще в розробці
        </h2>
        <p className="mt-3 text-base leading-8 text-ink">
          Повний переклад цього розділу з інтерактивними вправами буде додано
          незабаром.
        </p>
      </Card>

      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
          Ви готові робити внесок безпечно
        </h2>
        <p className="mt-4 text-base leading-8 text-slate">
          Ви пройшли весь курс. Вітаємо!
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={onComplete} className="w-full bg-pine text-harbor hover:bg-leaf sm:w-auto">
            Завершити курс
          </Button>
          <Button to="/ukrainsk" variant="secondary" className="w-full sm:w-auto">
            На головну
          </Button>
        </div>
      </Card>

      {isComplete ? (
        <div className="sr-only" aria-live="polite">Розділ 4 вже завершено.</div>
      ) : null}
    </article>
  );
}
