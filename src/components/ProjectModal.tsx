"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { serviceLabels, type Project } from "@/data/projects";
import { startEstimate } from "@/lib/events";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ContactLink } from "./ContactLink";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, WhatsAppIcon } from "./Icons";

type Props = {
  project: Project | null;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
  position?: { index: number; total: number };
};

export function ProjectModal({ project, onClose, onNavigate, position }: Props) {
  const [photo, setPhoto] = useState(0);
  const [view, setView] = useState<"photos" | "compare">("photos");
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isOpen = project !== null;

  // Reset internal state when the project changes.
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  if (project && project.slug !== lastSlug) {
    setLastSlug(project.slug);
    setPhoto(0);
    setView("photos");
  }

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = [
          ...dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
          ),
        ].filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[70] flex items-stretch justify-center bg-forest-950/85 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            tabIndex={-1}
            className="relative flex w-full max-w-[1180px] flex-col overflow-y-auto bg-cream-50 outline-none text-ink sm:max-h-[min(92vh,820px)] sm:rounded-xl lg:flex-row lg:overflow-hidden"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Media */}
            <div className="relative shrink-0 bg-forest-950 lg:w-[64%]">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project"
                className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full bg-forest-950/70 text-white backdrop-blur sm:hidden"
              >
                <CloseIcon className="size-5" />
              </button>
              {view === "compare" && project.beforeAfter ? (
                <BeforeAfterSlider
                  id={project.slug}
                  {...project.beforeAfter}
                  sizes="(min-width:1024px) 760px, 100vw"
                  className="aspect-[4/3] lg:aspect-auto lg:h-full"
                />
              ) : (
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={photo}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={project.photos[photo].src}
                        alt={project.photos[photo].alt}
                        fill
                        sizes="(min-width:1024px) 760px, 100vw"
                        placeholder="blur"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  {project.photos.length > 1 && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                      {project.photos.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Photo ${i + 1}`}
                          aria-pressed={i === photo}
                          onClick={() => setPhoto(i)}
                          className={`h-1.5 rounded-full transition-all ${i === photo ? "w-8 bg-white" : "w-3 bg-white/50"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col p-6 sm:p-8 lg:overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow text-gold-700">
                  {project.type}
                  {position && (
                    <span className="ml-3 font-medium tracking-normal text-stone normal-case">
                      {position.index} / {position.total}
                    </span>
                  )}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project"
                  className="-mr-2 -mt-2 hidden size-11 shrink-0 place-items-center rounded-full text-forest-900 transition-colors hover:bg-cream-200 sm:grid"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>
              <h3 id="project-dialog-title" className="mt-2 font-serif text-[32px] leading-[1.1] text-forest-900 sm:text-[38px]">
                {project.title}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-stone">{project.description}</p>

              {project.beforeAfter && (
                <div className="mt-6 inline-flex self-start rounded-full border border-cream-300 bg-cream-100 p-1 text-sm font-semibold">
                  {(["photos", "compare"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={view === v}
                      onClick={() => setView(v)}
                      className={`rounded-full px-4 py-2 transition-colors ${
                        view === v ? "bg-forest-900 text-cream-50" : "text-forest-900"
                      }`}
                    >
                      {v === "photos" ? "Photos" : `${project.beforeAfter?.beforeLabel} / ${project.beforeAfter?.afterLabel}`}
                    </button>
                  ))}
                </div>
              )}

              {project.photos.length > 1 && view === "photos" && (
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {project.photos.map((ph, i) => (
                    <button
                      key={ph.src.src}
                      type="button"
                      onClick={() => setPhoto(i)}
                      aria-label={`Show photo ${i + 1}`}
                      className={`relative aspect-square overflow-hidden rounded-md ${
                        i === photo ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-cream-50" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={ph.src} alt="" fill sizes="96px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-8 grid gap-3 lg:mt-auto lg:pt-8">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    startEstimate(project.service);
                  }}
                  className="group inline-flex h-13 items-center justify-center gap-2 rounded-md bg-forest-900 px-6 py-4 text-[15px] font-bold text-cream-50 transition-colors hover:bg-forest-800"
                >
                  Start a similar {serviceLabels[project.service].toLowerCase()} project
                  <ArrowRightIcon className="size-4 text-gold-400 transition-transform group-hover:translate-x-0.5" />
                </button>
                <ContactLink
                  channel="whatsapp"
                  placement="project_modal"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-forest-900/20 text-[15px] font-semibold text-forest-900 transition-colors hover:border-forest-900"
                >
                  <WhatsAppIcon className="size-[18px] text-[#1f9d55]" /> Ask about this on WhatsApp
                </ContactLink>
              </div>

              {position && position.total > 1 && (
                <div className="mt-6 flex items-center justify-between border-t border-cream-200 pt-5 text-sm font-semibold text-forest-900">
                  <button type="button" onClick={() => onNavigate(-1)} className="inline-flex items-center gap-2 py-2 hover:text-gold-700">
                    <ArrowLeftIcon className="size-4" /> Previous
                  </button>
                  <button type="button" onClick={() => onNavigate(1)} className="inline-flex items-center gap-2 py-2 hover:text-gold-700">
                    Next project <ArrowRightIcon className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
