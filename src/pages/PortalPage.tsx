import { Link } from "react-router-dom";
import heroindex from "../assets/images/heroindex.png";

const courseCards = [
  {
    title: "Trygg som frivillig",
    description:
      "Et praktisk kurs om frivilligrollen, gode grenser og trygge valg i møte med mennesker, lokalsamfunn og kommunale tjenester.",
    image: heroindex,
    to: "/trygg-som-frivillig",
  },
];

export function PortalPage() {
  return (
    <div className="bg-harbor text-white">
      <section className="relative isolate min-h-[70vh] overflow-hidden">
        <img
          src={heroindex}
          alt="Kursportal for frivillige med fokus på læring, fellesskap og lokalsamfunn"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-harbor via-harbor/84 to-fjord/50" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-harbor to-transparent" />

        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-end px-5 py-14 sm:px-8 lg:px-10">
          <div className="max-w-4xl pb-6">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Frivilligsentralens kurs
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
              Læring og utvikling for frivillige
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-white/78 sm:text-xl">
              Her finner du praktiske kurs om frivillighet, ansvar, fellesskap
              og hvordan mennesker kan stille opp for hverandre på en god måte.
            </p>
          </div>
        </div>
      </section>

      <section id="kurs" className="bg-harbor px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
            Kursoversikt
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courseCards.map((course) => (
              <Link
                key={course.title}
                to={course.to}
                className="group rounded-[2rem] border border-white/12 bg-white/[0.07] p-5 shadow-soft backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-pine/60 hover:bg-white/[0.11] hover:shadow-glow focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
              >
                <div className="flex items-start gap-5">
                  <img
                    src={course.image}
                    alt=""
                    aria-hidden="true"
                    className="size-24 shrink-0 rounded-full object-cover ring-4 ring-white/14 sm:size-28"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold uppercase tracking-normal text-pine">
                      Digitalt kurs
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold text-white">
                      {course.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-white/72">
                      {course.description}
                    </p>
                  </div>
                </div>
                <span className="mt-6 inline-flex min-h-11 items-center rounded-2xl bg-pine px-5 py-2 text-sm font-bold text-harbor transition group-hover:bg-white">
                  Start
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
