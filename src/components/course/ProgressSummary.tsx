type ProgressSummaryProps = {
  completedCount: number;
  nextModuleTitle?: string;
  totalCount: number;
};

export function ProgressSummary({
  completedCount,
  nextModuleTitle,
  totalCount,
}: ProgressSummaryProps) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const journeyText =
    completedCount === 0
      ? "Du har trygghetsreisen foran deg"
      : completedCount === totalCount
        ? "Hele trygghetsreisen er fullført"
        : "Du har startet trygghetsreisen";

  return (
    <section
      className="rounded-3xl border border-harbor/8 bg-white p-6 shadow-soft"
      aria-label="Kursprogresjon"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-harbor">
            Trygghetsreisen
          </p>
          <h2 className="mt-1 text-2xl font-bold text-ink">
            {completedCount} av {totalCount} deler fullført
          </h2>
          <p className="mt-2 text-base leading-7 text-slate">{journeyText}</p>
          {nextModuleTitle ? (
            <p className="mt-2 text-base font-semibold leading-7 text-harbor">
              Neste steg: {nextModuleTitle}
            </p>
          ) : null}
        </div>
        <p className="flex min-h-11 w-fit items-center justify-center rounded-2xl bg-mist px-4 py-2 text-center text-base font-bold text-harbor [text-wrap:balance]">
          Fullført: {percent}%.
        </p>
      </div>
      <div
        className="mt-5 h-3 overflow-hidden rounded-full bg-mist"
        role="progressbar"
        aria-label="Fullførte deler"
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
