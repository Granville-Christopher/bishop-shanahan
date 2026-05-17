"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
}

export default function FeedbackModal({ isOpen, onClose, title, message, type = "success" }: FeedbackModalProps) {
  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-card text-card-foreground border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col items-center text-center overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            {isSuccess ? (
              <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mb-5 text-gold border border-gold/30">
                <Check size={32} strokeWidth={3} />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-destructive/15 flex items-center justify-center mb-5 text-destructive border border-destructive/30">
                <AlertTriangle size={32} strokeWidth={2} />
              </div>
            )}

            {/* Title */}
            <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">
              {title}
            </h3>

            {/* Message */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {message}
            </p>

            {/* Button */}
            <button
              onClick={onClose}
              className={`w-full inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-base font-semibold text-primary-foreground hover:opacity-90 transition-colors shadow-lg ${
                isSuccess 
                  ? "bg-primary shadow-primary/20" 
                  : "bg-destructive shadow-destructive/20"
              }`}
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
