import { Link } from "react-router-dom";
import heroindex from "../assets/images/heroindex.png";
import logo1 from "../assets/images/logo1.png";
import { Button } from "../components/ui/Button";

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
      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <img
          src={heroindex}
          alt="Kursportal for frivillige med fokus på læring, fellesskap og lokalsamfunn"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-harbor via-harbor/86 to-fjord/58" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-harbor to-transparent" />

        <div className="mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-between px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex w-fit items-center gap-4 rounded-[1.75rem] border border-white/18 bg-harbor/58 p-4 shadow-glow backdrop-blur-md sm:p-5">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-3xl bg-white p-2 shadow-sm sm:size-24">
              <img
                src={logo1}
                alt="Vestre Aker Frivilligsentral"
                className="h-full w-full object-contain"
              />
            </span>
            <span>
              <span className="block text-sm font-bold uppercase tracking-normal text-pine">
                Kursportal
              </span>
              <span className="mt-1 block max-w-sm text-lg font-bold leading-7 text-white sm:text-xl">
                Digital læring for frivillige, ledere og lokalsamfunn.
              </span>
            </span>
          </div>

          <div className="max-w-4xl pb-8 pt-16">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Frivilligsentralens kurs
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
              Kurs som gjør frivillig innsats tryggere, tydeligere og mer
              menneskelig.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/78 sm:text-xl">
              Velg kurset som passer for deg. Her samles praktisk læring om
              frivilligrollen, gode møter, ansvar og fellesskap.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                to="/trygg-som-frivillig"
                className="bg-pine text-harbor hover:bg-white"
              >
                Se Trygg som frivillig
              </Button>
              <a
                href="#kurs"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/24 bg-white/8 px-6 py-3 text-base font-semibold text-white backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/14 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
              >
                Se kursene
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="kurs" className="bg-harbor px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Kursoversikt
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Start med et kurs som gir praktisk trygghet i rollen.
            </h2>
          </div>

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
                  Åpne kurset
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
