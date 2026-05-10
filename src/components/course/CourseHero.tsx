import { Button } from "../ui/Button";

export function CourseHero() {
  return (
    <section className="py-8 lg:py-14">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
          Trygg som frivillig
        </h1>
        <div className="mt-6 max-w-3xl space-y-5 text-lg leading-8 text-slate sm:text-xl sm:leading-9">
          <p className="text-2xl font-bold leading-9 text-fjord sm:text-3xl sm:leading-10">
            Et grunnkurs for deg som vil bidra i møte med mennesker og
            lokalsamfunn.
          </p>
          <p>
            Frivillighet handler ikke om å kunne alt eller løse alt. Det handler
            om å møte mennesker med varme, forstå rollen sin og vite hvem man kan
            spørre når noe blir uklart.
          </p>
          <p>
            I dette kurset får du en praktisk innføring i frivilligrollen, gode
            grenser, ansvar og samspill med andre. Målet er at du skal bli
            tryggere på hva du kan bidra med - og hva du ikke skal stå alene
            med.
          </p>
          <p>
            Kurset er i ti korte deler og du trenger ikke noen forberedelser.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/trygg-som-frivillig/deler/modul-1">Start kurset</Button>
          <Button to="/trygg-som-frivillig/deler" variant="ghost">
            Se delene
          </Button>
        </div>
      </div>
    </section>
  );
}
