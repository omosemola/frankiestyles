"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAdminPasswordAction } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await verifyAdminPasswordAction(password);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Incorrect password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg text-center uppercase tracking-wide">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:bg-white text-center text-lg tracking-widest py-3"
          required
          autoFocus
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-black hover:bg-zinc-800 text-white font-bold uppercase tracking-wider py-3"
      >
        {loading ? "Verifying Access..." : "Grant Access"}
      </Button>
    </form>
  );
}
