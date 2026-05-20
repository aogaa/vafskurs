# CLAUDE.md — Trygg som frivillig

Prosjekthukommelse for Claude Code. Oppdateres løpende.

---

## Prosjektet

**Kurs:** Trygg som frivillig
**Utgiver:** Vestre Aker Frivilligsentral
**Live URL:** https://kurs.frivilligsentralen.org/trygg-som-frivillig
**GitHub:** https://github.com/aogaa/vafskurs
**Stack:** React + TypeScript + Vite + Tailwind CSS
**Deploy:** GitHub Actions → GitHub Pages, kun fra `main`-grenen (`deploy.yml`)

---

## Viktige git-punkter

| Tag | Commit | Beskrivelse |
|-----|--------|-------------|
| `v1.0-ferdig-kurs` | a5f3449 | Ferdig kurs før animasjoner — trygt tilbakepunkt |

**Rulle tilbake til v1.0-ferdig-kurs:**
```bash
git checkout v1.0-ferdig-kurs          # se koden (detached HEAD)
git reset --hard v1.0-ferdig-kurs      # tilbakestill main lokalt
git push --force origin main           # tving GitHub til samme punkt
```

**Arbeidsgren for animasjoner:** `animasjoner`
- Lag grenen hvis den ikke finnes: `git checkout -b animasjoner`
- Bytt til den: `git checkout animasjoner`
- Push: `git push -u origin animasjoner`
- Merge til main når klar: `git checkout main && git merge animasjoner && git push`

---

## Kursstruktur

Fire deler, alle fullt utbygde React-komponenter:

| ID | Fil | Tittel | Status |
|----|-----|--------|--------|
| modul-1 | `src/components/modules/ModuleOne.tsx` | Frivillighet er å være del av noe større | `active` |
| modul-2 | `src/components/modules/ModuleTwo.tsx` | Frivilligrollen – hva er min rolle? | `planned` |
| modul-3 | `src/components/modules/ModuleThree.tsx` | Når noe blir uklart – stopp og avklar | `planned` |
| modul-4 | `src/components/modules/ModuleFour.tsx` | Klar til å bidra | `planned` |

Ruting: `/trygg-som-frivillig/deler/:moduleId`
Progresjon låst: del 2 krever fullført del 1, osv.
Progresjon lagres i `localStorage` via `src/hooks/useProgress.ts`.

---

## Interaktive øvelser (eksisterende — ikke rør disse)

### Del 1 — Bygg ditt lokalsamfunn (`ModuleOne.tsx`)
Velg 2 av 5 byggesteiner → profil avsløres (5 mulige profiler).
Lagres i localStorage: `trygg-som-frivillig:del-1-byggesteiner` og `trygg-som-frivillig:del-1-refleksjon`.

### Del 2 — Hvilken hatt har du på? (`ModuleTwo.tsx`)
6 scenarioer → velg rolle (frivillig / ansatt / pårørende / avklares).
Etter alle 6 er fullført: trygge formuleringer + tre kontrollspørsmål + refleksjonstekstboks.
Lagres i localStorage: `trygg-som-frivillig:del-2-svar` og `trygg-som-frivillig:del-2-refleksjon`.

### Del 3 — Stopp og avklar-kompasset (`ModuleThree.tsx`)
Progressiv låsing i fire steg — hvert steg åpnes når forrige er fullført:
1. 8 kompass-scenarioer (velg: grønt / gult / rødt)
2. 4 setningsøvelser (velg beste formulering av tre)
3. 5 observasjonspar (klikk for å bekrefte sett)
4. 3 mestringsoppgaver (rask kompasstest)
Lagres i fire localStorage-nøkler (se toppen av ModuleThree.tsx).

### Del 4 — Sluttøvelse (`ModuleFour.tsx`)
7 scenarioer med tre valgmuligheter (a/b/c) → anbefalt valg + trygg formulering vises.
Etter alle 7: velg blant 5 ferdige huskeregeler eller skriv egen.
Lagres i localStorage: `trygg-som-frivillig:del-4-sluttovelse-svar` og `trygg-som-frivillig:del-4-huskeregel`.

---

## Design-system

Tailwind-farger definert i `tailwind.config.js`:

| Navn | Bruk |
|------|------|
| `harbor` | Primærfarge (mørk blå-grønn) — hero-bakgrunner, titler, ikoner |
| `pine` | Aksentfarge (grønn) — valgte tilstander, knapper, progress-bar |
| `mist` | Lys bakgrunn — kort-bakgrunner, highlight-bokser |
| `ink` | Mørk brødtekst |
| `slate` | Dempet brødtekst |
| `leaf` | Hover-tilstand på grønne knapper |
| `honey` | Gul/oransje — advarsel, uklar-tilstand, feil svar |

Typiske klasser:
- Kort: `rounded-2xl` eller `rounded-3xl`, `shadow-soft`, `shadow-lift`
- Knappebase: `focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine`
- Høydepunkts-sitat: `flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center font-bold text-harbor [text-wrap:balance]`
- Valgt tilstand: `border-pine bg-pine/18 text-harbor ring-2 ring-pine/45`
- Feil/uklar: `border-honey/70 bg-honey/18 text-harbor`

Eksisterende CSS-animasjon i bruk: `animate-[fadeIn_240ms_ease-out]` (definert i `src/index.css`).
Sjekk `src/index.css` for keyframes før du legger til nye.

UI-komponenter:
- `src/components/ui/Card.tsx` — standard kortomslag
- `src/components/ui/Button.tsx` — knapper (variant: default / secondary)

---

## Animasjonsplan — prioritert rekkefølge

Alle animasjoner bygges nativt i React + Tailwind. Ingen iframes. Ingen standalone HTML.
Ingen animasjonsbiblioteker installert — vurder kun ved behov.

---

### ✅ Status-oversikt

| # | Animasjon | Del | Status |
|---|-----------|-----|--------|
| 1 | Fire roller — interaktiv ekspandering | Del 2 | ⬜ Ikke startet |
| 2 | Supplement-lagvisualisering | Del 1 | ⬜ Ikke startet |
| 3 | Visuelt kompass (trafikklys) | Del 3 | ⬜ Ikke startet |
| 4 | Stopp → Tenk → Avklar stegvisning | Del 3 | ⬜ Ikke startet |
| 5 | Besøksvenn-scenario med avatarer | Del 2 | ⬜ Ikke startet |
| 6 | Kursreise-oppsummering ved fullføring | Del 4 | ⬜ Ikke startet |

---

### 1 — Fire roller: interaktiv ekspandering (Del 2)

**Fil:** `src/components/modules/ModuleTwo.tsx`
**Plassering:** Erstatt de fire statiske `RoleCard`-kortene i seksjonen med tittel
`"Fire roller som ikke må blandes sammen"` (ca. linje 338–395 i original).

**Konsept:**
Fire store klikk-kort, ett per rolle, vises i 2×2-grid. Klikket kort ekspanderer og
viser to kolonner: «Kan bidra med» og «Skal ikke gjøre». Én rolle aktiv om gangen.
Inaktive kort dempes (opacity) mens en er aktiv.

**Rolledata som skal inn:**

```
Frivillig 🤝
  Kan: Nærvær og samtale · Aktivitet og fellesskap · Følge til møteplass (avtalt) · Praktisk lavterskelhjelp (avtalt) · Brobygging
  Ikke: Helsehjelp eller medisiner · Personlig stell · Håndtere økonomi · Saksbehandling · Faglige vurderinger

Ansatt / fagperson 🏥
  Kan: Faglige vurderinger · Helsehjelp og pleie · Vedtak og saksbehandling · Dokumentasjon · Formelt tjenesteansvar
  Ikke: Erstatte frivillig nærvær og fellesskap · Alltid ha tid til lange samtaler

Pårørende 👨‍👩‍👧
  Kan: Familierelasjon og nære bånd · Privat omsorg og støtte · Kjenne personen over lang tid
  Ikke: Bestemme hva frivillige skal gjøre · Utvide frivilliges oppdrag · Erstatte kommunale tjenester

Kommune / tjenester 🏛️
  Kan: Lovpålagte tjenester · Vedtak og rettigheter · Faglig oppfølging · Nødvendige helse- og omsorgstjenester
  Ikke: Dekkes av frivillige · Overlate ansvar til frivillig sektor
```

**Teknisk løsning:**
```tsx
// State: hvilken rolle er åpen (null = ingen)
const [activeRole, setActiveRole] = useState<string | null>(null);

// Hvert kort: onClick toggler activeRole
// Åpent kort: max-h animert fra 0 til auto via CSS transition
// Bruk: transition-all duration-300 ease-in-out
// Lukket: max-h-0 overflow-hidden opacity-0
// Åpent: max-h-[500px] opacity-100
```

**Komponentnavn:** `RoleExpandCard` — lag som lokal komponent øverst i ModuleTwo.tsx.

---

### 2 — Supplement-lagvisualisering (Del 1)

**Fil:** `src/components/modules/ModuleOne.tsx`
**Plassering:** Ny `TextSection` etter seksjonen med tittel `"Trygghet begynner med at vi
kjenner hverandre"` og før `"Frivillighet finnes overalt"`.

**Konsept:**
Tre horisontale lag animeres inn nedenfra med forsinkelse (staggered). Hvert lag er
klikkbart og viser en forklaringstekst under. Nederste lag er alltid synlig/bredest
(grunnmur). En knapp «Hva skjer uten frivillige?» demper topplaget visuelt.

**Lagstruktur:**
```
Lag 3 (topp):    🤝 Frivillig        — smalt, grønt (pine)
Lag 2 (midten):  👨‍👩‍👧 Pårørende        — middels, blå-grønn (harbor/60)
Lag 1 (bunn):    🏛️ Kommune/Ansatte   — bredt, harbor (mørkest)
```

**Forklaringstekster per lag:**
```
Frivillig: "Som frivillig legger du til noe ekstra: nærvær, fellesskap og menneskelig
kontakt. Du er ikke en del av det formelle systemet — du er et varm tillegg til det."

Pårørende: "Familie og nære bidrar med kjærlighet, kunnskap og kontinuitet over tid.
De kjenner personen på en måte ingen tjeneste kan erstatte."

Kommune/Ansatte: "Den formelle grunnmuren: lovpålagte tjenester, faglig oppfølging,
vedtak og sikkerhet. Alltid til stede, uansett om du er frivillig eller ikke."
```

**«Hva skjer uten frivillige?»-knapp:**
Topplaget får `opacity-30` og en liten risting (`animate-pulse` eller shake-keyframe).
Tekst vises: «Grunnmuren står. Men noe varmt mangler.»
Knappen endres til «Vis frivillige igjen».

**Teknisk løsning:**
```tsx
const [activeLayer, setActiveLayer] = useState<string | null>(null);
const [hidingVolunteer, setHidingVolunteer] = useState(false);

// Inn-animasjon: bruk animationDelay på hvert lag (0ms, 150ms, 300ms)
// Keyframe 'slideUp': from translateY(24px) opacity-0 → to translateY(0) opacity-100
// Legg til i index.css hvis ikke finnes
```

**Komponentnavn:** `SupplementLayers` — lag som egen komponent i ModuleOne.tsx eller
ny fil `src/components/modules/SupplementLayers.tsx`.

---

### 3 — Visuelt kompass / trafikklys (Del 3)

**Fil:** `src/components/modules/ModuleThree.tsx`
**Plassering:** Øverst i det eksisterende `<Card>`-blokken med tittel
`"Stopp og avklar-kompasset"` (ca. linje 873 i original). Erstatter eller
supplerer den statiske tekst-lista over `compassDirections`.

**Konsept:**
Tre sirkler stablet vertikalt (som trafikklys) eller i en trekant.
Aktiv sirkel gløder med `box-shadow`/ring-animasjon. Ved svar på
et scenario blinker riktig farge én gang.

**SVG/CSS-løsning (ingen SVG-bibliotek nødvendig):**
```tsx
// Tre div-er med rounded-full, fargestyrt av compassDirections[].id
// Grønn: bg-pine, ring-pine   (id: 'green')
// Gul:   bg-honey, ring-honey (id: 'yellow')
// Rød:   bg-red-500, ring-red-400 (id: 'red')

// Pulserende glow når aktiv:
// className={isActive ? "ring-4 ring-offset-2 animate-pulse" : "opacity-40"}
```

**Kobling til eksisterende scenario-øvelse:**
`selectedScenarioAction` (allerede i state) brukes til å belyse riktig sirkel
etter at brukeren har svart. Legg kompasset som en sticky/fast komponent
øverst i scenario-seksjonen.

**Komponentnavn:** `CompassVisual` — lag som lokal komponent øverst i ModuleThree.tsx.

---

### 4 — Stopp → Tenk → Avklar stegvisning (Del 3)

**Fil:** `src/components/modules/ModuleThree.tsx`
**Plassering:** I seksjonen med tittel `"Hovedregelen: Stopp, tenk og avklar"`,
rett etter innledningsavsnittet, som erstatning for eller supplement til
den flate tekstlisten.

**Konsept:**
Tre steg vises som et horisontalt (mobil: vertikalt) steg-diagram med pil mellom.
Hvert steg animeres inn med 200ms forsinkelse.

```
[ ✋ Stopp ] → [ 💭 Tenk ] → [ 📞 Avklar ]
```

Hvert steg-kort har: ikon, tittel, én linje forklaringstekst.
Ingen interaktivitet — rent visuelt anker.

**Data:**
```
Stopp   ✋  "Ikke handle for raskt. Kjenn etter om noe er uklart."
Tenk    💭  "Er dette avtalt? Er det trygt? Er det min rolle?"
Avklar  📞  "Kontakt leder eller kontaktperson. Bruk nødnummer ved akutt fare."
```

**Teknisk løsning:**
```tsx
// Tre kort i flex-row (md:), flex-col (sm:)
// Pil mellom: hidden på mobil, ← aria-hidden="true" →
// Animasjon: animationDelay 0 / 200 / 400ms med slideUp eller fadeIn
```

**Komponentnavn:** `StopThinkClarify` — lag som lokal komponent i ModuleThree.tsx.

---

### 5 — Besøksvenn-scenario med avatarer (Del 2)

**Fil:** `src/components/modules/ModuleTwo.tsx`
**Plassering:** Ny seksjon etter scenarioøvelsen («Hvilken hatt har du på?»),
synlig etter at alle 6 scenarioer er fullført (`hasCompletedExercise === true`).
Legges inn før «Eksempler på trygge formuleringer».

**Konsept:**
To SVG-avatarer (Kari og Olav) sitter med kaffekopper. Olav snakker (talebobble).
Brukeren velger hva Kari gjør. To animerte utfall vises.

**Avatarer (enkle SVG-sirkelfigurer, ikke realistiske):**
```
Kari (~50 år, frivillig): Lyseblå genser, briller, lyse grå-brunt hår
Olav (~78 år, bruker):    Beige genser, hvitt hår, bart
```

**Dialog og valg:**
```
Situasjon: Kari og Olav sitter i stuen. Kaffe på bordet.
Olav sier: «Kari, jeg må på do. Kan du hjelpe meg?»

Valg A ✅: Kari sier: «Det kan jeg dessverre ikke gjøre som frivillig.
           Jeg ringer hjemmetjenesten med én gang.»
           → Utfall: Sykepleier ankommer. Olav er lettet. Kari er trygg.
           → Tekst: «Å si nei er ikke mangel på omsorg. Det er en del av omsorgen.»

Valg B ❌: Kari hjelper.
           → Utfall: Begge ser ubehagelige ut. Situasjonen er vanskelig.
           → Tekst: «Dette kan skape utrygghet, risiko og uklart ansvar
                     — for Olav, for Kari og for organisasjonen.»
```

**Teknisk løsning:**
```tsx
type BesoksVennChoice = "riktig" | "feil" | null;
const [choice, setChoice] = useState<BesoksVennChoice>(null);

// SVG-avatarer: enkle circles + paths for hode/kropp/hår
// Talebobble: SVG path eller CSS clip-path
// Animasjon etter valg: fadeIn på utfall-seksjonen
// Kaffe-damp: enkel CSS keyframe (translateY + opacity oscillering)
```

**Komponentnavn:** `BesoksVennScenario` — vurder egen fil
`src/components/modules/BesoksVennScenario.tsx` pga. størrelse.

---

### 6 — Kursreise-oppsummering (Del 4)

**Fil:** `src/components/modules/ModuleFour.tsx`
**Plassering:** Øverst i `hasCompletedExercise`-blokken, som første element
etter at alle 7 scenarioer er fullført. Før «Din egen huskeregel».

**Konsept:**
Fire kort på en horisontal linje (mobil: vertikalt), ett per del, med
det viktigste budskapet. Animeres inn med staggered forsinkelse.

**Data:**
```
Del 1 🤝  "Du er del av noe større"
Del 2 🎭  "Kjenn rollen din"
Del 3 🧭  "Stopp og avklar"
Del 4 ✅  "Du er klar"
```

Hvert kort: liten sirkel med del-nummer, ikon, tittel, én linje.
Alle kort har `bg-pine/18 border-pine/45` — en samlet, lys grønn stemning.

**Teknisk løsning:**
```tsx
// Ren CSS staggered animasjon, animationDelay per kort
// Ingen interaktivitet nødvendig
// Vurder om brukeren skal kunne «ta skjermbilde» — legg til print:block
```

**Komponentnavn:** `CourseJourney` — lokal komponent i ModuleFour.tsx.

---

## Tekniske retningslinjer for alle animasjoner

### CSS-animasjoner
Sjekk `src/index.css` for eksisterende keyframes (`fadeIn` er allerede definert).
Legg nye keyframes til i `src/index.css`:
```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(1.5rem); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-4px); }
  75%       { transform: translateX(4px); }
}
```

### Tilgjengelighet
- Bruk alltid `aria-live="polite"` på innhold som endres etter brukerinteraksjon
- Bruk `aria-pressed` på toggle-knapper
- Respekter `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; }
}
```

### Mobil
- Alle animasjoner er testet for mobil-first
- Grid: `grid-cols-1` → `md:grid-cols-2` / `lg:grid-cols-4`
- Horisontal steg-layout: `flex-col sm:flex-row`

### TypeScript
- Alle props-typer defineres eksplisitt
- Ingen `any` — bruk `unknown` ved behov
- State-typer: bruk union types fremfor boolean-flagg der mulig

---

## Arbeidsmåte

- Jobb på grenen `animasjoner`, ikke direkte på `main`
- `main` → live kurs — røres ikke før vi er fornøyde og har testet
- Test lokalt med `npm run dev`
- Én animasjon av gangen, commit etter hver
- Oppdater status-tabellen i denne filen (✅ / 🚧 / ⬜) etter hvert
