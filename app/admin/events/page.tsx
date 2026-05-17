"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", date: "", time: "", location: "", description: "" });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Event added successfully");
        setFormData({ title: "", date: "", time: "", location: "", description: "" });
        fetchEvents();
      } else {
        toast.error("Failed to add event");
      }
    } catch (e) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Event deleted");
        fetchEvents();
      }
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Events</h1>

      <div className="bg-card p-6 rounded-xl border border-border mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input required type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input required value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" placeholder="e.g. 10:00 AM - 2:00 PM" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded-md bg-background text-foreground h-24" />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90">Add Event</button>
        </form>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-muted/50 text-muted-foreground text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : events.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No events found. Add one above.</td></tr>
            ) : events.map(ev => (
              <tr key={ev._id} className="hover:bg-muted/20">
                <td className="px-6 py-4 font-medium">{ev.title}</td>
                <td className="px-6 py-4">{ev.date}</td>
                <td className="px-6 py-4">{ev.location}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(ev._id)} className="text-destructive hover:underline text-sm font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
