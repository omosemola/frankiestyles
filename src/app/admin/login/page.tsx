"use server";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { checkAdminAuthAction } from "@/actions/admin";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AdminLoginPage() {
  const isAuth = await checkAdminAuthAction();
  if (isAuth) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden px-4">
      {/* Decorative luxury gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />

      <div className="w-full max-w-md relative z-10 text-center space-y-8">
        {/* Branding header */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-[0.25em] uppercase text-white">
            FRANKIE <span className="text-[#c5a059]">STYLES</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
            Tailoring Portal • Administration
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl smooth-shadow relative group">
          <div className="absolute -inset-px bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent rounded-2xl opacity-50 blur-sm pointer-events-none" />
          <h2 className="text-lg font-bold uppercase tracking-wider mb-6">Enter Admin Passcode</h2>
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
