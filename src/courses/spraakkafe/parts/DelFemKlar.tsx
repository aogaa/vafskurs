import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { readStringArray, writeStringArray } from "../../../utils/storage";
import type { ModuleBodyProps } from "../../types";

/**
 * Del 5 — "Klar til din første vakt".
 *
 * Oppsummerer kurset (kursreise Del 1→5) og lar deg sette sammen din egen
 * huskeliste + skrive en kort note. Avslutter kurset.
 *
 * Lagring (kun lokalt): spraakkafe:del-5-huskeliste, spraakkafe:del-5-notat
 */

const CHECKLIST_STORAGE_KEY = "spraakkafe:del-5-huskeliste";
const NOTE_STORAGE_KEY = "spraakkafe:del-5-notat";

type JourneyStep = {
  del: string;
  icon: string;
  title: string;
  delay: string;
};

const journey: JourneyStep[] = [
  { del: "Del 1", icon: "☕", title: "Samtale, ikke undervisning", delay: "0ms" },
  { del: "Del 2", icon: "📍", title: "Slik gjør vi det hos oss", delay: "120ms" },
  { del: "Del 3", icon: "🤝", title: "Få praten i gang – inkluder alle", delay: "240ms" },
  { del: "Del 4", icon: "🧭", title: "Trygge tema og klare grenser", delay: "360ms" },
  { del: "Del 5", icon: "✅", title: "Du er klar", delay: "480ms" },
];

type ChecklistItem = { id: string; text: string };

const checklist: ChecklistItem[] = [
  { id: "tidlig", text: "Møt opp i god tid og ta godt imot deltakerne." },
  { id: "nivaa", text: "Spør om nivå ved bordet, og bytt om det trengs." },
  { id: "tekst", text: "Bruk teksten som utgangspunkt – slipp så samtalen fri." },
  { id: "tempo", text: "Snakk rolig, unngå dialektord, og la alle komme til orde." },
  { id: "inkluder", text: "Inkluder den stille, og demp vennlig den som dominerer." },
  { id: "tema", text: "Styr unna krig, religion og politikk." },
  { id: "skjema", text: "Ikke hjelp med skjemaer – vis videre til fagfolk." },
  { id: "vennlig", text: "Vær vennlig. Litt humor kommer alltid godt med." },
];

function readSavedNote(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(NOTE_STORAGE_KEY) ?? "";
}

function saveNote(value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(NOTE_STORAGE_KEY, value);
}

function TextSection({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon?: string;
}) {
  return (
    <Card className="border-l-4 border-pine/40 p-6 md:p-8">
      <h2 className="flex items-center gap-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl">
        {icon ? (
          <span className="shrink-0 text-2xl md:text-3xl" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {title}
      </h2>
      <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
        {children}
      </div>
    </Card>
  );
}

export function DelFemKlar({
  courseModule,
  isComplete,
  onComplete,
}: ModuleBodyProps) {
  const [checked, setChecked] = useState<string[]>(() =>
    readStringArray(CHECKLIST_STORAGE_KEY),
  );
  const [note, setNote] = useState(readSavedNote);

  function toggle(id: string) {
    setChecked((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      writeStringArray(CHECKLIST_STORAGE_KEY, next);
      return next;
    });
  }

  function handleNoteChange(value: string) {
    setNote(value);
    saveNote(value);
  }

  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-7 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-pine">
          Del {courseModule.order} &middot; Slik lager vi språkkafe
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Klar til din første vakt
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white">
          Nå har du oversikten. Det siste steget er å gjøre seg klar – og melde
          seg på en vakt.
        </p>
      </section>

      {/* ── Kursreise ── */}
      <section aria-label="Kursreise">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map((step) => (
            <div
              key={step.del}
              className="animate-[slideUp_320ms_ease-out_both] rounded-2xl border border-pine/45 bg-pine/20 p-5 text-center"
              style={{ animationDelay: step.delay }}
            >
              <div className="text-3xl" aria-hidden="true">
                {step.icon}
              </div>
              <p className="mt-2 text-sm font-bold uppercase tracking-normal text-harbor">
                {step.del}
              </p>
              <p className="mt-1 text-base font-semibold leading-6 text-harbor [text-wrap:balance]">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <TextSection title="Kort oppsummert" icon="📝">
        <p>
          En språkkafé er samtale, mestring og fellesskap – ikke undervisning. Du
          møter opp i god tid, tar godt imot, sjekker nivå ved bordet og bruker
          teksten som utgangspunkt før du slipper praten fri.
        </p>
        <p>
          Du holder rolig tempo, inkluderer alle, styrer unna betente tema og
          viser videre til fagfolk når noe handler om regelverk og skjemaer. Du
          trenger ikke kunne alt – møt opp, vær vennlig, og la folk prate.
        </p>
      </TextSection>

      {/* ── Huskeliste ── */}
      <section aria-labelledby="huskeliste-heading">
        <Card className="p-6 md:p-8">
          <h2
            id="huskeliste-heading"
            className="flex items-center gap-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl"
          >
            <span className="shrink-0 text-2xl md:text-3xl" aria-hidden="true">
              ✅
            </span>
            Din huskeliste
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate md:text-lg">
            Hak av det du vil ta med deg til din første vakt. Listen lagres lokalt,
            så du kan komme tilbake til den.
          </p>

          <ul className="mt-6 space-y-3">
            {checklist.map((item) => {
              const isChecked = checked.includes(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-pressed={isChecked}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                      isChecked
                        ? "border-pine bg-pine/20 text-harbor ring-2 ring-pine/45"
                        : "border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift"
                    }`}
                  >
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-xl text-base font-black ${
                        isChecked
                          ? "bg-pine text-harbor"
                          : "bg-mist text-harbor/40"
                      }`}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-base font-semibold leading-7">
                      {item.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 text-sm font-semibold text-slate" aria-live="polite">
            {checked.length} av {checklist.length} valgt
          </p>
        </Card>
      </section>

      {/* ── Egen note ── */}
      <Card className="p-6 md:p-8">
        <label htmlFor="del-5-notat" className="block text-lg font-bold text-ink">
          Din egen note: Hva vil du huske aller mest?
        </label>
        <textarea
          id="del-5-notat"
          value={note}
          onChange={(event) => handleNoteChange(event.target.value)}
          rows={4}
          placeholder="Skriv gjerne én ting du tar med deg …"
          className="mt-3 w-full rounded-2xl border border-harbor/15 bg-white p-4 text-base leading-7 text-ink focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pine"
        />
        <p className="mt-2 text-sm text-slate">
          Noten lagres bare lokalt i nettleseren din og er kun ment for deg.
        </p>
      </Card>

      <Card className="border border-pine/45 bg-pine/20 p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-harbor">
          Siste steg: meld deg på en vakt
        </h2>
        <p className="mt-3 text-base leading-8 text-harbor md:text-lg">
          Du er ikke alene – de andre frivillige, biblioteket og kontaktpersonen
          er der for å hjelpe. Meld deg på en vakt, så er du i gang. Lykke til på
          din første språkkafé!
        </p>
      </Card>

      <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-harbor/10 sm:flex-row sm:items-center sm:justify-between">
        <Button to="/" variant="secondary">
          Til hovedsiden
        </Button>
        <Button onClick={onComplete} className="bg-pine text-harbor hover:bg-leaf">
          {isComplete ? "✓ Kurset er fullført" : "Fullfør kurset"}
        </Button>
      </div>
    </article>
  );
}
