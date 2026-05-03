import { Button } from "../ui/Button";

const courseFeatures = [
  "Korte moduler",
  "Praktiske scenarioer",
  "Refleksjon",
  "Trygghet i rollen",
];

function CommunityIllustration() {
  return (
    <svg
      className="h-auto w-full"
      viewBox="0 0 520 380"
      role="img"
      aria-labelledby="community-title community-desc"
    >
      <title id="community-title">Illustrasjon av møteplass og relasjoner</title>
      <desc id="community-desc">
        En rolig illustrasjon med mennesker, en møteplass og forbindelseslinjer.
      </desc>
      <rect x="46" y="50" width="428" height="274" rx="42" fill="#E8F0ED" />
      <path
        d="M126 245c48-74 217-74 266 0"
        fill="none"
        stroke="#1F6B5C"
        strokeLinecap="round"
        strokeWidth="10"
        opacity="0.2"
      />
      <path
        d="M155 169h210l34 76H121l34-76Z"
        fill="#F7F1E8"
        stroke="#164A4F"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path
        d="M180 169v-54h158v54"
        fill="#FFFFFF"
        stroke="#164A4F"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path d="M207 138h36M276 138h36" stroke="#B75D3A" strokeLinecap="round" strokeWidth="8" />
      <path
        d="M137 125c38 25 72 29 108 12M383 125c-38 25-72 29-108 12"
        fill="none"
        stroke="#EAB86B"
        strokeLinecap="round"
        strokeWidth="7"
      />
      {[
        { cx: 116, cy: 250, fill: "#B75D3A" },
        { cx: 199, cy: 282, fill: "#1F6B5C" },
        { cx: 320, cy: 282, fill: "#164A4F" },
        { cx: 405, cy: 250, fill: "#B75D3A" },
      ].map((person) => (
        <g key={`${person.cx}-${person.cy}`}>
          <circle cx={person.cx} cy={person.cy - 36} r="20" fill={person.fill} />
          <path
            d={`M${person.cx - 35} ${person.cy + 25}c4-30 23-47 35-47s31 17 35 47`}
            fill="#FFFFFF"
            stroke={person.fill}
            strokeLinecap="round"
            strokeWidth="8"
          />
        </g>
      ))}
      <path
        d="M142 257c46 30 189 30 236 0"
        fill="none"
        stroke="#164A4F"
        strokeLinecap="round"
        strokeWidth="6"
        opacity="0.28"
      />
    </svg>
  );
}

export function CourseHero() {
  return (
    <section className="grid items-center gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">
          Digitalt grunnkurs for frivillige
        </p>
        <h1 className="mt-5 text-5xl font-black leading-tight text-ink sm:text-6xl lg:text-7xl">
          Trygg som frivillig
        </h1>
        <p className="mt-5 text-2xl font-semibold leading-9 text-harbor">
          Et praktisk kurs om rolle, grenser og gode møter med mennesker
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/76">
          Dette kurset hjelper deg å bli tryggere i frivilligrollen. Du lærer
          hvorfor frivillighet betyr noe, hvor grensene går, og hva du gjør når
          du blir usikker.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/moduler">Start kurset</Button>
          <Button to="/moduler" variant="secondary">
            Se modulene
          </Button>
        </div>
      </div>
      <div className="rounded-[2rem] border border-white/70 bg-white/66 p-4 shadow-soft">
        <CommunityIllustration />
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
        {courseFeatures.map((feature) => (
          <li
            key={feature}
            className="flex min-h-20 items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-5 py-4 text-base font-bold text-ink shadow-sm"
          >
            <span className="size-3 rounded-full bg-clay" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
}
