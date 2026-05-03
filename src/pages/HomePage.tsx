import { CourseHero } from "../components/course/CourseHero";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionTitle } from "../components/ui/SectionTitle";

export function HomePage() {
  return (
    <PageContainer>
      <CourseHero />
      <section className="grid gap-5 py-8 md:grid-cols-3">
        <div className="rounded-3xl bg-harbor p-7 text-white shadow-soft">
          <h2 className="text-2xl font-bold">Rollen er tydelig</h2>
          <p className="mt-4 leading-7 text-white/78">
            Du bidrar som medmenneske, ikke som ansatt, behandler eller
            saksbehandler.
          </p>
        </div>
        <div className="rounded-3xl border border-harbor/8 bg-white p-7 shadow-soft">
          <h2 className="text-2xl font-bold text-ink">Grensene er trygge</h2>
          <p className="mt-4 leading-7 text-slate">
            Kurset hjelper deg å kjenne igjen når du kan handle, og når du bør
            stoppe og avklare.
          </p>
        </div>
        <div className="rounded-3xl bg-mist p-7 shadow-soft ring-1 ring-pine/18">
          <h2 className="text-2xl font-bold text-ink">Veien er rolig</h2>
          <p className="mt-4 leading-7 text-slate">
            Korte moduler, praktiske eksempler og en progresjon som er lett å
            følge.
          </p>
        </div>
      </section>
      <section className="py-8">
        <div className="rounded-[2rem] border border-harbor/8 bg-white p-8 shadow-soft">
          <SectionTitle
            eyebrow="Hovedbudskap"
            title="Jeg vet hva rollen min er"
            description="Jeg vet hvorfor den er viktig. Jeg vet hvor grensene går. Og hvis jeg blir usikker, vet jeg hvem jeg spør."
          />
        </div>
      </section>
    </PageContainer>
  );
}
