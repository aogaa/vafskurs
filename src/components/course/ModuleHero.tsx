import type { CourseModule } from "../../data/courseModules";

type ModuleHeroProps = {
  courseModule: CourseModule;
  title?: string;
  description?: string;
  /** Kursnavn som vises i «Del N · …»-merkingen. Default bevarer kurs 1. */
  courseTitle?: string;
};

export function ModuleHero({
  courseModule,
  description,
  title,
  courseTitle = "Trygg som frivillig",
}: ModuleHeroProps) {
  return (
    <section className="rounded-3xl bg-harbor px-7 py-9 shadow-soft md:px-8 md:py-10">
      <p className="text-sm font-bold uppercase tracking-normal text-pine">
        Del {courseModule.order} &middot; {courseTitle}
      </p>
      <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
        {title ?? courseModule.title}
      </h1>
      {(description ?? courseModule.description) ? (
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white">
          {description ?? courseModule.description}
        </p>
      ) : null}
    </section>
  );
}
