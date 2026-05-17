"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import { Heart, ShieldCheck, HandHeart, Users } from "lucide-react";
import FeedbackModal from "@/components/FeedbackModal";

const presets = [1000, 5000, 10000, 25000, 50000, 100000];

const impacts = [
  { icon: ShieldCheck, amount: "₦5,000", desc: "Provides emergency food and supplies for a displaced family" },
  { icon: HandHeart, amount: "₦25,000", desc: "Funds a counselling session for a survivor of persecution" },
  { icon: Users, amount: "₦100,000", desc: "Sponsors a youth retreat for at-risk young people" },
];

const Donate = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <Layout>
      <PageHero
        title={<>Make a <span className="text-gold">Donation</span></>}
        subtitle="Your generosity brings relief to victims of religious persecution and renewal to troubled youth across Nigeria."
      />

      {/* Impact */}
      <Section className="bg-gold-light">
        <h2 className="font-heading text-xl md:text-3xl font-bold text-center text-foreground mb-10">
          Your <span className="text-primary">Impact</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impacts.map((imp) => (
            <div key={imp.amount} className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-4">
                <imp.icon size={24} className="text-secondary" />
              </div>
              <div className="font-heading text-2xl font-bold text-primary">{imp.amount}</div>
              <p className="mt-2 text-sm text-muted-foreground">{imp.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Donation Form */}
      <Section>
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            Choose Your Amount
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {presets.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setAmount(p)}
                  className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${
                    amount === p
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  ₦{p.toLocaleString()}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Custom Amount (₦)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Leave a message of support..."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Heart size={18} /> Donate ₦{amount ? Number(amount).toLocaleString() : "0"}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Secure payment powered by Paystack. Your data is encrypted and protected.
            </p>
          </form>
        </div>
      </Section>

      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Generosity Appreciated!"
        message="Thank you for your incredible support to stand with the persecuted. Paystack payment gateway integration is currently in testing mode and will be live shortly."
        type="success"
      />
    </Layout>
  );
};

export default Donate;
