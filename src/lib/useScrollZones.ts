"use client";

import { useEffect, useState } from "react";

/** Tracks whether the hero has been scrolled past and whether the estimate form / footer are on screen. */
export function useScrollZones() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const targets = ["estimate", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<Element>();

    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      rootMargin: "-35% 0px 0px 0px",
    });
    if (hero) heroObserver.observe(hero);

    const zoneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setFormVisible(visible.size > 0);
      },
      { threshold: 0.15 },
    );
    targets.forEach((t) => zoneObserver.observe(t));

    return () => {
      heroObserver.disconnect();
      zoneObserver.disconnect();
    };
  }, []);

  return { pastHero, formVisible };
}
