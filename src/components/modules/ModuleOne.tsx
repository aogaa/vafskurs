import { useMemo, useState } from "react";
import type { CourseModule } from "../../data/courseModules";
import { moduleOneCards } from "../../data/moduleOneCards";
import { ReflectionCardGrid } from "../course/ReflectionCardGrid";
import { UnlockedInsightCard } from "../course/UnlockedInsightCard";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const MIN_SELECTIONS = 3;
const MAX_SELECTIONS = 5;

const serviceItems = [
  "hjelp",
  "vedtak",
  "behandling",
  "oppfølging",
  "praktisk bistand",
];

const volunteerItems = [
  "relasjoner",
  "tilhørighet",
  "møteplasser",
  "lavere terskel for kontakt",
  "menneskelig nærvær",
];

const notVolunteerRole = [
  "overta tjenester",
  "gi helsehjelp",
  "bære ansvar alene",
  "love mer enn rollen tillater",
];

const canVolunteerRole = [
  "se og lytte",
  "invitere inn",
  "bidra til aktivitet",
  "være en bro til fellesskap",
];

function getSelectionMessage(selectedCount: number) {
  if (selectedCount === 0) {
    return "Velg minst 3 kort for å låse opp innsikten.";
  }

  if (selectedCount === 1) {
    return "Bra start. Velg minst 2 til.";
  }

  if (selectedCount === 2) {
    return "Nesten der. Velg 1 kort til.";
  }

  if (selectedCount === MAX_SELECTIONS) {
    return "Du har valgt maks 5 kort. Nå kan du gå videre.";
  }

  return `Innsikten er låst opp. Du kan velge opptil ${MAX_SELECTIONS - selectedCount} kort til.`;
}

type ModuleOneProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

type ComparisonListProps = {
  items: string[];
  title: string;
  tone: "blue" | "green";
};

function LearningPoint({ children }: { children: string }) {
  return (
    <div className="rounded-3xl border border-pine/20 bg-mist p-5 text-base font-bold leading-7 text-harbor">
      {children}
    </div>
  );
}

function ComparisonList({ items, title, tone }: ComparisonListProps) {
  return (
    <div
      className={`rounded-3xl p-5 ${
        tone === "blue" ? "bg-harbor text-white" : "bg-mist text-ink"
      }`}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-7">
            <span
              className={`mt-2 size-2.5 shrink-0 rounded-full ${
                tone === "blue" ? "bg-pine" : "bg-leaf"
              }`}
              aria-hidden="true"
            />
            <span className={tone === "blue" ? "text-white/82" : "text-slate"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepChain() {
  const steps = ["Kontakt", "Tillit", "Trygghet"];

  return (
    <ol
      className="rounded-3xl border border-harbor/8 bg-white p-5 shadow-sm"
      aria-label="Kontakt leder til tillit, som leder til trygghet"
    >
      {steps.map((step, index) => (
        <li
          key={step}
          className="inline-flex w-full items-center gap-3 py-2 text-xl font-bold text-ink sm:w-auto sm:py-0 sm:text-2xl"
        >
          <span className="rounded-2xl bg-mist px-4 py-3">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span
              className="text-2xl font-black text-pine sm:px-2"
              aria-hidden="true"
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function ModuleOne({ courseModule, isComplete, onComplete }: ModuleOneProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedCards = useMemo(
    () => moduleOneCards.filter((card) => selectedIds.includes(card.id)),
    [selectedIds],
  );

  const selectedCount = selectedIds.length;
  const hasMinimumSelections = selectedCount >= MIN_SELECTIONS;
  const maxReached = selectedCount >= MAX_SELECTIONS;
  const selectionMessage = getSelectionMessage(selectedCount);

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
                Før vi snakker om regler, grenser og ansvar, må vi forstå hvorfor
                frivillig innsats har så stor verdi. Tydelige rammer gir ikke
                kaldere frivillighet. De gjør det tryggere å være varm.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-harbor p-5 text-white shadow-soft">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Trygghetsreisen starter her
            </p>
            <p className="mt-3 max-w-sm text-xl font-bold leading-8">
              Frivillige er med på å gjøre lokalsamfunnet varmere, tryggere og
              mer menneskelig.
            </p>
          </div>
        </div>
      </header>

      <Card className="p-7 md:p-8">
        <p className="text-sm font-bold uppercase tracking-normal text-leaf">
          Forstå
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-ink">
          Et samfunn kan ikke bare bygges av tjenester
        </h2>
        <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate">
          <p>
            Kommunale tjenester og offentlige ordninger er viktige. De kan gi
            hjelp, behandling, vedtak, oppfølging og praktisk bistand.
          </p>
          <p>
            Men et godt lokalsamfunn trenger også noe annet: relasjoner,
            møteplasser, tillit og mennesker som legger merke til hverandre.
            Det er her frivilligheten har sin egen verdi.
          </p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <ComparisonList title="Tjenester kan gi" items={serviceItems} tone="blue" />
          <ComparisonList
            title="Frivillighet kan skape"
            items={volunteerItems}
            tone="green"
          />
        </div>
        <div className="mt-6">
          <LearningPoint>
            Kommunen kan gi tjenester. Frivilligheten kan skape tilhørighet.
          </LearningPoint>
        </div>
      </Card>

      <Card className="p-7 md:p-8">
        <p className="text-sm font-bold uppercase tracking-normal text-leaf">
          Utforsk
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-ink">
          Trygghet begynner ofte i det små
        </h2>
        <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate">
          <p>
            Trygghet handler ikke bare om planer, systemer og tjenester. Det
            handler også om at noen vet hva du heter, at noen legger merke til
            om du ikke kommer som vanlig, og at terskelen er lav for å spørre om
            hjelp.
          </p>
          <p>
            Et nærmiljø blir tryggere når mennesker ikke er fremmede for
            hverandre.
          </p>
        </div>
        <div className="mt-6">
          <StepChain />
        </div>
        <div className="mt-6">
          <LearningPoint>
            Når mennesker kjenner hverandre litt, blir det lettere å si fra,
            spørre og stille opp.
          </LearningPoint>
        </div>
      </Card>

      <Card className="p-7 md:p-8">
        <p className="text-sm font-bold uppercase tracking-normal text-leaf">
          Avklar
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-ink">
          Frivillige skal ikke løse alt
        </h2>
        <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate">
          <p>
            Som frivillig skal du ikke være ansatt, behandler, saksbehandler
            eller pårørende. Du skal ikke overta ansvar som ligger hos kommunen,
            tjenestene eller familien.
          </p>
          <p>
            Men du kan bidra med noe svært viktig: Du kan se, lytte, invitere,
            følge, støtte og være en trygg vei inn i fellesskap.
          </p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <ComparisonList
            title="Frivillige skal ikke"
            items={notVolunteerRole}
            tone="blue"
          />
          <ComparisonList title="Frivillige kan" items={canVolunteerRole} tone="green" />
        </div>
        <div className="mt-6">
          <LearningPoint>
            Frivillighetens styrke er ikke at frivillige gjør alt, men at de
            gjør noe annet.
          </LearningPoint>
        </div>
      </Card>

      <section className="space-y-6" aria-labelledby="module-one-exercise">
        <div className="rounded-[2rem] border border-harbor/8 bg-white p-7 shadow-soft md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-normal text-leaf">
                Velg
              </p>
              <h2 id="module-one-exercise" className="mt-2 text-3xl font-extrabold text-ink">
                Bygg ditt trygge nærmiljø
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate">
                Nå skal du selv velge hvilke byggesteiner du mener gjør et
                nærmiljø trygt og menneskelig.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate">
                Velg 3–5 kort som du mener er viktigst for at et nærmiljø skal
                føles trygt og menneskelig.
              </p>
              <p className="mt-3 text-base leading-7 text-slate">
                Det finnes ikke ett riktig svar. Poenget er å legge merke til
                hva trygghet faktisk består av.
              </p>
            </div>
            <div
              className={`rounded-3xl p-5 text-harbor ring-1 ${
                hasMinimumSelections ? "bg-pine/16 ring-pine/35" : "bg-mist ring-harbor/8"
              }`}
            >
              <p className="text-sm font-bold uppercase tracking-normal text-slate">
                Valgt
              </p>
              <p className="mt-1 text-3xl font-extrabold" aria-live="polite">
                {selectedCount} av {MAX_SELECTIONS} valgt
              </p>
              <p className="mt-2 text-sm font-semibold">
                {selectionMessage}
              </p>
            </div>
          </div>
          <div className="mt-5" aria-live="polite">
            <p
              className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                hasMinimumSelections ? "bg-pine/16 text-harbor" : "bg-honey/18 text-harbor"
              }`}
            >
              {selectionMessage}
            </p>
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
              Oppdag
            </p>
            <h2 className="mt-2 text-2xl font-bold text-ink">
              Dine byggesteiner forteller noe viktig
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate">
              Hvert kort du har valgt peker på en side av nærmiljøet du ønsker
              å være med på å skape.
            </p>
            <div className="mt-6 rounded-3xl bg-mist p-5">
              <h3 className="text-lg font-bold text-harbor">
                Dine valgte byggesteiner
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {selectedCards.map((card) => (
                  <span
                    key={card.id}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-harbor ring-1 ring-pine/25"
                  >
                    {card.title}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate">
                Dette er ikke en fasit. Det er ditt bilde av hva som gjør et
                nærmiljø tryggere.
              </p>
            </div>
            <div className="mt-6 grid gap-4">
              {selectedCards.map((card) => (
                <section
                  key={card.id}
                  className="rounded-3xl border border-harbor/8 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-ink">{card.title}</h3>
                  <div className="mt-4 space-y-3 text-base leading-8 text-slate">
                    {card.fullText.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="mt-6 rounded-3xl border border-pine/25 bg-mist p-5">
              <h3 className="text-xl font-bold text-harbor">
                Samlet innsikt fra valgene dine
              </h3>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate">
                <p>
                  Du har valgt byggesteiner som handler om mer enn hyggelige
                  aktiviteter.
                </p>
                <p>
                  Du har valgt et nærmiljø der mennesker blir lagt merke til.
                  Der noen spør hvordan det går. Der det finnes steder å høre
                  til. Der små handlinger kan gjøre hverdagen tryggere for
                  andre.
                </p>
                <p className="text-lg font-bold text-harbor">
                  Dette er kjernen i frivillighet.
                </p>
                <p>
                  Frivillige bygger ikke systemer. De bygger relasjoner. De gjør
                  at mennesker ikke bare blir brukere, pasienter, innbyggere
                  eller mottakere av tjenester, men medmennesker som blir sett.
                </p>
                <p>
                  Når du velger å være frivillig, er du med på å holde
                  lokalsamfunnet menneskelig.
                </p>
                <p>
                  Det betyr ikke at du skal løse alt. Det betyr at du kan være
                  en viktig del av noe større: et fellesskap der mennesker angår
                  hverandre.
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-3xl border border-pine/25 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-ink">
                Dette er nærmiljøet du har vært med på å bygge i øvelsen.
              </h3>
              <div className="mt-3 space-y-3 text-base leading-8 text-slate">
                <p>
                  Nå handler resten av kurset om hvordan du kan bidra til det i
                  praksis: med varme, tydelige grenser og trygg rolleforståelse.
                </p>
                <p>
                  Du skal ikke lære å bli ansatt, behandler eller saksbehandler.
                  Du skal lære å være trygg som frivillig.
                </p>
              </div>
              <div className="mt-5">
                <Button onClick={onComplete} disabled={!hasMinimumSelections || isComplete}>
                  {isComplete ? "Modul er fullført" : "Fullfør modul 1"}
                </Button>
              </div>
            </div>
          </Card>

          <UnlockedInsightCard
            insight="Når mennesker ser hverandre, blir lokalsamfunnet tryggere."
            supportText="Som frivillig skal du ikke løse alt. Men du kan være en som ser, lytter, inviterer og bidrar til at mennesker kjenner seg mindre alene."
            courseLinkText="Resten av kurset handler om hvordan du kan gjøre dette på en trygg måte – med tydelig rolle, gode grenser og klare kontaktveier når du blir usikker."
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
