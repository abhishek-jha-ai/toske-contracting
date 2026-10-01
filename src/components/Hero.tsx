import Image from "next/image";
import { images } from "@/data/projects";
import { ArrowRightIcon, PlayIcon } from "./Icons";
import { TrustBar } from "./TrustBar";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-forest-950">
      <Image
        src={images.kitchenNavy}
        alt="Remodeled kitchen with a navy island, marble countertop and glass pendant lights"
        preload
        quality={75}
        sizes="(max-width: 1023px) 190vh, 100vw"
        placeholder="blur"
        className="absolute inset-0 -z-10 size-full object-cover object-[68%_center] sm:object-center"
      />
      {/* Legibility overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/95 via-forest-950/50 to-black/25 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/45 lg:to-black/0" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-40 bg-gradient-to-t from-black/50 to-transparent lg:block" />

      <div className="mx-auto flex min-h-[min(100svh,880px)] max-w-[1240px] flex-col justify-end px-5 pb-8 pt-32 sm:px-8 lg:min-h-[min(100svh,820px)] lg:justify-center lg:pb-14 lg:pt-36">
        <div className="max-w-[640px]">
          <p className="eyebrow text-cream-100/90">
            Licensed General Contractor
          </p>
          <h1
            id="hero-title"
            className="mt-4 font-serif text-[clamp(2.75rem,10vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.015em] text-white"
          >
            High-End
            <span className="block text-gold-400">Home Renovations</span>
          </h1>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[clamp(1.05rem,2.6vw,1.45rem)] font-medium text-cream-50 [animation:rise_.9s_.16s_var(--ease-out-soft)_both]">
            {["Additions", "Kitchens", "Baths", "Decks"].map((s, i) => (
              <span key={s} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden className="size-1 rounded-full bg-gold-400" />}
                {s}
              </span>
            ))}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 text-[15px] text-cream-100/80 sm:text-base [animation:rise_.9s_.2s_var(--ease-out-soft)_both]">
            {["Quality", "Precision", "Detail"].map((s, i) => (
              <span key={s} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden className="size-1 rounded-full bg-gold-400/70" />}
                {s}
              </span>
            ))}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row [animation:rise_.9s_.28s_var(--ease-out-soft)_both]">
            <a
              href="#estimate"
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-md bg-gold-400 px-7 text-[15px] font-bold text-forest-950 shadow-[0_10px_30px_-10px_rgba(212,179,115,0.6)] transition-colors hover:bg-gold-300"
            >
              Get a Free Estimate
              <ArrowRightIcon className="size-[18px] transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-md border border-white/60 bg-black/15 px-7 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
            >
              View Our Work
              <PlayIcon className="size-5" />
            </a>
          </div>
        </div>

        <TrustBar />
      </div>
    </section>
  );
}
