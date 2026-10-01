import { About } from "@/components/About";
import { BeforeAfter } from "@/components/BeforeAfter";
import { EstimateWizard } from "@/components/EstimateWizard";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { RevealObserver } from "@/components/RevealObserver";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-forest-950"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <ProjectExplorer />
        <FeaturedProjects />
        <BeforeAfter />
        <About />
        <Process />
        <EstimateWizard />
      </main>
      <Footer />
      <FloatingActions />
      <RevealObserver />
    </>
  );
}
