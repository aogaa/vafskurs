import { NavLink } from "react-router-dom";

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-harbor text-white"
      : "text-ink/78 hover:bg-white/70 hover:text-harbor"
  }`;

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-linen/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <NavLink
          to="/"
          className="group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-clay"
          aria-label="Gå til startsiden"
        >
          <span className="grid size-11 place-items-center rounded-full bg-harbor text-lg font-black text-white shadow-soft transition group-hover:bg-pine">
            T
          </span>
          <span className="hidden text-base font-bold text-ink sm:inline">
            Trygg som frivillig
          </span>
        </NavLink>
        <nav aria-label="Hovedmeny" className="flex items-center gap-2">
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
