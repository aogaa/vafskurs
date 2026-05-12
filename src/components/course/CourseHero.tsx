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
            Frivillighet er noe av det fineste vi gjør sammen. Det handler om
            mennesker som ser hverandre, stiller opp for hverandre og bygger
            fellesskap der de bor. Når du er frivillig, er du med på å gjøre
            nærmiljøet varmere, tryggere og mer levende.
          </p>
          <p>
            Dette kurset skal gi deg en tydeligere forståelse av
            frivilligrollen, slik at det blir lettere å bidra med trygghet,
            omtanke og god dømmekraft i møte med andre mennesker.
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
