"use client";

import { useState } from "react";
import { subscribeToNewsletterAction } from "@/actions/newsletter";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await subscribeToNewsletterAction(email);
      if (res.success) {
        setMessage(res.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setError(res.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex border-b border-white/20 pb-2">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent w-full text-sm outline-none placeholder:text-white/40 focus:placeholder:text-white/20 text-white"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="text-sm font-medium uppercase hover:text-white/70 transition-colors disabled:opacity-50 text-white"
        >
          {loading ? "Joining..." : "Join"}
        </button>
      </form>
      
      {/* Toast-like mini messaging */}
      {message && (
        <p className="text-[11px] text-green-400 font-medium tracking-wide animate-fade-in">
          {message}
        </p>
      )}
      {error && (
        <p className="text-[11px] text-red-400 font-medium tracking-wide animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
