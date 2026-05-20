# CLAUDE.md — Trygg som frivillig

Prosjekthukommelse for Claude Code. Oppdateres løpende.

---

## Prosjektet

**Kurs:** Trygg som frivillig  
**Utgiver:** Vestre Aker Frivilligsentral  
**Live URL:** https://kurs.frivilligsentralen.org/trygg-som-frivillig  
**GitHub:** https://github.com/aogaa/vafskurs  
**Stack:** React + TypeScript + Vite + Tailwind CSS  
**Deploy:** GitHub Actions → GitHub Pages, kun fra `main`-grenen

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

## Interaktive øvelser (eksisterende)

### Del 1 — Bygg ditt lokalsamfunn
Velg 2 av 5 byggesteiner → profil avsløres (5 mulige profiler).

### Del 2 — Hvilken hatt har du på?
6 scenarioer → velg rolle (frivillig / ansatt / pårørende / avklares).  
Etter alle 6: trygge formuleringer + tre kontrollspørsmål.

### Del 3 — Stopp og avklar-kompasset
Progressiv låsing i fire steg:
1. 8 kompass-scenarioer (grønt / gult / rødt)
2. 4 setningsøvelser (velg beste formulering)
3. 5 observasjonspar (klikk for å se forskjell)
4. 3 mestringsoppgaver

### Del 4 — Sluttøvelse
7 scenarioer med tre valgmuligheter → trygg formulering vises.  
Etter alle 7: velg eller skriv personlig huskeregel.

---

## Design-system

Tailwind-farger definert i `tailwind.config.js`:

| Navn | Bruk |
|------|------|
| `harbor` | Primærfarge (mørk blå-grønn), tekst og bakgrunner |
| `pine` | Aksentfarge (grønn), valgte tilstander og knapper |
| `mist` | Lys bakgrunn for kort og highlight-bokser |
| `ink` | Mørk brødtekst |
| `slate` | Dempet brødtekst |
| `leaf` | Hover-tilstand på grønne knapper |
| `honey` | Gul/oransje, brukes til advarsel/uklar-tilstand |

Typiske klasser: `rounded-2xl`, `rounded-3xl`, `shadow-soft`, `shadow-lift`

---

## Planlagte animasjoner (neste steg)

Tre steder er identifisert som høyest prioritet:

### 1. Del 1 — Supplement-visualisering
**Konsept:** Animerte lag (frivillig → pårørende → kommune/ansatte) som bygges opp visuelt.  
Prototype testet i `supplement-ikke-erstatning.html` (standalone HTML, ikke i repo).  
Plassering: ny seksjon i `ModuleOne.tsx` etter tekstseksjonene.

### 2. Del 2 — Fire roller interaktivt
**Konsept:** Klikk på en av de fire rollene → se «kan bidra med» / «skal ikke gjøre».  
Prototype testet i `fire-roller.html` (standalone HTML, ikke i repo).  
Plassering: erstatter eller beriker de statiske `RoleCard`-kortene i seksjonen «Fire roller som ikke må blandes sammen».

### 3. Del 3 — Visuelt kompass
**Konsept:** Grafisk trafikklys/kompass (grønt/gult/rødt) som er klikkbart og animert.  
Prototype testet i `stopp-tenk-avklar.html` (standalone HTML, ikke i repo).  
Plassering: ny eller erstattet visning av `compassDirections` i `ModuleThree.tsx`.

---

## Arbeidsmåte

- Alle endringer gjøres på en egen gren (f.eks. `animasjoner`), ikke direkte på `main`
- `main` → live kurs, røres ikke før vi er fornøyde
- Animasjoner bygges nativt i React/Tailwind — ingen iframes, ingen standalone HTML
- Ingen animasjonsbiblioteker installert ennå — vurder ved behov
