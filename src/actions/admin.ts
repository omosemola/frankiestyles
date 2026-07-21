"use server";

import { cookies } from "next/headers";
import { logAdminAction } from "./audit";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "frankieadmin";
const SESSION_COOKIE_NAME = "frankie_admin_session";

export async function verifyAdminPasswordAction(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });
      await logAdminAction("ADMIN_LOGIN", "Admin logged in successfully via passcode");
      return { success: true };
    }
    return { success: false, error: "Invalid password" };
  } catch (error) {
    console.error("Admin verification error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function checkAdminAuthAction(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);
    return session?.value === "authenticated";
  } catch (error) {
    console.error("Check admin auth error:", error);
    return false;
  }
}

export async function logoutAdminAction(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    await logAdminAction("ADMIN_LOGOUT", "Admin logged out");
  } catch (error) {
    console.error("Admin logout error:", error);
  }
}
