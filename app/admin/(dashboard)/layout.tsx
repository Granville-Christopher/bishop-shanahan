import Link from "next/link";
import { BookOpen, Calendar, LayoutDashboard, Heart, Mail, Users, MessageSquare } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-card border-r border-border min-h-screen p-4 flex flex-col">
        <div className="mb-6 px-4">
          <h2 className="font-heading text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="flex-1 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground px-4 py-2 uppercase tracking-wider">Content</div>
          <Link href="/admin/books" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <BookOpen size={16} /> Books
          </Link>
          <Link href="/admin/programs" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <LayoutDashboard size={16} /> Programs
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <Calendar size={16} /> Events
          </Link>

          <div className="text-xs font-semibold text-muted-foreground px-4 py-2 mt-4 uppercase tracking-wider">Submissions</div>
          <Link href="/admin/contacts" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <MessageSquare size={16} /> Contact Messages
          </Link>
          <Link href="/admin/volunteers" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <Users size={16} /> Volunteers
          </Link>
          <Link href="/admin/prayers" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <Heart size={16} /> Prayer Requests
          </Link>
          <Link href="/admin/newsletters" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent text-foreground">
            <Mail size={16} /> Subscribers
          </Link>
        </nav>
        <div className="mt-auto pt-4">
          <Link href="/" className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground">
            Back to Website
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
