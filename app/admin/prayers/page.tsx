"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function AdminPrayers() {
  const [prayers, setPrayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    try {
      const res = await fetch("/api/prayers");
      const data = await res.json();
      setPrayers(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error("Failed to load prayers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this prayer request?")) return;
    try {
      const res = await fetch(`/api/prayers/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Prayer request deleted");
        fetchPrayers();
      }
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Prayer Requests</h1>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/50 text-muted-foreground text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Sender</th>
              <th className="px-6 py-4">Request</th>
              <th className="px-6 py-4">Confidential</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : prayers.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No prayer requests submitted yet.</td></tr>
            ) : prayers.map(p => (
              <tr key={p._id} className="hover:bg-muted/20">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{p.name || "Anonymous"}</div>
                  {p.email && <div className="text-xs text-muted-foreground">{p.email}</div>}
                </td>
                <td className="px-6 py-4 text-sm max-w-md whitespace-pre-wrap">{p.request}</td>
                <td className="px-6 py-4 text-sm">
                  {p.confidential ? (
                    <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">Yes</span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">No</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(p._id)} className="text-destructive hover:text-destructive/85">
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
