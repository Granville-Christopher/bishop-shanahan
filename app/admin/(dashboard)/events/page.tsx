"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ImagePlus, Loader2, Calendar } from "lucide-react";

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    datetime: "",
    location: "",
    description: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview URL
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

    if (uploading) {
      toast.error("Please wait for image upload to finish");
      return;
    }

    try {
      // Parse single datetime-local picker value to construct human-friendly date and time
      const dt = new Date(formData.datetime);
      const dateStr = dt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const timeStr = dt.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });

      const submission = {
        title: formData.title,
        date: dateStr,
        time: timeStr,
        location: formData.location,
        description: formData.description,
        image: formData.image || undefined,
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (res.ok) {
        toast.success("Event added successfully");
        setFormData({ title: "", datetime: "", location: "", description: "", image: "" });
        setImagePreview("");
        const fileInput = document.getElementById("event-image-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
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
              <input
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <Calendar size={15} /> Date &amp; Time
              </label>
              <input
                required
                type="datetime-local"
                value={formData.datetime}
                onChange={e => setFormData({ ...formData, datetime: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                required
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Event Image (Optional)</label>
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <input
                    type="file"
                    id="event-image-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="event-image-input"
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
                        Choose Image File
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
            Add Event
          </button>
        </form>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-muted/50 text-muted-foreground text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Date &amp; Time</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No events found. Add one above.
                </td>
              </tr>
            ) : (
              events.map(ev => (
                <tr key={ev._id} className="hover:bg-muted/20">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    {ev.image && (
                      <div className="w-10 h-7 rounded overflow-hidden bg-muted flex-shrink-0 border">
                        <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <span>{ev.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    {ev.date} at {ev.time}
                  </td>
                  <td className="px-6 py-4">{ev.location}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(ev._id)}
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
