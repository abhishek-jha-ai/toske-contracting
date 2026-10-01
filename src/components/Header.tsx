"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { startEstimate } from "@/lib/events";
import { ContactLink } from "./ContactLink";
import { ArrowRightIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid
          ? "bg-forest-950/92 shadow-[0_1px_0_rgba(212,179,115,0.18)] backdrop-blur-md"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      {site.showDemoLabel && (
        <div
          className={`overflow-hidden bg-forest-950/80 text-center transition-[height,opacity] duration-500 ${
            scrolled || open ? "h-0 opacity-0" : "h-7 opacity-100"
          }`}
        >
          <p className="flex h-7 items-center justify-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cream-100/70">
            <span className="size-1 rounded-full bg-gold-400" aria-hidden />
            {site.demoLabel}
          </p>
        </div>
      )}
      <div
        className={`mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 transition-[height] duration-500 sm:px-8 ${
          scrolled ? "h-16" : "h-[76px] lg:h-[92px]"
        }`}
      >
        <a href="#top" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo className={`origin-left transition-transform duration-500 ${scrolled ? "scale-[0.86]" : "lg:scale-110"}`} />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative text-[14px] font-medium text-cream-100/90 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold-400 after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ContactLink
            channel="phone"
            placement="header"
            className="inline-flex h-11 items-center gap-2.5 rounded-md border border-white/10 bg-forest-900/80 px-4 text-[15px] font-semibold text-white transition-colors hover:border-gold-400/50"
          >
            <PhoneIcon className="size-[17px] text-gold-400" />
            {site.contact.phoneDisplay}
          </ContactLink>
          <button
            type="button"
            onClick={() => startEstimate()}
            className="group inline-flex h-11 items-center gap-2 rounded-md bg-gold-400 px-5 text-[14px] font-bold text-forest-950 transition-colors hover:bg-gold-300"
          >
            Get a Free Estimate
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ContactLink
            channel="phone"
            placement="header_mobile"
            aria-label={`Call ${site.contact.phoneDisplay}`}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-cream-50"
          >
            <PhoneIcon className="size-[18px]" />
          </ContactLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-cream-50"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-64px)] overflow-y-auto border-t border-white/10 bg-forest-950 px-6 pb-10 pt-6 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-white/10">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 font-serif text-[28px] text-cream-50"
                >
                  {item.label}
                  <span className="font-sans text-xs tracking-[0.2em] text-gold-400/70">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 grid gap-3">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              startEstimate();
            }}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-gold-400 text-[15px] font-bold text-forest-950"
          >
            Get a Free Estimate <ArrowRightIcon className="size-4" />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <ContactLink
              channel="phone"
              placement="mobile_menu"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 text-sm font-semibold text-cream-50"
            >
              <PhoneIcon className="size-4 text-gold-400" /> Call
            </ContactLink>
            <ContactLink
              channel="whatsapp"
              placement="mobile_menu"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 text-sm font-semibold text-cream-50"
            >
              <WhatsAppIcon className="size-4 text-gold-400" /> WhatsApp
            </ContactLink>
          </div>
          <p className="mt-4 text-center text-sm text-cream-100/60">
            Licensed General Contractor · {site.serviceArea}
          </p>
        </div>
      </div>
    </header>
  );
}
