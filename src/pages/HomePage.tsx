import { CourseHero } from "../components/course/CourseHero";
import { ProgressSummary } from "../components/course/ProgressSummary";
import { PageContainer } from "../components/layout/PageContainer";
import { courseModules } from "../data/courseModules";
import { useProgress } from "../hooks/useProgress";

export function HomePage() {
  const { completedModuleIds } = useProgress();
  const completedCount = completedModuleIds.length;
  const nextPart =
    courseModules.find((courseModule) => !completedModuleIds.includes(courseModule.id)) ??
    courseModules[courseModules.length - 1];

  return (
    <PageContainer>
      <CourseHero />
      <section className="grid gap-5 py-8 md:grid-cols-3">
        <div className="rounded-3xl bg-harbor p-7 text-white shadow-soft">
          <h2 className="text-2xl font-bold">Du får en tydelig rolle</h2>
          <p className="mt-4 leading-7 text-white/78">
            Du bidrar med tid, nærvær og menneskelig kontakt på en måte som er
            trygg for både deg og den du møter.
          </p>
        </div>
        <div className="rounded-3xl border border-harbor/8 bg-white p-7 shadow-soft">
          <h2 className="text-2xl font-bold text-ink">Du blir tryggere på rammen</h2>
          <p className="mt-4 leading-7 text-slate">
            Kurset hjelper deg å kjenne igjen når du kan handle, når du bør
            avklare, og hvordan du kan bruke leder når noe blir vanskelig.
          </p>
        </div>
        <div className="rounded-3xl bg-mist p-7 shadow-soft ring-1 ring-pine/18">
          <h2 className="text-2xl font-bold text-ink">Du går ett steg om gangen</h2>
          <p className="mt-4 leading-7 text-slate">
            10 korte deler, praktiske eksempler og en rolig progresjon som gjør
            det lett å komme i gang.
          </p>
        </div>
      </section>
      <section className="py-8" aria-labelledby="home-message-title">
        <div className="rounded-[2rem] bg-harbor p-8 text-white shadow-soft md:p-10">
          <p className="text-sm font-bold uppercase tracking-normal text-pine">
            Hovedbudskap
          </p>
          <h2 id="home-message-title" className="sr-only">
            Kursets hovedbudskap
          </h2>
          <blockquote className="mt-4 max-w-5xl text-2xl font-bold leading-10 md:text-3xl md:leading-[3rem]">
            Du kan være et varmt og viktig menneske i lokalsamfunnet. Kurset gir
            deg språk, rammer og trygghet til å bidra uten å stå alene.
          </blockquote>
        </div>
      </section>
      <div className="py-8">
        <ProgressSummary
          completedCount={completedCount}
          nextModuleTitle={nextPart?.title}
          totalCount={courseModules.length}
        />
      </div>
    </PageContainer>
  );
}
