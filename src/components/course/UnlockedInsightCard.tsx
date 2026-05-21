type UnlockedInsightCardProps = {
  courseLinkText?: string;
  insight: string;
  supportText: string;
};

export function UnlockedInsightCard({
  courseLinkText,
  insight,
  supportText,
}: UnlockedInsightCardProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-pine/30 bg-gradient-to-br from-harbor to-fjord text-white shadow-glow">
      <div className="grid gap-6 p-7 md:grid-cols-[auto_1fr] md:p-9">
        <div
          className="grid size-16 place-items-center rounded-3xl bg-pine text-3xl font-black text-harbor"
          aria-hidden="true"
        >
          ✓
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-pine">
            Innsikt låst opp
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight">
            {insight}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white">
            {supportText}
          </p>
          {courseLinkText ? (
            <p className="mt-5 max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-5 text-base font-semibold leading-8 text-white">
              {courseLinkText}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
