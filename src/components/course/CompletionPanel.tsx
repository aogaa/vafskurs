import { Button } from "../ui/Button";

type CompletionPanelProps = {
  title?: string;
};

export function CompletionPanel({ title = "Modul fullført" }: CompletionPanelProps) {
  return (
    <section
      className="rounded-3xl border border-pine/20 bg-pine/10 p-8 text-center shadow-soft"
      aria-live="polite"
    >
      <div
        className="mx-auto grid size-16 place-items-center rounded-full bg-pine text-3xl font-black text-white"
        aria-hidden="true"
      >
        ✓
      </div>
      <h2 className="mt-5 text-3xl font-black text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-ink/76">
        Du har tatt første steg på trygghetsreisen som frivillig.
      </p>
      <div className="mt-7">
        <Button to="/moduler">Tilbake til moduloversikt</Button>
      </div>
    </section>
  );
}
