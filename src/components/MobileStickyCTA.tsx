"use client";

import { startEstimate } from "@/lib/events";
import { ContactLink } from "./ContactLink";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export function MobileStickyCTA({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-forest-950/95 px-3 pb-[max(env(safe-area-inset-bottom),10px)] pt-2.5 backdrop-blur-md transition-transform duration-500 ease-out-soft lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <nav aria-label="Quick contact" className="mx-auto grid max-w-[520px] grid-cols-[1fr_1fr_1.35fr] gap-2">
        <ContactLink
          channel="phone"
          placement="mobile_sticky"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 text-sm font-semibold text-cream-50"
        >
          <PhoneIcon className="size-4 text-gold-400" /> Call
        </ContactLink>
        <ContactLink
          channel="whatsapp"
          placement="mobile_sticky"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 text-sm font-semibold text-cream-50"
        >
          <WhatsAppIcon className="size-4 text-[#4ade80]" /> WhatsApp
        </ContactLink>
        <button
          type="button"
          onClick={() => startEstimate()}
          className="inline-flex h-12 items-center justify-center rounded-md bg-gold-400 text-sm font-bold text-forest-950"
        >
          Free Estimate
        </button>
      </nav>
    </div>
  );
}
