"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Calendar, LayoutDashboard, Heart, Mail, Users, MessageSquare, Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border">
        <h2 className="font-heading text-xl font-bold text-primary">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Content */}
      <aside className={`${isOpen ? 'flex' : 'hidden'} md:flex w-full md:w-64 bg-card border-r border-border min-h-screen p-4 flex-col absolute md:static z-40 top-[73px] left-0 bottom-0`}>
        <div className="hidden md:block mb-6 px-4">
          <h2 className="font-heading text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="flex-1 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground px-4 py-2 uppercase tracking-wider">Content</div>
          <Link href="/admin/books" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <BookOpen size={16} /> Books
          </Link>
          <Link href="/admin/programs" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <LayoutDashboard size={16} /> Programs
          </Link>
          <Link href="/admin/events" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <Calendar size={16} /> Events
          </Link>

          <div className="text-xs font-semibold text-muted-foreground px-4 py-2 mt-4 uppercase tracking-wider">Submissions</div>
          <Link href="/admin/contacts" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <MessageSquare size={16} /> Contact Messages
          </Link>
          <Link href="/admin/volunteers" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <Users size={16} /> Volunteers
          </Link>
          <Link href="/admin/prayers" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <Heart size={16} /> Prayer Requests
          </Link>
          <Link href="/admin/newsletters" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <Mail size={16} /> Subscribers
          </Link>
        </nav>
        <div className="mt-auto pt-4 pb-12 md:pb-0">
          <Link href="/" className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground">
            Back to Website
          </Link>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
