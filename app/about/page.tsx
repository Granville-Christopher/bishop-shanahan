"use client";

import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { ShieldCheck, HandHeart, Users } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Human Dignity",
    desc: "Every person — regardless of faith, tribe, or background — bears inherent worth that must be defended and upheld.",
  },
  {
    icon: HandHeart,
    title: "Compassionate Service",
    desc: "We meet people in their suffering with both prayer and practical help — never one without the other.",
  },
  {
    icon: Users,
    title: "Solidarity",
    desc: "We stand alongside the persecuted and the forgotten, walking with them on the long road to healing.",
  },
];

const About = () => (
  <Layout>
    <PageHero
      title={<>About the <span className="text-gold">Bishop Joseph Shanahan Foundation</span></>}
      subtitle="A non-profit dedicated to standing with victims of religious persecution and troubled youth in Nigeria."
    />

    {/* Mission */}
    <Section>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Who We Are</h2>
        <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>
            The Bishop Joseph Shanahan Foundation is a non-profit organization dedicated to providing spiritual and material help to victims of religious persecution in Nigeria, as well as to troubled youth.
          </p>
          <p>
            We believe that faith without works is incomplete. Our team partners with local churches, community leaders, and volunteers to bring tangible relief — food, shelter, counselling, education — alongside the prayer and pastoral support that sustains the human spirit through suffering.
          </p>
          <p>
            Inspired by the missionary spirit of Bishop Joseph Shanahan, we carry forward a tradition of service that honours the dignity of every person we encounter.
          </p>
        </div>
      </div>
    </Section>

    {/* Who We Serve */}
    <Section className="bg-muted/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
          Who We <span className="text-primary">Serve</span>
        </h2>
        <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>
            <strong className="text-foreground">Victims of Religious Persecution.</strong> Across parts of Nigeria, families have lost loved ones, homes, and livelihoods because of their faith. We offer them emergency relief, ongoing support, trauma care, and a community that refuses to let them be forgotten.
          </p>
          <p>
            <strong className="text-foreground">Troubled Youth.</strong> Young people facing violence, addiction, broken homes, or hopelessness need more than charity — they need mentors, opportunities, and a place to belong. Our youth programs provide faith formation, life-skills training, counselling, and a path forward.
          </p>
        </div>
      </div>
    </Section>

    {/* Values */}
    <Section>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
        Our <span className="text-primary">Values</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card rounded-xl p-8 border border-border text-center"
          >
            <div className="w-14 h-14 rounded-lg bg-gold-light flex items-center justify-center mx-auto mb-5">
              <v.icon size={28} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground">{v.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  </Layout>
);

export default About;
