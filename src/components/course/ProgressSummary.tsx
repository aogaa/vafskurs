type ProgressSummaryProps = {
  completedCount: number;
  totalCount: number;
};

export function ProgressSummary({ completedCount, totalCount }: ProgressSummaryProps) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section
      className="rounded-3xl border border-white/70 bg-white/72 p-5 shadow-soft"
      aria-label="Kursprogresjon"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-clay">
            Trygghetsreise
          </p>
          <h2 className="mt-1 text-2xl font-bold text-ink">
            {completedCount} av {totalCount} moduler fullført
          </h2>
        </div>
        <p className="text-base font-semibold text-harbor">{percent}%</p>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-mist" aria-hidden="true">
        <div
          className="h-full rounded-full bg-pine transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </section>
  );
}
