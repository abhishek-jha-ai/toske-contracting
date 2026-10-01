import Image from "next/image";
import { images } from "@/data/projects";

const pillars = [
  { title: "Quality", copy: "Materials and workmanship chosen to last, not just to photograph well." },
  { title: "Precision", copy: "Clean lines, tight joints and careful layout from framing to finish." },
  { title: "Detail", copy: "The trim, the hardware, the lighting — the parts you live with every day." },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="overflow-hidden bg-cream-100 py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div data-reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={images.builtinFireplace}
              alt="Custom built-in shelving and marble fireplace surround"
              fill
              sizes="(min-width:1024px) 560px, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden w-[44%] overflow-hidden rounded-lg border-[6px] border-cream-100 shadow-xl sm:block lg:-right-10">
            <div className="relative aspect-square">
              <Image src={images.bathOak} alt="" fill sizes="260px" className="object-cover" />
            </div>
          </div>
        </div>

        <div data-reveal className="order-1 lg:order-2">
          <p className="eyebrow text-gold-700">About Toske</p>
          <h2 id="about-title" className="mt-3 font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.06] text-forest-900">
            Craftsmanship You Can See
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-stone">
            Toske Contracting focuses on high-end residential construction and renovation across Pennsylvania and New
            Jersey, with an emphasis on quality, precision, and detail.
          </p>

          <dl className="mt-10 grid gap-6 border-t border-forest-900/10 pt-8 sm:grid-cols-3 sm:gap-6">
            {pillars.map((p) => (
              <div key={p.title}>
                <dt className="font-serif text-[22px] text-forest-900">
                  <span className="mb-3 block h-px w-8 bg-gold-500" aria-hidden />
                  {p.title}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-stone">{p.copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
