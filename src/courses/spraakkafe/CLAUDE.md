# CLAUDE.md — Slik lager vi språkkafe (Kurs 2)

Prosjekthukommelse for språkkafé-kurset. Laster automatisk når du jobber i
`src/courses/spraakkafe/`. For overordnet prosjektinfo (stack, deploy, design-
system, Tailwind-regler), se rot-`CLAUDE.md`.

---

## Om kurset

**Tittel:** Slik lager vi språkkafe
**Slug / rute:** `/spraakkafe` (deler: `/spraakkafe/deler/:delId`)
**storagePrefix:** `spraakkafe` → progresjon i `spraakkafe:completed-modules`
**Status:** `planned` (skjult fra portalen inntil vi er ferdige; ruten virker for testing)
**Målgruppe:** Nye frivillige som skal bidra på en språkkafé.

**Begrepsbruk:** Vi kaller enhetene **deler** (Del 1–5), ikke «moduler».
Brukeren ser «Del N» overalt. ID-ene i koden er `del-1` … `del-5`.
(Den delte TypeScript-typen heter fortsatt `CourseModule` — felles motor for
begge kurs, røres ikke.)

**Kilder:** Dokumentene i `/sprakkafe`-mappa (rot): «Manual Språkkafé» og
møtereferat (slik VAF gjør det), pluss teorihefter om språkkafeer.
Språknivåene A/B/C: https://prove.hkdir.no/spraknivaer

---

## Det utskiftbare laget (VIKTIGST)

Kurset er bygget slik at **én del** — Del 2 «Slik gjør vi det hos oss» — er
organisasjonsspesifikk, mens resten er likt for alle. Slik kan andre
organisasjoner gjenbruke kurset og bare bytte ut sin egen gjennomføring.

- **`organisasjon.ts`** — all VAF-spesifikk info (sted, tid, bemanning,
  bordoppsett, tekster, servering, **meråpent**, kontaktperson, merknader).
  Typen `OrganisasjonsProfil` er kontrakten. En annen organisasjon kopierer
  fila og fyller inn egne verdier — uten å endre typen.
- **`parts/DelToSlikGjorVi.tsx`** — Del 2-komponenten. Leser kun fra
  `organisasjon.ts` og rendrer det praktiske. Tomme/avslåtte felt skjules
  automatisk (f.eks. `meraapent.harMeraapent = false`).
- Del 1, 3, 4 og 5 inneholder generelt stoff og bruker det generiske stillaset.

**Meråpent (Del 2):** Røa bibliotek har meråpent. Det er en fordel om alle
frivillige har registrert seg. Ligger i `organisasjonsProfil.meraapent` med
lenke til Deichman. Slå av med `harMeraapent: false`.

---

## Delene

| ID | Tittel | Øvelse | Komponent |
|----|--------|--------|-----------|
| del-1 | Hva er en språkkafé? | «Språkkafé eller norskkurs?» + A/B/C-utforsker | `parts/DelEnSpraakkafe.tsx` ✅ |
| del-2 | Vertsrollen – samtalen ved bordet | «Hva gjør du ved bordet?» (5 scenarioer) | `parts/DelTreVertsrollen.tsx` ✅ |
| del-3 | Følsomme temaer og trygge grenser | «Grønt eller rødt?» (6 situasjoner) | `parts/DelFireGrenser.tsx` ✅ |
| del-4 | Klar til din første vakt | Kursreise + interaktiv huskeliste | `parts/DelFemKlar.tsx` ✅ |
| del-5 | Slik gjør vi det hos oss | **Organisasjonsspesifikk** visning (meråpent m.m.) | `parts/DelToSlikGjorVi.tsx` ✅ |

Alle deler har egne interaktive komponenter (ingen bruker lenger det generiske
stillaset `CourseModuleLayout`). Nye deler registreres i `moduleComponents`
(i `course.ts`).

**Lagringsnøkler (interaktive deler, kun lokalt — ingen personopplysninger):**

| Del | Nøkler |
|-----|--------|
| del-1 | `spraakkafe:del-1-ovelse`, `spraakkafe:del-1-refleksjon` |
| del-2 | `spraakkafe:del-2-ovelse`, `spraakkafe:del-2-refleksjon` |
| del-3 | `spraakkafe:del-3-ovelse`, `spraakkafe:del-3-refleksjon` |
| del-4 | `spraakkafe:del-4-huskeliste`, `spraakkafe:del-4-notat` |
| del-5 | `spraakkafe:del-5-video-sett`, `spraakkafe:del-5-quiz` (visning fra `organisasjon.ts`) |

**Mønster for interaktiv del** (se `DelEnSpraakkafe.tsx`): rik tekst i
`TextSection`-kort → flertrinns øvelse med valg, tilbakemelding (grønn `pine` =
riktig, `honey`/rød = feil) og fremdriftslinje → øvelsen gates fullføring →
refleksjons-tekstboks → «Fullfør og gå videre» som kaller `onComplete`.

---

## Filstruktur (alt språkkafé-eget samlet her)

```
src/courses/spraakkafe/
  CLAUDE.md              → denne fila
  organisasjon.ts        → OrganisasjonsProfil + VAF-profil (utskiftbart lag)
  course.ts              → CourseDescriptor + transitionCopy + moduleComponents
  modules.ts             → de 5 delene (del-1 … del-5)
  parts/
    DelToSlikGjorVi.tsx  → Del 2, leser organisasjon.ts
```

Ingen språkkafé-filer i `src/components/modules/` eller `src/data/` — kurs 1 og
kurs 2 deler kun den generiske motoren (typer, sider, progresjon).

---

## Når du legger til / endrer

- **Ny interaktiv del:** lag `parts/DelXxx.tsx` (props: `ModuleBodyProps` fra
  `../types`), render egen hero + «Fullfør»-knapp som kaller `onComplete`,
  registrer i `course.ts` → `moduleComponents["del-N"]`.
- **Ny del i kurset:** legg til i `modules.ts`, oppdater `transitionCopy` i
  `course.ts`, og legg til ruten i `scripts/create-pages-fallback.mjs`
  (`spraakkafe/deler/del-N/index.html`).
- **Sett kurset live:** endre `status` til `"active"` i `course.ts` → vises i
  portalen.
- Følg design-systemet og Tailwind-reglene i rot-`CLAUDE.md` (gyldige
  opacity-verdier, tekstkontrast på grønne bakgrunner).
