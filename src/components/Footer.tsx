import { site } from "@/config/site";
import { ContactLink } from "./ContactLink";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="site-footer" className="bg-forest-950 pb-28 pt-16 text-cream-100/75 lg:pb-12">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="scale-110 origin-left" />
            <p className="mt-6 max-w-[340px] text-[15px] leading-relaxed">
              Licensed general contractor for high-end residential construction and renovation in Pennsylvania & New Jersey.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow text-gold-400">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] md:grid-cols-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-gold-400">Contact</p>
            <ul className="mt-4 grid gap-2.5 text-[15px]">
              <li>
                <ContactLink channel="phone" placement="footer" className="transition-colors hover:text-white">
                  {site.contact.phoneDisplay}
                </ContactLink>
              </li>
              <li>
                <ContactLink channel="whatsapp" placement="footer" className="transition-colors hover:text-white">
                  WhatsApp {site.contact.phoneDisplay}
                </ContactLink>
              </li>
              <li>
                <ContactLink channel="email" placement="footer" className="break-all transition-colors hover:text-white">
                  {site.contact.email}
                </ContactLink>
              </li>
              <li className="pt-2 text-cream-100/55">Serving Pennsylvania & New Jersey</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-[13px] text-cream-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            {site.showDemoLabel ? site.demoLabel : "Kitchens · Bathrooms · Decks · Additions · Custom"}
          </p>
        </div>
      </div>
    </footer>
  );
}
