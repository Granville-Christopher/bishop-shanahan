"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy text-cream">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading text-xl font-bold mb-4">
            Bishop Joseph Shanahan Foundation
          </h3>
          <p className="text-sm opacity-80 leading-relaxed">
            Providing spiritual and material help to victims of religious persecution in Nigeria, and to troubled youth.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/about", label: "About Us" },
              { to: "/programs", label: "Programs" },
              { to: "/books", label: "Books" },
              { to: "/volunteer", label: "Volunteer" },
              { to: "/donate", label: "Donate" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} href={l.to} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>Nigeria</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" />
              <span>info@shanahanfoundation.org</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <a href="tel:+18048227484" className="hover:opacity-100 transition-opacity">+1 804-822-7484</a>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Support Our Mission</h4>
          <p className="text-sm opacity-80 mb-4">Every contribution helps us build a brighter future.</p>
          <Link href="/donate"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Heart size={16} /> Donate Now
          </Link>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-cream/10 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Bishop Joseph Shanahan Foundation. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
