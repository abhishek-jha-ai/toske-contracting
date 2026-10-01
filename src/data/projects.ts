import type { StaticImageData } from "next/image";

import kitchenNavy from "@/assets/projects/kitchen-navy-island.jpg";
import kitchenSage from "@/assets/projects/kitchen-sage-beams.jpg";
import kitchenSagePlan from "@/assets/projects/kitchen-sage-beams-plan.jpg";
import kitchenWaterfall from "@/assets/projects/kitchen-waterfall-marble.jpg";
import bathMarble from "@/assets/projects/bath-marble-brass.jpg";
import bathMarblePlan from "@/assets/projects/bath-marble-brass-plan.jpg";
import bathOak from "@/assets/projects/bath-oak-vanity.jpg";
import deckLakeside from "@/assets/projects/deck-lakeside.jpg";
import additionGable from "@/assets/projects/addition-glass-gable.jpg";
import exteriorStone from "@/assets/projects/exterior-stone.jpg";
import builtinFireplace from "@/assets/projects/builtin-fireplace.jpg";
import poolTerrace from "@/assets/projects/outdoor-pool-terrace.jpg";
import poolFirepit from "@/assets/projects/outdoor-pool-firepit.jpg";
import lakeTerrace from "@/assets/projects/outdoor-lake-terrace.jpg";
import lakeFirepit from "@/assets/projects/outdoor-lake-firepit.jpg";

export const images = {
  kitchenNavy,
  kitchenSage,
  kitchenSagePlan,
  kitchenWaterfall,
  bathMarble,
  bathMarblePlan,
  bathOak,
  deckLakeside,
  additionGable,
  exteriorStone,
  builtinFireplace,
  poolTerrace,
  poolFirepit,
  lakeTerrace,
  lakeFirepit,
};

export type ServiceKey = "kitchen" | "bathroom" | "addition" | "deck" | "custom";

export const serviceLabels: Record<ServiceKey, string> = {
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  addition: "Addition",
  deck: "Deck",
  custom: "Custom Project",
};

export type Photo = { src: StaticImageData; alt: string };

export type Project = {
  slug: string;
  title: string;
  service: ServiceKey;
  /** Short label shown on cards, e.g. "Kitchen Remodel". */
  type: string;
  /** Describes only what is visible in the photography. */
  description: string;
  photos: Photo[];
  beforeAfter?: { before: Photo; after: Photo; beforeLabel: string; afterLabel: string };
};

/**
 * Project titles, categories and descriptions are written from the photography
 * alone — no addresses, budgets or client details. Edit freely.
 */
export const projects: Project[] = [
  {
    slug: "navy-island-kitchen",
    title: "Navy Island Kitchen",
    service: "kitchen",
    type: "Kitchen",
    description:
      "A deep navy island with a marble top anchors this open kitchen, paired with white upper cabinetry, open wood shelving and brass hardware.",
    photos: [{ src: kitchenNavy, alt: "Open kitchen with navy island, marble countertop and glass pendant lights" }],
  },
  {
    slug: "marble-brass-primary-bath",
    title: "Marble & Brass Primary Bath",
    service: "bathroom",
    type: "Bathroom",
    description:
      "A frameless glass shower wrapped in marble, brushed-brass fixtures, lit niches and a freestanding soaking tub.",
    photos: [{ src: bathMarble, alt: "Marble primary bathroom with glass shower and freestanding tub" }],
    beforeAfter: {
      before: { src: bathMarblePlan, alt: "Line drawing of the marble primary bathroom" },
      after: { src: bathMarble, alt: "Finished marble primary bathroom" },
      beforeLabel: "Design",
      afterLabel: "Built",
    },
  },
  {
    slug: "lakeside-deck",
    title: "Lakeside Deck",
    service: "deck",
    type: "Deck",
    description:
      "A wide-plank deck with dark metal balusters, laid out for outdoor dining with a separate lounge area around a fire table.",
    photos: [{ src: deckLakeside, alt: "Wood deck overlooking a lake with dining table and outdoor sectional" }],
  },
  {
    slug: "stone-gable-addition",
    title: "Stone Gable Addition",
    service: "addition",
    type: "Addition",
    description:
      "A stone-clad gable with floor-to-ceiling black-framed windows, connected to a covered outdoor living space.",
    photos: [{ src: additionGable, alt: "Stone home addition with tall black-framed windows and covered patio" }],
  },
  {
    slug: "sage-island-timber-beams",
    title: "Sage Island & Timber Beams",
    service: "kitchen",
    type: "Kitchen",
    description:
      "Exposed timber beams, a sage-green island and a full-height marble backsplash bring warmth to a bright, open-plan kitchen.",
    photos: [{ src: kitchenSage, alt: "Kitchen with sage green island, timber ceiling beams and marble backsplash" }],
    beforeAfter: {
      before: { src: kitchenSagePlan, alt: "Line drawing of the sage island kitchen" },
      after: { src: kitchenSage, alt: "Finished sage island kitchen" },
      beforeLabel: "Design",
      afterLabel: "Built",
    },
  },
  {
    slug: "fireplace-built-ins",
    title: "Fireplace Built-Ins",
    service: "custom",
    type: "Custom Carpentry",
    description:
      "Custom built-in cabinetry with lit floating shelves flanks a marble fireplace surround beneath a coffered ceiling.",
    photos: [{ src: builtinFireplace, alt: "Living room built-ins with lit shelves around a marble fireplace" }],
  },
  {
    slug: "poolside-outdoor-living",
    title: "Poolside Outdoor Living",
    service: "custom",
    type: "Outdoor Living",
    description:
      "Sunken lounge seating around a stone fire pit, integrated step lighting and a covered outdoor kitchen overlooking the pool.",
    photos: [
      { src: poolTerrace, alt: "Pool terrace at dusk with sunken seating around a stone fire pit" },
      { src: poolFirepit, alt: "Fire pit lounge with lit steps leading to a covered outdoor kitchen" },
    ],
  },
  {
    slug: "waterfall-marble-kitchen",
    title: "Waterfall Marble Kitchen",
    service: "kitchen",
    type: "Kitchen",
    description:
      "A waterfall-edge island, a custom hood with a wood mantel and lit glass-front cabinetry create a calm, refined kitchen.",
    photos: [{ src: kitchenWaterfall, alt: "White kitchen with waterfall marble island and brass pendant lights" }],
  },
  {
    slug: "oak-vanity-primary-bath",
    title: "Oak Vanity Primary Bath",
    service: "bathroom",
    type: "Bathroom",
    description:
      "A warm oak double vanity, lit shower niches and a freestanding tub set beneath a large window.",
    photos: [{ src: bathOak, alt: "Bathroom with oak double vanity, glass shower and freestanding tub" }],
  },
  {
    slug: "stone-exterior",
    title: "Stone Exterior",
    service: "addition",
    type: "Exterior",
    description:
      "A stone and siding exterior with black-framed windows, standing-seam metal accents and a covered front entry.",
    photos: [{ src: exteriorStone, alt: "Two-story stone home exterior with covered front entry" }],
  },
  {
    slug: "lakeside-terrace",
    title: "Lakeside Terrace",
    service: "custom",
    type: "Outdoor Living",
    description:
      "A stone terrace with a fire pit lounge, pool and covered outdoor kitchen, set against the water.",
    photos: [
      { src: lakeTerrace, alt: "Lakeside terrace at sunset with fire pit and pool" },
      { src: lakeFirepit, alt: "Stone fire pit with built-in seating beside a pool and covered patio" },
    ],
  },
];

export const projectCategories: { key: ServiceKey | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "kitchen", label: "Kitchens" },
  { key: "bathroom", label: "Bathrooms" },
  { key: "deck", label: "Decks" },
  { key: "addition", label: "Additions" },
  { key: "custom", label: "Custom" },
];

export function projectsFor(service: ServiceKey): Project[] {
  return projects.filter((p) => p.service === service);
}
