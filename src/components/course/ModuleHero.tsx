import type { CourseModule } from "../../data/courseModules";

type ModuleHeroProps = {
  courseModule: CourseModule;
  title?: string;
  description?: string;
};

export function ModuleHero({ courseModule, description, title }: ModuleHeroProps) {
  return (
    <section className="rounded-3xl bg-harbor px-7 py-9 shadow-soft md:px-8 md:py-10">
      <p className="text-sm font-bold uppercase tracking-normal text-pine">
        Del {courseModule.order} &middot; Trygg som frivillig
      </p>
      <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
        {title ?? courseModule.title}
      </h1>
      {(description ?? courseModule.description) ? (
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">
          {description ?? courseModule.description}
        </p>
      ) : null}
    </section>
  );
}
