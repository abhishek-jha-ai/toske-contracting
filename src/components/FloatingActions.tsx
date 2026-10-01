"use client";

import { useScrollZones } from "@/lib/useScrollZones";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * Coordinates the mobile sticky bar and floating WhatsApp button so they
 * never stack on top of each other or cover the estimate form.
 */
export function FloatingActions() {
  const { pastHero, formVisible } = useScrollZones();
  const barVisible = pastHero && !formVisible;

  return (
    <>
      <MobileStickyCTA visible={barVisible} />
      <WhatsAppButton visibleMobile={formVisible} visibleDesktop={pastHero} />
    </>
  );
}
