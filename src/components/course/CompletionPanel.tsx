import { Button } from "../ui/Button";

type CompletionPanelProps = {
  title?: string;
};

export function CompletionPanel({ title = "Modul fullført" }: CompletionPanelProps) {
  return (
    <section
      className="rounded-[2rem] border border-pine/25 bg-white p-8 text-center shadow-glow"
      aria-live="polite"
    >
      <div
        className="mx-auto grid size-16 place-items-center rounded-3xl bg-pine text-3xl font-black text-harbor"
        aria-hidden="true"
      >
        ✓
      </div>
      <h2 className="mt-5 text-3xl font-extrabold text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-slate">
        Du har tatt første steg på trygghetsreisen som frivillig.
      </p>
      <div className="mt-7">
        <Button to="/moduler">Tilbake til moduloversikt</Button>
      </div>
    </section>
  );
}
