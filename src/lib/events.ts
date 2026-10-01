import type { ServiceKey } from "@/data/projects";

/**
 * Tiny cross-section messaging so a click anywhere (service card, project
 * modal, explorer) can preselect a service in the explorer or estimate wizard.
 */

const ESTIMATE = "toske:start-estimate";
const EXPLORE = "toske:explore";
const FILTER = "toske:filter-projects";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function startEstimate(service?: ServiceKey) {
  window.dispatchEvent(new CustomEvent(ESTIMATE, { detail: { service } }));
  scrollToId("estimate");
}

export function exploreService(service: ServiceKey) {
  window.dispatchEvent(new CustomEvent(EXPLORE, { detail: { service } }));
  scrollToId("explore");
}

export function showProjects(service: ServiceKey | "all") {
  window.dispatchEvent(new CustomEvent(FILTER, { detail: { service } }));
  scrollToId("projects");
}

export function onShowProjects(handler: (service: ServiceKey | "all") => void) {
  const fn = (e: Event) => handler((e as CustomEvent).detail.service);
  window.addEventListener(FILTER, fn);
  return () => window.removeEventListener(FILTER, fn);
}

export function onStartEstimate(handler: (service?: ServiceKey) => void) {
  const fn = (e: Event) => handler((e as CustomEvent).detail?.service);
  window.addEventListener(ESTIMATE, fn);
  return () => window.removeEventListener(ESTIMATE, fn);
}

export function onExploreService(handler: (service: ServiceKey) => void) {
  const fn = (e: Event) => handler((e as CustomEvent).detail.service);
  window.addEventListener(EXPLORE, fn);
  return () => window.removeEventListener(EXPLORE, fn);
}
