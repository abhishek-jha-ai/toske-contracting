"use client";

import type { AnchorHTMLAttributes } from "react";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

type Channel = "phone" | "whatsapp" | "email";

const hrefs: Record<Channel, string> = {
  phone: site.contact.phoneHref,
  whatsapp: site.contact.whatsappHref,
  email: site.contact.emailHref,
};

const events = {
  phone: "phone_clicked",
  whatsapp: "whatsapp_clicked",
  email: "email_clicked",
} as const;

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  channel: Channel;
  /** Where on the page the click happened, for analytics. */
  placement: string;
};

/** Phone / WhatsApp / email link with centralized click tracking. */
export function ContactLink({ channel, placement, onClick, children, ...rest }: Props) {
  const external = channel === "whatsapp";
  return (
    <a
      href={hrefs[channel]}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        trackEvent(events[channel], { placement });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
