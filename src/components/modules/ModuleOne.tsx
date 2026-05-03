import { useMemo, useState } from "react";
import type { CourseModule } from "../../data/courseModules";
import { moduleOneCards } from "../../data/moduleOneCards";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ReflectionCardGrid } from "../course/ReflectionCardGrid";
import { UnlockedInsightCard } from "../course/UnlockedInsightCard";

const MIN_SELECTIONS = 3;
const MAX_SELECTIONS = 5;

type ModuleOneProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

export function ModuleOne({ courseModule, isComplete, onComplete }: ModuleOneProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedCards = useMemo(
    () => moduleOneCards.filter((card) => selectedIds.includes(card.id)),
    [selectedIds],
  );

  const selectedCount = selectedIds.length;
  const hasMinimumSelections = selectedCount >= MIN_SELECTIONS;
  const maxReached = selectedCount >= MAX_SELECTIONS;

  function toggleCard(cardId: string) {
    setSelectedIds((current) => {
      if (current.includes(cardId)) {
        return current.filter((id) => id !== cardId);
      }

      if (current.length >= MAX_SELECTIONS) {
        return current;
      }

      return [...current, cardId];
    });
  }

  return (
    <article className="space-y-8">
      <header className="overflow-hidden rounded-[2rem] border border-harbor/8 bg-white shadow-soft">
        <div className="h-2 bg-gradient-to-r from-pine via-leaf to-harbor" />
        <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Modul {courseModule.order}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              {courseModule.title}
            </h1>
            <p className="mt-4 inline-flex rounded-full bg-mist px-3 py-1 text-base font-semibold text-harbor">
              5–8 minutter
            </p>
            <div className="mt-6 max-w-3xl space-y-4 text-xl leading-9 text-slate">
              <p>
                Frivillighet handler ikke bare om å hjelpe til. Det handler om
                å bygge lokalsamfunn der mennesker ser hverandre, kjenner
                hverandre litt og stiller opp når det trengs.
              </p>
              <p>
                I denne modulen skal du utforske hva som gjør et nærmiljø
                trygt, og hvordan frivillige er med på å skape nettopp dette.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-harbor p-5 text-white shadow-soft">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Hovedbudskap
            </p>
            <p className="mt-3 max-w-sm text-xl font-bold leading-8">
              Frivillige er med på å gjøre lokalsamfunnet varmere, tryggere og
              mer menneskelig.
            </p>
          </div>
        </div>
      </header>

      <Card className="p-7 md:p-8">
        <h2 className="text-2xl font-bold text-ink">Hvorfor dette betyr noe</h2>
        <div className="mt-5 grid gap-5 text-base leading-8 text-slate lg:grid-cols-2">
          <div className="space-y-4">
            <p>
              Kommunale tjenester og offentlige ordninger er viktige. De kan gi
              hjelp, behandling, vedtak, oppfølging og praktisk bistand.
            </p>
            <p>
              Men et godt lokalsamfunn trenger mer enn tjenester. Det trenger
              relasjoner, møteplasser, tillit og mennesker som legger merke til
              hverandre.
            </p>
          </div>
          <div className="space-y-4 rounded-3xl bg-mist p-6">
            <p className="font-semibold text-harbor">
              Frivilligheten bidrar med nettopp dette.
            </p>
            <p>
              Når mennesker kjenner hverandre litt, blir terskelen lavere for å
              spørre om hjelp. Det blir lettere å oppdage om noen faller
              utenfor. Det blir lettere å invitere noen inn.
            </p>
          </div>
        </div>
      </Card>

      <section className="space-y-6" aria-labelledby="module-one-exercise">
        <div className="rounded-[2rem] border border-harbor/8 bg-white p-7 shadow-soft md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-normal text-leaf">
                Refleksjonsøvelse
              </p>
              <h2 id="module-one-exercise" className="mt-2 text-3xl font-extrabold text-ink">
                Bygg ditt trygge nærmiljø
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate">
                Velg 3–5 kort som du mener er viktigst for at et nærmiljø skal
                føles trygt og menneskelig.
              </p>
              <p className="mt-3 text-base leading-7 text-slate">
                Det finnes ikke ett riktig svar. Poenget er å legge merke til
                hva trygghet faktisk består av.
              </p>
            </div>
            <div className="rounded-3xl bg-mist p-5 text-harbor">
              <p className="text-sm font-bold uppercase tracking-normal text-slate">
                Valgt
              </p>
              <p className="mt-1 text-3xl font-extrabold" aria-live="polite">
                {selectedCount} av {MAX_SELECTIONS}
              </p>
              <p className="mt-2 text-sm font-semibold">
                Minst {MIN_SELECTIONS} kort låser opp innsikten.
              </p>
            </div>
          </div>
          <div className="mt-5" aria-live="polite">
            {!hasMinimumSelections ? (
              <p className="rounded-2xl bg-honey/18 px-4 py-3 text-sm font-semibold text-harbor">
                Velg minst 3 kort for å låse opp innsikten.
              </p>
            ) : null}
            {maxReached ? (
              <p className="rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-harbor">
                Du har valgt 5 kort. Fjern ett kort hvis du vil velge et annet.
              </p>
            ) : null}
          </div>
        </div>

        <ReflectionCardGrid
          cards={moduleOneCards}
          maxReached={maxReached}
          selectedIds={selectedIds}
          onToggle={toggleCard}
        />
      </section>

      {hasMinimumSelections ? (
        <section className="space-y-6" aria-live="polite">
          <Card className="p-7 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Dine valgte byggesteiner
            </p>
            <h2 className="mt-2 text-2xl font-bold text-ink">
              Du har valgt byggesteiner i et trygt nærmiljø
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate">
              <p>
                Det du har valgt, handler ikke først og fremst om systemer. Det
                handler om relasjoner.
              </p>
              <p>Frivillighet er en måte å bygge slike relasjoner på.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {selectedCards.map((card) => (
                <span
                  key={card.id}
                  className="rounded-2xl bg-mist px-4 py-3 text-sm font-bold text-harbor ring-1 ring-pine/25"
                >
                  {card.title}
                </span>
              ))}
            </div>
          </Card>

          <UnlockedInsightCard
            insight="Når mennesker ser hverandre, blir lokalsamfunnet tryggere."
            supportText="Som frivillig skal du ikke løse alt. Men du kan være en som ser, lytter, inviterer og bidrar til at mennesker kjenner seg mindre alene."
          />
        </section>
      ) : null}

      <div className="flex flex-col gap-4 rounded-3xl border border-harbor/8 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <Button to="/moduler" variant="secondary">
          Tilbake til moduloversikt
        </Button>
        <div className="flex flex-col gap-2 sm:items-end">
          {!hasMinimumSelections ? (
            <p className="text-sm font-semibold text-slate">
              Velg minst 3 kort for å fullføre modulen.
            </p>
          ) : null}
          <Button onClick={onComplete} disabled={!hasMinimumSelections || isComplete}>
            {isComplete ? "Modul er fullført" : "Marker som fullført"}
          </Button>
        </div>
      </div>
    </article>
  );
}
