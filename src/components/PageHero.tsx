import { motion } from "framer-motion";
import pageHeroBg from "@/assets/page-hero-bg.jpg";

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => (
  <section className="relative text-cream py-16 md:py-28 overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={pageHeroBg}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover"
        loading="eager"
        width={1920}
        height={900}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/70" />
    </div>
    <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-cream/80 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  </section>
);

export default PageHero;
