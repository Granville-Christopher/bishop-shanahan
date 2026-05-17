"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { CalendarOff, ArrowRight, Heart, MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface EventItem {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <PageHero
        title={<>Events & <span className="text-gold">News</span></>}
        subtitle="Updates on our outreaches, prayer vigils, and youth programs."
      />

      <Section>
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading events...</div>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto bg-card rounded-xl border border-border p-10 md:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-6">
              <CalendarOff size={30} className="text-primary" />
            </div>
            <h2 className="font-heading text-xl md:text-3xl font-bold text-foreground">No events yet</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              We don&apos;t have any upcoming or past events to display at this time. Please check back soon — new outreaches and programs will be announced here.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((ev, i) => (
              <motion.div
                key={ev._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {ev.image && (
                  <div className="aspect-video w-full overflow-hidden bg-muted border-b border-border">
                    <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">{ev.title}</h3>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock size={14} /> {ev.date} · {ev.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} /> {ev.location}
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{ev.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      <Section className="bg-gold-light">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Want to Support Our Mission?</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Even when there are no events on the calendar, the work of caring for the persecuted and troubled youth never stops.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              <Heart size={16} /> Donate Now
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-card border border-border px-8 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Events;
