import { Button } from "../ui/Button";

type CompletionPanelProps = {
  nextLabel?: string;
  nextTo?: string;
  title?: string;
  transitionText?: string;
};

export function CompletionPanel({
  nextLabel,
  nextTo,
  title = "Modul fullført",
  transitionText,
}: CompletionPanelProps) {
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
      {transitionText ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate">
          {transitionText}
        </p>
      ) : null}
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button to="/moduler">Tilbake til moduloversikt</Button>
        {nextTo && nextLabel ? (
          <Button to={nextTo} variant="secondary">
            {nextLabel}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
