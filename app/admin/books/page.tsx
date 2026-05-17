"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AdminBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", author: "", price: "", desc: "", image: "" });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(formData.price) })
      });
      if (res.ok) {
        toast.success("Book added successfully");
        setFormData({ title: "", author: "", price: "", desc: "", image: "" });
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
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (₦)</label>
              <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" placeholder="/assets/book.jpg or http..." />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full px-3 py-2 border rounded-md bg-background text-foreground h-24" />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90">Add Book</button>
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
              <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : books.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No books found. Add one above.</td></tr>
            ) : books.map(book => (
              <tr key={book._id} className="hover:bg-muted/20">
                <td className="px-6 py-4 font-medium">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">₦{book.price}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(book._id)} className="text-destructive hover:underline text-sm font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
