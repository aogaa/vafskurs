import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import type { ModuleBodyProps } from "../../types";
import {
  organisasjonsProfil as profil,
  type ProfilPunkt,
} from "../organisasjon";

/**
 * Del 2 — "Slik gjør vi det hos oss".
 *
 * Dette er den ENESTE delen som er organisasjonsspesifikk. Alt innhold leses
 * fra `organisasjon.ts`. En annen organisasjon bytter ut profilen der, og
 * denne delen forteller automatisk deres historie — uten å røre komponenten.
 */

function PunktListe({ punkter }: { punkter: ProfilPunkt[] }) {
  return (
    <ul className="mt-4 space-y-4">
      {punkter.map((punkt) => (
        <li key={punkt.tittel} className="flex gap-3">
          <span
            className="mt-1 grid size-7 shrink-0 place-items-center rounded-2xl bg-pine/20 text-sm font-black text-harbor"
            aria-hidden="true"
          >
            ✓
          </span>
          <span className="text-base leading-7 text-ink">
            <span className="font-bold text-harbor">{punkt.tittel}</span>
            {punkt.detalj ? (
              <span className="block text-slate">{punkt.detalj}</span>
            ) : null}
            {punkt.lenke ? (
              <a
                href={punkt.lenke.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-2xl bg-mist px-3 py-1.5 text-sm font-bold text-harbor ring-1 ring-harbor/10 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
              >
                <span aria-hidden="true">▶</span>
                {punkt.lenke.tekst}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-7 ring-1 ring-harbor/10">
      <h2 className="flex items-center gap-3 text-xl font-bold text-ink">
        <span aria-hidden="true">{icon}</span>
        {title}
      </h2>
      {children}
    </Card>
  );
}

export function DelToSlikGjorVi({
  courseModule,
  isComplete,
  onComplete,
}: ModuleBodyProps) {
  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-7 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-pine">
          Del {courseModule.order} &middot; Slik lager vi språkkafe
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Slik gjør vi det hos oss
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white">
          Slik gjennomfører {profil.organisasjon} språkkafeen.
        </p>
      </section>

      {/* Hurtigfakta */}
      <Card className="bg-mist p-7 ring-1 ring-harbor/10">
        <h2 className="text-xl font-bold text-harbor">Kort fortalt</h2>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-bold uppercase tracking-normal text-harbor">
              Hvor
            </dt>
            <dd className="mt-1 text-base leading-7 text-ink">
              {profil.sted}
              {profil.adresse ? (
                profil.kartlenke ? (
                  <a
                    href={profil.kartlenke}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex w-fit items-center gap-2 font-bold text-harbor underline decoration-pine decoration-2 underline-offset-2 hover:text-leaf focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
                  >
                    <span aria-hidden="true">📍</span>
                    {profil.adresse}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="block">{profil.adresse}</span>
                )
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold uppercase tracking-normal text-harbor">
              Når
            </dt>
            <dd className="mt-1 text-base leading-7 text-ink">
              {profil.tidspunkt}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold uppercase tracking-normal text-harbor">
              Oppmøte
            </dt>
            <dd className="mt-1 text-base leading-7 text-ink">
              {profil.oppmote}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold uppercase tracking-normal text-harbor">
              Varighet
            </dt>
            <dd className="mt-1 text-base leading-7 text-ink">
              {profil.varighet}
            </dd>
          </div>
        </dl>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard title="Påmelding og avlysning" icon="📋">
          <PunktListe punkter={[profil.paamelding]} />
          <p className="mt-4 rounded-2xl bg-mist p-4 text-base leading-7 text-harbor">
            {profil.kontaktperson.avlysningRutine}
          </p>
        </InfoCard>

        <InfoCard title="Bemanning" icon="🧑‍🤝‍🧑">
          <PunktListe punkter={[profil.bemanning]} />
        </InfoCard>
      </div>

      <InfoCard title="Bordene og deltakerne" icon="🪑">
        <PunktListe punkter={profil.bordoppsett} />
      </InfoCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard title="Tekster" icon="📖">
          <PunktListe punkter={[profil.tekster]} />
        </InfoCard>

        <InfoCard title="Servering" icon="☕">
          <PunktListe punkter={[profil.servering]} />
        </InfoCard>
      </div>

      {/* Meråpent — fremhevet, kan slås av for organisasjoner uten ordningen */}
      {profil.meraapent.harMeraapent ? (
        <Card className="border border-pine/45 bg-pine/20 p-7">
          <h2 className="flex items-center gap-3 text-xl font-bold text-harbor">
            <span aria-hidden="true">🔑</span>
            Meråpent
          </h2>
          <p className="mt-4 text-base leading-7 text-harbor">
            {profil.meraapent.tekst}
          </p>
          {profil.meraapent.lenke ? (
            <a
              href={profil.meraapent.lenke}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-harbor ring-1 ring-harbor/10 transition-colors hover:bg-mist focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
            >
              {profil.meraapent.lenketekst ?? "Les mer"}
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </Card>
      ) : null}

      {profil.merknader.length > 0 ? (
        <InfoCard title="Verdt å vite" icon="💡">
          <PunktListe punkter={profil.merknader} />
        </InfoCard>
      ) : null}

      <div className="mt-12 flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-harbor/10 sm:flex-row sm:items-center sm:justify-between">
        <Button to="/" variant="secondary">
          Til hovedsiden
        </Button>
        <Button
          onClick={onComplete}
          className="bg-pine text-harbor hover:bg-leaf"
        >
          {isComplete ? "✓ Fullført – gå til neste del" : "Fullfør og gå videre"}
        </Button>
      </div>
    </article>
  );
}
