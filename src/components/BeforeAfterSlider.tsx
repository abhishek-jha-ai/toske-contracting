"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { Photo } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";

type Props = {
  before: Photo;
  after: Photo;
  beforeLabel?: string;
  afterLabel?: string;
  id: string;
  sizes?: string;
  className?: string;
};

/** Drag/scrub comparison. Works with mouse, touch, pen and keyboard. */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  id,
  sizes = "(min-width:1024px) 1100px, 100vw",
  className = "",
}: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const used = useRef(false);

  const markUsed = useCallback(() => {
    if (used.current) return;
    used.current = true;
    trackEvent("before_after_used", { comparison: id });
  }, [id]);

  const update = useCallback(
    (clientX: number) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.min(100, Math.max(0, pct)));
      markUsed();
    },
    [markUsed],
  );

  return (
    <div
      ref={ref}
      className={`relative cursor-ew-resize select-none overflow-hidden bg-cream-200 [touch-action:pan-y] ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        // On touch, wait for movement so a vertical page scroll doesn't jump the slider.
        if (e.pointerType === "mouse") update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={(e) => {
        if (dragging.current && e.pointerType !== "mouse") update(e.clientX);
        dragging.current = false;
      }}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={after.src} alt={after.alt} fill sizes={sizes} placeholder="blur" draggable={false} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes={sizes} placeholder="blur" draggable={false} className="object-cover" />
      </div>

      <span
        className="pointer-events-none absolute left-3 bottom-3 rounded-full bg-forest-950/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cream-50 backdrop-blur transition-opacity sm:left-4 sm:bottom-4"
        style={{ opacity: pos < 12 ? 0 : 1 }}
      >
        {beforeLabel}
      </span>
      <span
        className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-gold-400/95 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-forest-950 transition-opacity sm:right-4 sm:bottom-4"
        style={{ opacity: pos > 88 ? 0 : 1 }}
      >
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-forest-900/90 text-white shadow-lg backdrop-blur">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>

      {/* Accessible control, also gives keyboard support */}
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => {
          setPos(Number(e.target.value));
          markUsed();
        }}
        aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()}`}
        className="peer sr-only"
      />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-inset peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400" />
    </div>
  );
}
