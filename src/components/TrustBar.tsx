import { HomeIcon, LevelIcon, ShieldIcon } from "./Icons";

const points = [
  { icon: ShieldIcon, title: "Licensed GC", detail: "PA & NJ" },
  { icon: LevelIcon, title: "High-Quality", detail: "Craftsmanship" },
  { icon: HomeIcon, title: "Built Around", detail: "Your Project" },
];

export function TrustBar() {
  return (
    <ul
      aria-label="Why Toske Contracting"
      className="mt-10 grid grid-cols-3 gap-2 border-t border-white/15 pt-6 sm:max-w-[620px] sm:gap-0 lg:mt-12 [animation:rise_.9s_.36s_var(--ease-out-soft)_both]"
    >
      {points.map(({ icon: Icon, title, detail }, i) => (
        <li
          key={title}
          className={`flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 sm:px-5 ${
            i === 0 ? "sm:pl-0" : "sm:border-l sm:border-white/15"
          }`}
        >
          <Icon className="size-7 shrink-0 text-gold-400 sm:size-8" />
          <span className="text-[13px] leading-snug text-cream-100/75 sm:text-sm">
            <strong className="block font-semibold text-white">{title}</strong>
            {detail}
          </span>
        </li>
      ))}
    </ul>
  );
}
