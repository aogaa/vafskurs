import { NavLink } from "react-router-dom";
import logo1 from "../../assets/images/logo1.png";

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-2xl px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
    isActive
      ? "bg-white text-harbor shadow-sm"
      : "text-white/82 hover:bg-white/10 hover:text-white"
  }`;

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-harbor shadow-[0_12px_30px_rgba(11,31,51,0.16)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <NavLink
          to="/"
          className="group flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
          aria-label="Gå til startsiden"
        >
          <span className="flex h-14 w-44 items-center justify-center rounded-2xl bg-white px-4 py-2 shadow-sm ring-1 ring-white/70 sm:w-56">
            <img
              src={logo1}
              alt="Vestre Aker frivilligsentral"
              className="max-h-10 w-full object-contain"
            />
          </span>
          <span className="hidden text-sm font-semibold text-white/78 lg:inline">
            Kursplattform
          </span>
        </NavLink>
        <nav aria-label="Hovedmeny" className="flex shrink-0 items-center gap-2">
          <NavLink to="/" className={navLinkClasses} end>
            Start
          </NavLink>
          <NavLink to="/moduler" className={navLinkClasses}>
            Moduler
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
