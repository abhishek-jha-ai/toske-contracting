import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    title: "Tell Us About Your Project",
    copy: "Share what you have in mind — a few details and photos of the space are a great start.",
  },
  {
    title: "Consultation",
    copy: "We talk through your goals, the space, and what matters most to you.",
  },
  {
    title: "Scope & Planning",
    copy: "The work is defined, options are reviewed, and the plan comes together before building starts.",
  },
  {
    title: "Build",
    copy: "Construction gets underway, with the focus on quality, precision and detail through to the finish.",
  },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-forest-950 py-20 text-cream-50 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          id="process-title"
          eyebrow="How it works"
          title="A straightforward path from idea to finished space."
          tone="dark"
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="flex flex-col bg-forest-950 p-7 sm:p-8"
            >
              <span className="font-serif text-[44px] leading-none text-gold-400/90">0{i + 1}</span>
              <span className="mt-6 block h-px w-10 bg-gold-400/50" aria-hidden />
              <h3 className="mt-6 font-serif text-[23px] leading-tight text-cream-50">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-cream-100/70">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
