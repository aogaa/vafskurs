import { Button } from "../../ui/Button";

type CourseHeroTranslatableProps = {
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  startLabel: string;
  overviewLabel: string;
  startTo: string;
  overviewTo: string;
};

export function CourseHeroTranslatable({
  title,
  subtitle,
  description1,
  description2,
  startLabel,
  overviewLabel,
  startTo,
  overviewTo,
}: CourseHeroTranslatableProps) {
  return (
    <section className="py-8 lg:py-14">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="mt-6 max-w-3xl space-y-5 text-lg leading-8 text-slate sm:text-xl sm:leading-9">
          <p className="text-2xl font-bold leading-9 text-fjord sm:text-3xl sm:leading-10">
            {subtitle}
          </p>
          <p>{description1}</p>
          <p>{description2}</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to={startTo}>{startLabel}</Button>
          <Button to={overviewTo} variant="ghost">
            {overviewLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
