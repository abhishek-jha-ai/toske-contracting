"use client";

import Image from "next/image";
import { images, type ServiceKey } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";
import { exploreService } from "@/lib/events";
import { ArrowRightIcon } from "./Icons";
import { SectionHeading } from "./SectionHeading";

const services: { key: ServiceKey; title: string; copy: string; image: (typeof images)[keyof typeof images] }[] = [
  {
    key: "kitchen",
    title: "Kitchens",
    copy: "Custom kitchens built around the homeowner’s space and lifestyle.",
    image: images.kitchenWaterfall,
  },
  {
    key: "bathroom",
    title: "Bathrooms",
    copy: "Modern bathroom remodeling with attention to finish and detail.",
    image: images.bathMarble,
  },
  {
    key: "deck",
    title: "Decks",
    copy: "Custom outdoor living spaces and deck construction.",
    image: images.deckLakeside,
  },
  {
    key: "addition",
    title: "Additions",
    copy: "Residential additions designed to integrate with the existing home.",
    image: images.exteriorStone,
  },
];

const alsoOffered = ["Custom carpentry", "Built-ins", "Interior renovation", "Exterior renovation"];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="What we build"
          title="Renovations, finished to a higher standard."
          intro="From a single room to a new wing of the house — each project is planned and built around how you live."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.key} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <button
                type="button"
                onClick={() => {
                  trackEvent("service_selected", { service: s.key, source: "services" });
                  exploreService(s.key);
                }}
                className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-cream-200 bg-white text-left shadow-[0_1px_2px_rgba(15,42,34,0.04)] transition-[box-shadow,transform] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,42,34,0.35)]"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-cream-200">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 290px, (min-width:640px) 50vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="block font-serif text-2xl text-forest-900">{s.title}</span>
                  <span className="mt-2 flex flex-1 items-end justify-between gap-4">
                    <span className="block self-start text-[15px] leading-relaxed text-stone">{s.copy}</span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold-500/60 text-gold-600 transition-colors group-hover:border-forest-900 group-hover:bg-forest-900 group-hover:text-gold-300">
                      <ArrowRightIcon className="size-4" />
                      <span className="sr-only">Explore {s.title.toLowerCase()} work</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-cream-200 pt-8 sm:flex-row sm:items-center sm:gap-6">
          <p className="eyebrow shrink-0 text-gold-700">Also</p>
          <ul className="flex flex-wrap gap-2">
            {alsoOffered.map((item) => (
              <li
                key={item}
                className="rounded-full border border-cream-300 bg-cream-100 px-4 py-2 text-sm font-medium text-forest-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
