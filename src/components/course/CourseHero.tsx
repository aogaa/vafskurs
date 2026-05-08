import { Button } from "../ui/Button";

const learningNodes = [
  { label: "Rolle", x: 88, y: 92, tone: "blue" },
  { label: "Grenser", x: 292, y: 70, tone: "green" },
  { label: "Tillit", x: 388, y: 190, tone: "blue" },
  { label: "Avklar", x: 205, y: 236, tone: "yellow" },
  { label: "Trygghet", x: 92, y: 278, tone: "green" },
];

function LearningSurface() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-glow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(102,194,68,0.16),transparent_16rem),linear-gradient(135deg,rgba(238,247,243,0.86),rgba(255,255,255,0.2))]" />
      <svg
        className="relative h-auto w-full"
        viewBox="0 0 520 380"
        role="img"
        aria-labelledby="learning-title learning-desc"
      >
        <title id="learning-title">Digital læringsflate</title>
        <desc id="learning-desc">
          En moderne kursflate med temaord, relasjonslinjer og rolig progresjon.
        </desc>
        <defs>
          <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#0B1F33" floodOpacity="0.14" />
          </filter>
        </defs>
        <path
          d="M110 95 C190 35 275 42 350 88 C426 135 432 240 342 278 C246 318 156 300 92 252"
          fill="none"
          stroke="#123047"
          strokeDasharray="8 12"
          strokeLinecap="round"
          strokeWidth="4"
          opacity="0.22"
        />
        <path
          d="M122 284 C186 336 305 332 382 242"
          fill="none"
          stroke="#66C244"
          strokeLinecap="round"
          strokeWidth="10"
          opacity="0.28"
        />
        <rect
          x="155"
          y="118"
          width="210"
          height="122"
          rx="24"
          fill="#0B1F33"
          filter="url(#nodeShadow)"
        />
        <rect x="176" y="141" width="92" height="12" rx="6" fill="#66C244" />
        <rect x="176" y="168" width="150" height="10" rx="5" fill="#FFFFFF" opacity="0.84" />
        <rect x="176" y="192" width="118" height="10" rx="5" fill="#FFFFFF" opacity="0.6" />
        <circle cx="322" cy="192" r="23" fill="#F2B84B" />
        <path
          d="M312 191l8 8 15-18"
          fill="none"
          stroke="#0B1F33"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        {learningNodes.map((node) => {
          const fill =
            node.tone === "green" ? "#66C244" : node.tone === "yellow" ? "#F2B84B" : "#123047";
          const text = node.tone === "yellow" ? "#102A43" : "#FFFFFF";

          return (
            <g key={node.label} filter="url(#nodeShadow)">
              <rect x={node.x} y={node.y} width="104" height="48" rx="18" fill={fill} />
              <text
                x={node.x + 52}
                y={node.y + 30}
                textAnchor="middle"
                fill={text}
                fontSize="15"
                fontWeight="700"
                letterSpacing="0"
              >
                {node.label}
              </text>
            </g>
          );
        })}
        <g transform="translate(360 286)">
          <circle cx="0" cy="0" r="18" fill="#EEF7F3" stroke="#66C244" strokeWidth="4" />
          <circle cx="48" cy="0" r="18" fill="#EEF7F3" stroke="#123047" strokeWidth="4" />
          <circle cx="96" cy="0" r="18" fill="#EEF7F3" stroke="#66C244" strokeWidth="4" />
          <path d="M18 0H30M66 0H78" stroke="#5C6B73" strokeLinecap="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

export function CourseHero() {
  return (
    <section className="grid items-center gap-8 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-14">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-normal text-leaf">
          Digitalt grunnkurs for deg som vil bidra
        </p>
        <h1 className="mt-5 text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
          Trygg som frivillig
        </h1>
        <p className="mt-5 text-xl font-semibold leading-8 text-fjord sm:text-2xl">
          Et praktisk kurs som hjelper deg å gjøre godt på en trygg måte.
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">
          Du kommer hit fordi du ønsker å være en del av løsningen. Kurset viser
          hva frivillighet betyr for lokalsamfunnet, hvordan rollen din blir
          tydelig, og hva du kan gjøre når noe blir uklart.
        </p>
        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-harbor">
          Start med første del. Du trenger ikke kunne alt på forhånd.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/trygg-som-frivillig/deler/modul-1">Start kurset</Button>
          <Button to="/trygg-som-frivillig/deler" variant="ghost">
            Se delene
          </Button>
        </div>
      </div>
      <LearningSurface />
    </section>
  );
}
