"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await fetch("/api/volunteers");
      const data = await res.json();
      setVolunteers(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error("Failed to load volunteers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this volunteer application?")) return;
    try {
      const res = await fetch(`/api/volunteers/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Volunteer application deleted");
        fetchVolunteers();
      }
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-6">Volunteer Applications</h1>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/50 text-muted-foreground text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Applicant</th>
              <th className="px-6 py-4">Interest Area</th>
              <th className="px-6 py-4">About / Skills</th>
              <th className="px-6 py-4">Applied Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : volunteers.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No applications yet.</td></tr>
            ) : volunteers.map(v => (
              <tr key={v._id} className="hover:bg-muted/20">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{v.name}</div>
                  <div className="text-xs text-muted-foreground">{v.email}</div>
                  {v.phone && <div className="text-xs text-muted-foreground">{v.phone}</div>}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    {v.interest}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm max-w-sm whitespace-pre-wrap">{v.message || "—"}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(v.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(v._id)} className="text-destructive hover:text-destructive/85">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
