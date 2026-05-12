import logommm from "../../assets/images/logommm.png";

export function Footer() {
  return (
    <footer className="bg-harbor text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2 text-sm leading-6 text-white">
            <p>© Stiftelsen Vestre Aker Frivilligsentral · Org.nr. 981 099 167</p>
            <p>© Andresen & Aas · Org.nr. 935 650 372</p>
          </div>
          <div className="flex w-fit items-center rounded-2xl bg-white/96 p-3 shadow-sm ring-1 ring-white/20">
            <img
              src={logommm}
              alt="Møte mellom mennesker"
              className="h-14 w-48 object-contain sm:h-16 sm:w-56"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
