# Oppsett på ny PC for `vafskurs`

Denne oppskriften viser hvordan du installerer det du trenger på en ny Windows-PC, henter ned prosjektet fra GitHub og starter kursplattformen lokalt.

## 1. Installer Git

Last ned Git for Windows:

https://git-scm.com/download/win

Installer med standardvalg.

Åpne PowerShell og sjekk at Git virker:

```powershell
git --version
```

## 2. Installer Node.js

Last ned LTS-versjonen av Node.js:

https://nodejs.org

Sjekk etter installasjon:

```powershell
node --version
npm --version
```

## 3. Lag prosjektmappe

```powershell
mkdir C:\codex
cd C:\codex
```

## 4. Hent prosjektet fra GitHub

```powershell
git clone https://github.com/aogaa/vafskurs.git
cd C:\codex\vafskurs
```

## 5. Installer dependencies

Anbefalt hvis `package-lock.json` finnes:

```powershell
npm ci
```

Alternativt:

```powershell
npm install
```

## 6. Start prosjektet lokalt

```powershell
npm run dev
```

Åpne adressen som vises i terminalen, vanligvis:

```text
http://localhost:5173
```

## 7. Sjekk status før du jobber videre

```powershell
git branch
git status
```

Hvis du senere skal hente siste versjon fra GitHub:

```powershell
git pull origin main
```

## Viktig før du bytter PC

På den gamle PC-en bør alle endringer være committed og pushet før du flytter videre:

```powershell
git status
git add .
git commit -m "Oppdater kursplattform"
git push origin main
```

Ikke commit `dist/`. Den er generert build-output og skal ignoreres av Git.

