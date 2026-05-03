type InsightCardProps = {
  children: string;
};

export function InsightCard({ children }: InsightCardProps) {
  return (
    <aside className="rounded-3xl border border-honey/45 bg-honey/22 p-6 text-ink shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-clay">
        Innsikt
      </p>
      <p className="mt-3 text-xl font-bold leading-8">{children}</p>
    </aside>
  );
}
