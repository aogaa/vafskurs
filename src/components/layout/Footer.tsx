import logo1 from "../../assets/images/logo1.png";
import logommm from "../../assets/images/logommm.png";

export function Footer() {
  return (
    <footer className="mt-12 bg-harbor text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_1fr] md:items-start lg:px-10">
        <section aria-labelledby="footer-sender">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-white/70">
              <img
                src={logo1}
                alt="Vestre Aker Frivilligsentral"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h2 id="footer-sender" className="text-xl font-bold leading-tight">
                Trygg som frivillig
              </h2>
              <p className="mt-1 text-sm font-medium text-white/70">
                En digital kursplattform for trygg frivillig innsats.
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
            Lokal prototype uten innlogging, persondata eller Firebase.
          </p>
        </section>

        <section
          aria-labelledby="footer-values"
          className="flex flex-col gap-4 md:items-end md:text-right"
        >
          <div>
            <p id="footer-values" className="text-sm font-bold uppercase tracking-normal text-pine">
              Verdigrunnlag
            </p>
            <p className="mt-2 max-w-md text-sm leading-7 text-white/72">
              Møte mellom mennesker er kjernen i frivilligheten.
            </p>
          </div>
          <div className="flex w-fit items-center rounded-3xl bg-white p-4 shadow-sm ring-1 ring-white/70 sm:p-5">
            <img
              src={logommm}
              alt="Møte mellom mennesker"
              className="h-20 w-64 object-contain sm:h-24 sm:w-80"
            />
          </div>
        </section>
      </div>
    </footer>
  );
}
