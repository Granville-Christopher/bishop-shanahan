"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function AdminNewsletters() {
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
    try {
      const res = await fetch("/api/newsletters");
      const data = await res.json();
      setSubs(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      const res = await fetch(`/api/newsletters/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Subscriber deleted");
        fetchSubs();
      }
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-6">Newsletter Subscribers</h1>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm max-w-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/50 text-muted-foreground text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : subs.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">No subscribers yet.</td></tr>
            ) : subs.map(s => (
              <tr key={s._id} className="hover:bg-muted/20">
                <td className="px-6 py-4 font-medium text-foreground">{s.email}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(s._id)} className="text-destructive hover:text-destructive/85">
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
