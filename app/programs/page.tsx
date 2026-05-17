"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { ShieldCheck, HandHeart, Users, BookOpen } from "lucide-react";

const defaultPrograms = [
  {
    icon: ShieldCheck,
    title: "Relief for Victims of Religious Persecution",
    desc: "Emergency aid for families displaced or wounded by religious violence in Nigeria — including food, shelter, medical assistance, and resettlement support. We work with local partners to reach those most in need, regardless of denomination or background.",
    color: "bg-gold-light",
    iconColor: "text-primary",
  },
  {
    icon: HandHeart,
    title: "Spiritual & Pastoral Care",
    desc: "Prayer ministry, trauma counselling, and pastoral accompaniment for survivors. Our chaplains and volunteers walk alongside the suffering, offering hope rooted in faith and the assurance that they are not alone.",
    color: "bg-sage-light",
    iconColor: "text-secondary",
  },
  {
    icon: Users,
    title: "Troubled Youth Outreach",
    desc: "Mentorship, life-skills training, retreats, and counselling for young Nigerians facing addiction, violence, broken homes, or despair. We help youth find purpose, community, and a renewed sense of dignity.",
    color: "bg-gold-light",
    iconColor: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Awareness & Advocacy",
    desc: "We raise awareness about the realities of religious persecution in Nigeria and amplify the voices of survivors — through publications, events, and partnerships that move people from sympathy to action.",
    color: "bg-sage-light",
    iconColor: "text-secondary",
  },
];

interface DBProgram {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const Programs = () => {
  const [dbPrograms, setDbPrograms] = useState<DBProgram[]>([]);

  useEffect(() => {
    fetch("/api/programs")
      .then(res => res.json())
      .then(data => setDbPrograms(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <PageHero
        title={<>Our <span className="text-gold">Programs</span></>}
        subtitle="Standing with the persecuted and the troubled — through relief, prayer, mentorship, and advocacy."
      />

      <Section>
        <div className="space-y-12">
          {/* Default static programs */}
          {defaultPrograms.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-8 md:p-10 border border-border shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className={`w-14 h-14 rounded-lg ${p.color} flex items-center justify-center shrink-0`}>
                  <p.icon size={28} className={p.iconColor} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed text-base md:text-lg">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Dynamic programs from database */}
          {dbPrograms.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (defaultPrograms.length + i) * 0.1 }}
              className="bg-card rounded-xl p-8 md:p-10 border border-border shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {p.image && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed text-base md:text-lg">{p.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-gold-light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Every Gift <span className="text-primary">Matters</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-base md:text-lg">
            Whether it&apos;s a meal for a displaced family, a counselling session for a hurting young person, or a Bible placed in trembling hands — your support makes our work possible.
          </p>
        </div>
      </Section>
    </Layout>
  );
};

export default Programs;
