import logo1 from "../../assets/images/logo1.png";
import logommm from "../../assets/images/logommm.png";

export function Footer() {
  return (
    <footer className="mt-12 bg-harbor text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
        <div>
          <div className="flex w-fit items-center rounded-2xl bg-white px-4 py-3 shadow-sm">
            <img
              src={logo1}
              alt="Vestre Aker frivilligsentral"
              className="h-10 w-44 object-contain"
            />
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/76">
            En digital kursplattform for trygg frivillig innsats. Lokal
            prototype uten innlogging, persondata eller Firebase.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <p className="text-sm font-semibold text-white/70">I møte mellom mennesker</p>
          <div className="flex w-fit items-center rounded-2xl bg-white px-4 py-3 shadow-sm">
            <img
              src={logommm}
              alt="Møte mellom mennesker"
              className="h-12 w-44 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
