type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ description, eyebrow, title }: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-clay">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold text-ink md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-ink/76">{description}</p>
      ) : null}
    </div>
  );
}
