type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
};

export function SectionHeading({ id, eyebrow, title, intro, tone = "light", align = "left" }: Props) {
  const dark = tone === "dark";
  return (
    <div data-reveal className={`max-w-[680px] ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "text-gold-400" : "text-gold-700"}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-3 font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.01em] ${
          dark ? "text-cream-50" : "text-forest-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-[17px] leading-relaxed ${dark ? "text-cream-100/75" : "text-stone"}`}>{intro}</p>
      )}
    </div>
  );
}
