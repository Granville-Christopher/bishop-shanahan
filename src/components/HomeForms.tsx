"use client";

import { useState } from "react";
import Link from "next/link";
import { HandHeart, Heart, Send, ArrowRight, Mail } from "lucide-react";
import FeedbackModal from "@/components/FeedbackModal";

export const VolunteerCTA = () => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden grid grid-cols-1 md:grid-cols-2">
    <div className="bg-gradient-to-br from-primary to-primary/80 p-8 md:p-10 flex flex-col justify-center text-primary-foreground">
      <HandHeart size={36} />
      <h3 className="font-heading text-xl md:text-3xl font-bold mt-4">Become a Volunteer</h3>
      <p className="mt-3 opacity-90 leading-relaxed">
        Give your time, skills, or prayer. Walk with the persecuted and mentor troubled youth across Nigeria.
      </p>
    </div>
    <div className="p-8 md:p-10 flex flex-col justify-center">
      <p className="text-muted-foreground leading-relaxed">
        Whether you can serve in the field, mentor a young person, join our prayer team, or help with awareness — there's a place for you.
      </p>
      <Link href="/volunteer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors w-fit"
      >
        Sign Up to Volunteer <ArrowRight size={18} />
      </Link>
    </div>
  </div>
);

export const PrayerRequestForm = () => {
  const [form, setForm] = useState({ name: "", email: "", request: "", confidential: false });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "success" as "success" | "error" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/prayers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setModal({
          isOpen: true,
          title: "Prayer Request Received",
          message: "Thank you for sharing your prayer request with us. Our team will lift you up in prayer.",
          type: "success"
        });
        setForm({ name: "", email: "", request: "", confidential: false });
      } else {
        setModal({
          isOpen: true,
          title: "Submission Failed",
          message: "Failed to submit your prayer request. Please check your connection and try again.",
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
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center">
          <Heart size={20} className="text-primary" />
        </div>
        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">Submit a Prayer Request</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-5">
        Share what's on your heart. Our team will lift you up in prayer.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <textarea
          required
          rows={4}
          placeholder="Your prayer request..."
          value={form.request}
          onChange={(e) => setForm({ ...form, request: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none flex-1"
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={form.confidential}
            onChange={(e) => setForm({ ...form, confidential: e.target.checked })}
            className="rounded border-input"
          />
          Keep this request confidential
        </label>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Send size={16} /> {loading ? "Sending..." : "Send Prayer Request"}
        </button>
      </form>

      <FeedbackModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
};

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "success" as "success" | "error" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setModal({
          isOpen: true,
          title: "Subscription Successful",
          message: "Thank you for subscribing to our newsletter! You will now receive updates on our missions and programs.",
          type: "success"
        });
        setEmail("");
      } else {
        setModal({
          isOpen: true,
          title: "Subscription Failed",
          message: "Failed to register your email. Please try again.",
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
    <div className="bg-navy text-cream rounded-2xl p-8 md:p-12 text-center relative">
      <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-5">
        <Mail size={26} className="text-gold" />
      </div>
      <h3 className="font-heading text-xl md:text-3xl font-bold">
        Stay Connected With Our <span className="text-gold">Mission</span>
      </h3>
      <p className="mt-3 text-cream/70 max-w-xl mx-auto">
        Get stories from the field, prayer points, and updates on how your support is making a difference.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-cream/20 bg-cream/10 px-4 py-3 text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      <p className="mt-3 text-xs text-cream/50">No spam. Unsubscribe anytime.</p>

      <FeedbackModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
};
