"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  desc: string;
  image: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ book: Book; qty: number }[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch("/api/books")
      .then(res => res.json())
      .then(data => setBooks(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (book: Book) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.book._id === book._id);
      if (existing) return prev.map((c) => (c.book._id === book._id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { book, qty: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c.book._id !== id));

  const total = cart.reduce((sum, c) => sum + c.book.price * c.qty, 0);

  return (
    <Layout>
      <PageHero
        title={<>Books & <span className="text-gold">Publications</span></>}
        subtitle="Explore our collection of books documenting Bishop Shanahan's legacy and the foundation's work."
      />

      <Section>
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart size={18} />
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center font-bold">
                {cart.reduce((s, c) => s + c.qty, 0)}
              </span>
            )}
          </button>
        </div>

        {showCart && cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 bg-card rounded-xl border border-border p-6 shadow-sm"
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Your Cart</h3>
            <div className="space-y-3">
              {cart.map((c) => (
                <div key={c.book._id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <span className="font-medium text-foreground">{c.book.title}</span>
                    <span className="text-muted-foreground ml-2">× {c.qty}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">₦{(c.book.price * c.qty).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(c.book._id)} className="text-muted-foreground hover:text-destructive">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-foreground">Total: ₦{total.toLocaleString()}</span>
              <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                Checkout (Coming Soon)
              </button>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading books...</div>
        ) : books.length === 0 ? (
          <div className="max-w-xl mx-auto bg-card rounded-xl border border-border p-10 text-center">
            <h3 className="font-heading text-xl font-semibold text-foreground">No books available yet</h3>
            <p className="mt-3 text-muted-foreground">Please check back soon for our publications.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, i) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[2/3] overflow-hidden bg-muted">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" loading="lazy" width={600} height={900} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
                  <p className="text-sm text-muted-foreground mt-3 flex-1">{book.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-heading text-xl font-bold text-primary">₦{book.price.toLocaleString()}</span>
                    <button
                      onClick={() => addToCart(book)}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </Layout>
  );
};

export default Books;
