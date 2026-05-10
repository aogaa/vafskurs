import { NavLink } from "react-router-dom";
import logo1 from "../../assets/images/logo1.png";

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-harbor shadow-[0_12px_30px_rgba(11,31,51,0.16)]">
      <div className="mx-auto flex max-w-7xl px-5 py-3 sm:px-8 lg:px-10">
        <NavLink
          to="/"
          className="group flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
          aria-label="Gå til kursportalen"
        >
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-white/70 sm:size-16">
            <img
              src={logo1}
              alt="Vestre Aker Frivilligsentral"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-bold leading-tight text-white sm:text-xl">
              Kursportal
            </span>
            <span className="hidden text-sm font-medium leading-6 text-white sm:block">
              Vestre Aker Frivilligsentral
            </span>
          </span>
        </NavLink>
      </div>
    </header>
  );
}
