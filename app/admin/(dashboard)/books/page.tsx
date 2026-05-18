"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ImagePlus, Loader2 } from "lucide-react";

export default function AdminBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    desc: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error("Failed to load books");
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
      toast.error("Please upload a book cover image first");
      return;
    }

    if (uploading) {
      toast.error("Please wait for image upload to finish");
      return;
    }

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(formData.price) }),
      });
      if (res.ok) {
        toast.success("Book added successfully");
        setFormData({ title: "", author: "", price: "", desc: "", image: "" });
        setImagePreview("");
        const fileInput = document.getElementById("book-image-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        fetchBooks();
      } else {
        toast.error("Failed to add book");
      }
    } catch (e) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Book deleted");
        fetchBooks();
      }
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Books</h1>

      <div className="bg-card p-6 rounded-xl border border-border mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
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
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                required
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (₦)</label>
              <input
                required
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Book Cover Image</label>
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <input
                    type="file"
                    id="book-image-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="book-image-input"
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
              value={formData.desc}
              onChange={e => setFormData({ ...formData, desc: e.target.value })}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground h-24"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-55"
          >
            Add Book
          </button>
        </form>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-muted/50 text-muted-foreground text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Price</th>
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
            ) : books.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No books found. Add one above.
                </td>
              </tr>
            ) : (
              books.map(book => (
                <tr key={book._id} className="hover:bg-muted/20">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    {book.image && (
                      <div className="w-10 h-7 rounded overflow-hidden bg-muted flex-shrink-0 border">
                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <span>{book.title}</span>
                  </td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">₦{book.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(book._id)}
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
