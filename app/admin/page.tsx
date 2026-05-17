import Link from "next/link";
import { BookOpen, Calendar, LayoutDashboard, Heart, Mail, Users, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome to the Bishop Joseph Shanahan Foundation admin panel. Use the sections below to manage your website.</p>

      <h2 className="text-xl font-semibold mb-4 text-foreground/80">Website Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link href="/admin/books" className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <BookOpen size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Books</h3>
          <p className="text-sm text-muted-foreground">Add, edit, or remove books available for sale on the website.</p>
        </Link>

        <Link href="/admin/programs" className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <LayoutDashboard size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Programs</h3>
          <p className="text-sm text-muted-foreground">Manage the foundation&apos;s programs and activities.</p>
        </Link>

        <Link href="/admin/events" className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Calendar size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Events</h3>
          <p className="text-sm text-muted-foreground">Schedule and manage upcoming events for the foundation.</p>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-foreground/80">Form Submissions</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link href="/admin/contacts" className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <MessageSquare size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Contact Messages</h3>
          <p className="text-xs text-muted-foreground">Read and manage inquiries sent through the contact page.</p>
        </Link>

        <Link href="/admin/volunteers" className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Users size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Volunteers</h3>
          <p className="text-xs text-muted-foreground">Review applications submitted by prospective volunteers.</p>
        </Link>

        <Link href="/admin/prayers" className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Heart size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Prayer Requests</h3>
          <p className="text-xs text-muted-foreground">View prayer requests shared by website visitors.</p>
        </Link>

        <Link href="/admin/newsletters" className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Mail size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Subscribers</h3>
          <p className="text-xs text-muted-foreground">Manage emails registered for newsletter updates.</p>
        </Link>
      </div>
    </div>
  );
}
