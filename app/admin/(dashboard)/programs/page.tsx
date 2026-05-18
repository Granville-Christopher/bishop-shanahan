"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ImagePlus, Loader2 } from "lucide-react";

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      setFormData(prev => ({ ...prev, image: data.url }));
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload a program cover image first");
      return;
    }

    if (uploading) {
      toast.error("Please wait for image upload to finish");
      return;
    }

    try {
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Program added successfully");
        setFormData({ title: "", description: "", image: "" });
        setImagePreview("");
        const fileInput = document.getElementById("program-image-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
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
      <h1 className="text-xl md:text-2xl font-bold mb-6">Manage Programs &amp; Activities</h1>

      <div className="bg-card p-6 rounded-xl border border-border mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add New Program</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Program Cover Image</label>
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <input
                    type="file"
                    id="program-image-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="program-image-input"
                    className="flex items-center justify-center gap-2 w-full px-3 py-2 border rounded-md bg-background text-foreground cursor-pointer hover:bg-muted/40 transition-colors border-dashed"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Uploading to Blob...
                      </>
                    ) : (
                      <>
                        <ImagePlus size={16} />
                        Choose Cover Image
                      </>
                    )}
                  </label>
                </div>
                {imagePreview && (
                  <div className="relative w-16 h-10 border rounded overflow-hidden bg-muted flex-shrink-0">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground h-24"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-55"
          >
            Add Program
          </button>
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
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : programs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                  No programs found. Add one above.
                </td>
              </tr>
            ) : (
              programs.map(p => (
                <tr key={p._id} className="hover:bg-muted/20">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    {p.image && (
                      <div className="w-10 h-7 rounded overflow-hidden bg-muted flex-shrink-0 border">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <span>{p.title}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground truncate max-w-xs">
                    {p.description}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-destructive hover:underline text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
