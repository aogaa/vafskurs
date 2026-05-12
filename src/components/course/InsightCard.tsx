type InsightCardProps = {
  children: string;
};

export function InsightCard({ children }: InsightCardProps) {
  return (
    <aside className="rounded-3xl border border-pine/25 bg-gradient-to-br from-mist to-white p-7 text-ink shadow-soft">
      <p className="text-sm font-bold uppercase tracking-normal text-harbor">
        Innsikt
      </p>
      <p className="mt-3 max-w-3xl text-xl font-bold leading-8">{children}</p>
    </aside>
  );
}
