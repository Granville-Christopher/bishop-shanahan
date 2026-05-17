"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { HandHeart, Users, BookOpen, Megaphone, Send } from "lucide-react";
import FeedbackModal from "@/components/FeedbackModal";

const opportunities = [
  {
    icon: HandHeart,
    title: "Outreach Volunteer",
    desc: "Help distribute relief supplies, visit displaced families, and support our field teams in communities affected by religious persecution.",
  },
  {
    icon: Users,
    title: "Youth Mentor",
    desc: "Walk alongside troubled young Nigerians — share your experience, encourage them, and help them discover purpose and hope.",
  },
  {
    icon: BookOpen,
    title: "Prayer & Pastoral Support",
    desc: "Join our prayer team, offer pastoral care to survivors, or lead small-group reflections during retreats and gatherings.",
  },
  {
    icon: Megaphone,
    title: "Awareness & Advocacy",
    desc: "Use your skills in writing, design, social media, or events to amplify the voices of the persecuted and grow our community of supporters.",
  },
];

const Volunteer = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "success" as "success" | "error" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setModal({
          isOpen: true,
          title: "Application Received!",
          message: "Thank you for offering your time and talent to stand with the persecuted. Our team will review your details and reach out shortly.",
          type: "success"
        });
        setForm({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        setModal({
          isOpen: true,
          title: "Submission Failed",
          message: "Failed to submit your volunteer application. Please try again.",
          type: "error"
        });
      }
    } catch (err) {
      setModal({
        isOpen: true,
        title: "An Error Occurred",
        message: "An unexpected error occurred. Please try again later.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHero
        title={<>Become a <span className="text-gold">Volunteer</span></>}
        subtitle="Give your time, talent, and heart. Stand with the persecuted and walk with troubled youth."
      />

      <Section>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
            Ways to <span className="text-primary">Get Involved</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Whatever your gift, there is a place for you in this mission.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {opportunities.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-light flex items-center justify-center mb-4">
                <o.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">{o.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{o.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
            Sign Up to Volunteer
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Tell us a little about yourself and how you'd like to help.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5 bg-card p-6 md:p-8 rounded-xl border border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+234..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Area of Interest</label>
              <select
                required
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select an option</option>
                {opportunities.map((o) => (
                  <option key={o.title} value={o.title}>{o.title}</option>
                ))}
                <option value="Other">Other / Not sure</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tell us about yourself</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Skills, availability, why you want to help..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send size={18} /> {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </Section>

      <FeedbackModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </Layout>
  );
};

export default Volunteer;
