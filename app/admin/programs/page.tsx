"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "", image: "" });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await fetch("/api/programs");
      const data = await res.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error("Failed to load programs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Program added successfully");
        setFormData({ title: "", description: "", image: "" });
        fetchPrograms();
      } else {
        toast.error("Failed to add program");
      }
    } catch (e) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    try {
      const res = await fetch(`/api/programs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Program deleted");
        fetchPrograms();
      }
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Programs &amp; Activities</h1>

      <div className="bg-card p-6 rounded-xl border border-border mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Program</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" placeholder="/assets/program.jpg or http..." />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded-md bg-background text-foreground h-24" />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90">Add Program</button>
        </form>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-muted/50 text-muted-foreground text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : programs.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">No programs found. Add one above.</td></tr>
            ) : programs.map(p => (
              <tr key={p._id} className="hover:bg-muted/20">
                <td className="px-6 py-4 font-medium">{p.title}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground truncate max-w-xs">{p.description}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(p._id)} className="text-destructive hover:underline text-sm font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
