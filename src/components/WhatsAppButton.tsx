"use client";

import { ContactLink } from "./ContactLink";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppButton({ visibleMobile, visibleDesktop }: { visibleMobile: boolean; visibleDesktop: boolean }) {
  const mobile = visibleMobile ? "max-lg:translate-y-0 max-lg:opacity-100" : "max-lg:pointer-events-none max-lg:translate-y-4 max-lg:opacity-0";
  const desktop = visibleDesktop ? "lg:translate-y-0 lg:opacity-100" : "lg:pointer-events-none lg:translate-y-4 lg:opacity-0";
  const hidden = !(visibleMobile || visibleDesktop);

  return (
    <ContactLink
      channel="whatsapp"
      placement="floating_button"
      aria-label="Chat on WhatsApp"
      tabIndex={hidden ? -1 : undefined}
      className={`group fixed bottom-[max(env(safe-area-inset-bottom),18px)] right-4 z-40 inline-flex h-14 items-center overflow-hidden rounded-full bg-[#1f7a4d] px-4 text-white shadow-[0_14px_30px_-10px_rgba(0,0,0,0.45)] ring-1 ring-white/15 transition-all duration-500 ease-out-soft hover:bg-[#1a6a43] sm:right-6 lg:bottom-8 lg:right-8 ${mobile} ${desktop}`}
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="max-w-0 whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-500 ease-out-soft group-hover:ml-2.5 group-hover:max-w-[160px] group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-[160px] group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
    </ContactLink>
  );
}
