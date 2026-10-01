"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { images, projectsFor, type ServiceKey } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";
import { onExploreService, showProjects, startEstimate } from "@/lib/events";
import { ArrowRightIcon } from "./Icons";

type Option = {
  key: ServiceKey;
  label: string;
  thumb: StaticImageData;
  title: string;
  copy: string;
  scope: string[];
  gallery: { src: StaticImageData; alt: string }[];
};

const options: Option[] = [
  {
    key: "kitchen",
    label: "Kitchen",
    thumb: images.kitchenSage,
    title: "Kitchens made for gathering",
    copy: "Islands, cabinetry, stone and lighting — brought together around the way your household cooks, works and gathers.",
    scope: ["Layout & islands", "Cabinetry", "Stone & tile", "Lighting"],
    gallery: [
      { src: images.kitchenSage, alt: "Sage green island kitchen with timber beams" },
      { src: images.kitchenWaterfall, alt: "White kitchen with waterfall marble island" },
      { src: images.kitchenNavy, alt: "Navy island kitchen with glass pendants" },
    ],
  },
  {
    key: "bathroom",
    label: "Bathroom",
    thumb: images.bathOak,
    title: "Bathrooms with a finish you notice",
    copy: "Walk-in showers, vanities and stone work, detailed so the room feels calm and complete every time you walk in.",
    scope: ["Walk-in showers", "Vanities", "Tile & stone", "Fixtures"],
    gallery: [
      { src: images.bathMarble, alt: "Marble bathroom with glass shower and freestanding tub" },
      { src: images.bathOak, alt: "Bathroom with oak double vanity" },
    ],
  },
  {
    key: "addition",
    label: "Addition",
    thumb: images.additionGable,
    title: "Additions that feel original to the home",
    copy: "More room to live, with rooflines, materials and windows carried through so the new space belongs to the house.",
    scope: ["New living space", "Rooflines & exteriors", "Windows & light"],
    gallery: [
      { src: images.additionGable, alt: "Stone gable addition with tall black-framed windows" },
      { src: images.exteriorStone, alt: "Stone home exterior with covered entry" },
    ],
  },
  {
    key: "deck",
    label: "Deck",
    thumb: images.deckLakeside,
    title: "Outdoor living, built to be used",
    copy: "Decks and outdoor spaces sized for real life — dining, lounging and evenings outside.",
    scope: ["Decks & railings", "Outdoor dining", "Lounge areas"],
    gallery: [
      { src: images.deckLakeside, alt: "Lakeside deck with dining and lounge areas" },
      { src: images.lakeTerrace, alt: "Lakeside terrace with fire pit at sunset" },
      { src: images.poolTerrace, alt: "Pool terrace with sunken fire pit seating" },
    ],
  },
  {
    key: "custom",
    label: "Custom Project",
    thumb: images.builtinFireplace,
    title: "Custom work, built in place",
    copy: "Built-ins, carpentry and one-of-a-kind interior and exterior work that doesn’t fit a standard category.",
    scope: ["Built-ins", "Custom carpentry", "Interior & exterior renovation"],
    gallery: [
      { src: images.builtinFireplace, alt: "Fireplace wall with custom built-in shelving" },
      { src: images.poolFirepit, alt: "Outdoor fire pit lounge with lit steps" },
      { src: images.lakeFirepit, alt: "Stone fire pit with built-in seating" },
    ],
  },
];

export function ProjectExplorer() {
  const [active, setActive] = useState<ServiceKey>("kitchen");
  const [photo, setPhoto] = useState(0);
  const reduceMotion = useReducedMotion();
  const option = options.find((o) => o.key === active)!;
  const count = projectsFor(active).length;

  const select = (key: ServiceKey, source: string) => {
    setActive(key);
    setPhoto(0);
    trackEvent("service_selected", { service: key, source });
  };

  useEffect(() => onExploreService((key) => { setActive(key); setPhoto(0); }), []);

  const current = option.gallery[photo] ?? option.gallery[0];

  return (
    <section id="explore" aria-labelledby="explore-title" className="bg-cream-100 py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div data-reveal className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-gold-700">Explore our work</p>
            <h2
              id="explore-title"
              className="mt-3 font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.06] text-forest-900"
            >
              What are you planning?
            </h2>
          </div>
          <p className="max-w-[420px] text-[17px] leading-relaxed text-stone">
            Choose a project type to see related work and what goes into it.
          </p>
        </div>

        {/* Selector */}
        <div
          role="radiogroup"
          aria-label="Project type"
          className="no-scrollbar -mx-5 mt-10 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0"
        >
          {options.map((o) => {
            const selected = o.key === active;
            return (
              <button
                key={o.key}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => select(o.key, "explorer")}
                className={`group flex shrink-0 snap-start items-center gap-3 rounded-lg border p-2 pr-4 text-left transition-colors duration-300 sm:pr-3 ${
                  selected
                    ? "border-forest-900 bg-forest-900 text-cream-50"
                    : "border-cream-300 bg-white text-forest-900 hover:border-forest-700/40"
                }`}
              >
                <span className="relative size-12 shrink-0 overflow-hidden rounded-md">
                  <Image src={o.thumb} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span className="whitespace-nowrap text-[15px] font-semibold">{o.label}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cream-200 sm:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[480px]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={current.src.src}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(min-width:1024px) 700px, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <span className="absolute left-4 top-4 rounded-full bg-forest-950/75 px-3 py-1.5 text-xs font-semibold tracking-wide text-cream-50 backdrop-blur">
              {option.label}
            </span>
          </div>

          <div className="flex flex-col lg:col-span-5 lg:py-2">
            {option.gallery.length > 1 && (
              <div className="flex gap-3" aria-label="More photos">
                {option.gallery.map((g, i) => (
                  <button
                    key={g.src.src}
                    type="button"
                    onClick={() => setPhoto(i)}
                    aria-label={`Show photo ${i + 1}: ${g.alt}`}
                    aria-pressed={i === photo}
                    className={`relative aspect-[4/3] w-full max-w-[150px] overflow-hidden rounded-md ring-offset-2 ring-offset-cream-100 transition ${
                      i === photo ? "ring-2 ring-gold-500" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={g.src} alt="" fill sizes="150px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="mt-8 flex flex-1 flex-col"
              >
                <h3 className="font-serif text-[30px] leading-tight text-forest-900 sm:text-[34px]">{option.title}</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-stone">{option.copy}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {option.scope.map((s) => (
                    <li key={s} className="rounded-full border border-forest-900/15 px-3.5 py-1.5 text-sm font-medium text-forest-800">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-10">
                  <button
                    type="button"
                    onClick={() => startEstimate(active)}
                    className="group inline-flex h-13 items-center justify-center gap-2 rounded-md bg-forest-900 px-6 py-4 text-[15px] font-bold text-cream-50 transition-colors hover:bg-forest-800"
                  >
                    Start my {option.label.toLowerCase()} estimate
                    <ArrowRightIcon className="size-4 text-gold-400 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  {count > 0 && (
                    <button
                      type="button"
                      onClick={() => showProjects(active)}
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-forest-900/25 px-6 py-4 text-[15px] font-semibold text-forest-900 transition-colors hover:border-forest-900"
                    >
                      View {count} {count === 1 ? "project" : "projects"}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
