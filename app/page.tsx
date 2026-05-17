"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, BookOpen, ShieldCheck, Users, HandHeart, ArrowRight, ShoppingCart, CalendarOff, Clock, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { VolunteerCTA, PrayerRequestForm, NewsletterSignup } from "@/components/HomeForms";

const stats = [
  { value: "1,000+", label: "Persecution Victims Supported" },
  { value: "500+", label: "Troubled Youth Reached" },
  { value: "30+", label: "Communities Served" },
  { value: "100%", label: "Mission Driven" },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "Aid for the Persecuted",
    desc: "Providing spiritual and material help to victims of religious persecution across Nigeria — food, shelter, counselling, and a path to rebuild.",
  },
  {
    icon: HandHeart,
    title: "Spiritual & Material Support",
    desc: "Walking with the displaced and the wounded — offering prayer, pastoral care, and the everyday essentials they need to recover.",
  },
  {
    icon: Users,
    title: "Hope for Troubled Youth",
    desc: "Mentorship, faith formation, and life-skills programs that help young Nigerians escape cycles of violence, addiction, and despair.",
  },
];

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then(res => res.json())
      .then(data => setFeaturedBooks(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch(() => {});

    fetch("/api/events")
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-05-16 at 3.51.00 PM.jpeg" alt="Community gathering in warm sunlight" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/60 to-navy/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl lg:text-7xl font-bold text-cream max-w-4xl mx-auto leading-tight"
          >
            Hope for the Persecuted.{" "}
            <span className="text-gold">Help for the Hurting.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base md:text-xl text-cream/80 max-w-2xl mx-auto"
          >
            The Bishop Joseph Shanahan Foundation provides spiritual and material help to victims of religious persecution in Nigeria, and walks with troubled youth toward renewal.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Heart size={18} /> Donate Now
            </Link>
            <Link href="/programs"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-cream/30 px-8 py-3.5 text-base font-semibold text-cream hover:bg-cream/10 transition-colors"
            >
              Explore Our Work <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission intro */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Mission</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-base md:text-lg">
            The Bishop Joseph Shanahan Foundation is a non-profit organization dedicated to providing spiritual and material help to victims of religious persecution in Nigeria, as well as to troubled youth. We stand with the suffering, defend human dignity, and offer pathways to healing and renewal.
          </p>
        </div>
      </Section>

      {/* Highlights */}
      <Section className="bg-muted/50">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-center text-foreground mb-12">
          How We <span className="text-primary">Help</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-light flex items-center justify-center mb-5">
                <h.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{h.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Impact stats */}
      <Section className="bg-navy text-cream">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-center mb-12">
          Our <span className="text-gold">Impact</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-3xl md:text-5xl font-bold text-gold">{s.value}</div>
              <div className="mt-2 text-sm md:text-base opacity-80">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Recent Events Section — dynamic */}
      <Section className="bg-muted/30">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
            Recent <span className="text-primary">Events</span>
          </h2>
        </div>
        {events.length === 0 ? (
          <div className="max-w-xl mx-auto bg-card rounded-xl border border-border p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-5">
              <CalendarOff size={26} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground">No events yet</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We don&apos;t have any upcoming events to share at the moment. Please check back soon, or reach out to learn how you can support our work.
            </p>
            <Link href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev, i) => (
              <motion.div
                key={ev._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">{ev.title}</h3>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Clock size={14} /> {ev.date} · {ev.time}</div>
                  <div className="flex items-center gap-2"><MapPin size={14} /> {ev.location}</div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{ev.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      {/* Featured Books Section — dynamic */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
            Featured <span className="text-primary">Books</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Publications that inspire faith, courage, and a heart for the persecuted.
          </p>
        </div>
        {featuredBooks.length === 0 ? (
          <div className="max-w-xl mx-auto bg-card rounded-xl border border-border p-10 text-center">
            <h3 className="font-heading text-xl font-semibold text-foreground">No books available yet</h3>
            <p className="mt-3 text-muted-foreground">Check back soon for our publications.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredBooks.map((book: any, i: number) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[2/3] overflow-hidden bg-muted">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" loading="lazy" width={600} height={900} />
                </div>
                <div className="p-3 md:p-4 flex flex-col flex-1">
                  <h3 className="font-heading text-sm font-semibold text-foreground line-clamp-2 leading-tight">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{book.author}</p>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 flex-1 hidden md:block">{book.desc}</p>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className="font-heading text-sm font-bold text-primary">₦{book.price?.toLocaleString()}</span>
                    <Link href="/books"
                      className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingCart size={12} /> Buy
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link href="/books"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-8 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View All Books <ArrowRight size={18} />
          </Link>
        </div>
      </Section>

      {/* Volunteer + Prayer two-column */}
      <Section className="bg-muted/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <VolunteerCTA />
          <PrayerRequestForm />
        </div>
      </Section>

      {/* Newsletter */}
      <Section>
        <NewsletterSignup />
      </Section>

      {/* CTA Banner */}
      <Section className="bg-gold-light">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
            Stand With the <span className="text-primary">Persecuted</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Your generosity brings food, shelter, prayer, and hope to families and youth across Nigeria who need it most.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Heart size={18} /> Donate Now
            </Link>
            <Link href="/books"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-card border border-border px-8 py-3.5 text-base font-semibold text-foreground hover:bg-accent transition-colors"
            >
              <BookOpen size={18} /> Browse Books
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Index;
