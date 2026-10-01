"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { projectCategories, projects, type Project, type ServiceKey } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";
import { onShowProjects, startEstimate } from "@/lib/events";
import { ArrowRightIcon, ExpandIcon } from "./Icons";
import { ProjectModal } from "./ProjectModal";
import { SectionHeading } from "./SectionHeading";

type Filter = ServiceKey | "all";

export function FeaturedProjects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => onShowProjects(setFilter), []);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.service === filter)),
    [filter],
  );
  const openIndex = openSlug ? visible.findIndex((p) => p.slug === openSlug) : -1;

  const open = (p: Project) => {
    setOpenSlug(p.slug);
    trackEvent("project_viewed", { project: p.slug, service: p.service });
  };

  const featureFirst = filter === "all";

  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-forest-900 py-20 text-cream-50 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-title"
            eyebrow="Our work"
            title="Featured Projects"
            intro="A closer look at finished spaces — select any project to see more."
            tone="dark"
          />
          <div
            role="group"
            aria-label="Filter projects"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {projectCategories.map((c) => {
              const active = c.key === filter;
              return (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c.key)}
                  className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    active
                      ? "border-gold-400 bg-gold-400 text-forest-950"
                      : "border-white/20 text-cream-100/85 hover:border-white/50 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {visible.map((p, i) => {
            const big = featureFirst && i === 0;
            return (
              <li key={p.slug} className={big ? "sm:col-span-2 lg:row-span-2" : ""}>
                <button
                  type="button"
                  onClick={() => open(p)}
                  className={`group relative block w-full overflow-hidden rounded-lg bg-forest-800 text-left ${
                    big ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={p.photos[0].src}
                    alt={p.photos[0].alt}
                    fill
                    sizes={big ? "(min-width:1024px) 800px, 100vw" : "(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"}
                    placeholder="blur"
                    className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                    <span>
                      <span className="eyebrow block text-[11px] text-gold-300">{p.type}</span>
                      <span className={`mt-1.5 block font-serif leading-tight text-white ${big ? "text-[28px] sm:text-[36px]" : "text-[22px]"}`}>
                        {p.title}
                      </span>
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/40 text-white transition-colors group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-forest-950">
                      <ExpandIcon className="size-4" />
                    </span>
                  </span>
                  {p.photos.length > 1 && (
                    <span className="absolute right-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                      {p.photos.length} photos
                    </span>
                  )}
                </button>
              </li>
            );
          })}

          <li className={visible.length % 3 === 0 && !featureFirst ? "sm:col-span-2 lg:col-span-3" : ""}>
            <div className="flex h-full min-h-[240px] flex-col justify-between rounded-lg border border-gold-400/30 bg-forest-950/60 p-6 sm:p-8">
              <div>
                <p className="eyebrow text-gold-400">Your project</p>
                <p className="mt-3 font-serif text-[26px] leading-tight text-cream-50">
                  Planning something similar?
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-cream-100/70">
                  Tell us a little about it and we’ll follow up to talk it through.
                </p>
              </div>
              <button
                type="button"
                onClick={() => startEstimate(filter === "all" ? undefined : filter)}
                className="group mt-6 inline-flex h-12 items-center justify-center gap-2 self-start rounded-md bg-gold-400 px-5 text-sm font-bold text-forest-950 transition-colors hover:bg-gold-300"
              >
                Get a Free Estimate
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </li>
        </ul>
      </div>

      <ProjectModal
        project={openIndex >= 0 ? visible[openIndex] : null}
        onClose={() => setOpenSlug(null)}
        onNavigate={(dir) => {
          const next = visible[(openIndex + dir + visible.length) % visible.length];
          open(next);
        }}
        position={openIndex >= 0 ? { index: openIndex + 1, total: visible.length } : undefined}
      />
    </section>
  );
}
