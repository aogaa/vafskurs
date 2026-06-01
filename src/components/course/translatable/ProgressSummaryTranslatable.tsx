type ProgressSummaryTranslatableProps = {
  completedCount: number;
  nextModuleTitle?: string;
  totalCount: number;
  journeyLabel: string;
  notStartedText: string;
  completedText: string;
  inProgressText: string;
  nextStepLabel: string;
  completedPercentLabel: (pct: number) => string;
  partsCompletedLabel: (done: number, total: number) => string;
};

export function ProgressSummaryTranslatable({
  completedCount,
  nextModuleTitle,
  totalCount,
  journeyLabel,
  notStartedText,
  completedText,
  inProgressText,
  nextStepLabel,
  completedPercentLabel,
  partsCompletedLabel,
}: ProgressSummaryTranslatableProps) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const journeyText =
    completedCount === 0
      ? notStartedText
      : completedCount === totalCount
        ? completedText
        : inProgressText;

  return (
    <section
      className="rounded-3xl border border-harbor/10 bg-white p-6 shadow-soft"
      aria-label={journeyLabel}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-harbor">
            {journeyLabel}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-ink">
            {partsCompletedLabel(completedCount, totalCount)}
          </h2>
          <p className="mt-2 text-base leading-7 text-slate">{journeyText}</p>
          {nextModuleTitle ? (
            <p className="mt-2 text-base font-semibold leading-7 text-harbor">
              {nextStepLabel}: {nextModuleTitle}
            </p>
          ) : null}
        </div>
        <p className="flex min-h-11 w-fit items-center justify-center rounded-2xl bg-mist px-4 py-2 text-center text-base font-bold text-harbor [text-wrap:balance]">
          {completedPercentLabel(percent)}
        </p>
      </div>
      <div
        className="mt-5 h-3 overflow-hidden rounded-full bg-mist"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalCount}
        aria-valuenow={completedCount}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-pine to-leaf transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </section>
  );
}
