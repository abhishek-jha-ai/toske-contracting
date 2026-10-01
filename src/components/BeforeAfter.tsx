"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { SectionHeading } from "./SectionHeading";

const comparisons = projects.filter((p) => p.beforeAfter);

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const project = comparisons[active];
  if (!project?.beforeAfter) return null;

  return (
    <section id="transformation" aria-labelledby="transformation-title" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="transformation-title"
            eyebrow="Design to finish"
            title="See the Transformation"
            intro="Drag across the image to compare the plan with the finished space."
          />
          {comparisons.length > 1 && (
            <div className="inline-flex self-start rounded-full border border-cream-300 bg-cream-100 p-1 text-sm font-semibold lg:self-end">
              {comparisons.map((c, i) => (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                  className={`rounded-full px-4 py-2 transition-colors ${
                    i === active ? "bg-forest-900 text-cream-50" : "text-forest-900 hover:text-forest-700"
                  }`}
                >
                  {c.type}
                </button>
              ))}
            </div>
          )}
        </div>

        <div data-reveal className="mt-10">
          <BeforeAfterSlider
            key={project.slug}
            id={project.slug}
            {...project.beforeAfter}
            className="aspect-[4/5] rounded-lg shadow-[0_30px_60px_-30px_rgba(15,42,34,0.45)] sm:aspect-[16/9]"
          />
          <div className="mt-4 flex flex-col gap-1 text-sm text-stone sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="font-semibold text-forest-900">{project.title}</span> · {project.type}
            </p>
            {site.showDemoLabel && (
              <p className="text-stone/80">Concept preview — real before & after photos drop in here.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
