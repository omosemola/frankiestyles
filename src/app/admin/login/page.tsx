"use server";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { checkAdminAuthAction } from "@/actions/admin";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const isAuth = await checkAdminAuthAction();
  if (isAuth) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-black flex flex-col justify-center items-center px-4 relative">
      {/* Subtle grid pattern or light gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 text-center space-y-8">
        {/* Branding header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-[0.2em] uppercase text-black">
            FRANKIE <span className="text-gray-500 font-medium">STYLES</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold">
            Tailoring Portal • Administration
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white border border-gray-200/80 p-8 rounded-2xl smooth-shadow relative">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-6">Enter Admin Passcode</h2>
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
