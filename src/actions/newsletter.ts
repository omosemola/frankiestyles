"use server";

import { prisma } from "@/lib/db";
import { queryWithRetry } from "./products";

// Helper to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function subscribeToNewsletterAction(email: string) {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    return { success: false, error: "Email address is required." };
  }

  if (!isValidEmail(cleanEmail)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  try {
    await queryWithRetry(() =>
      prisma.subscriber.create({
        data: { email: cleanEmail },
      })
    );
    return { success: true, message: "Thank you for subscribing to Frankie Styles!" };
  } catch (error: any) {
    // Gracefully handle duplicate email registration (Prisma P2002 unique constraint)
    if (error?.code === "P2002") {
      return { success: true, message: "You are already subscribed to our newsletter!" };
    }
    console.error("Newsletter subscription database error:", error);
    return { success: false, error: "Database error. Please try again later." };
  }
}

export async function getAdminSubscribers() {
  try {
    const subscribers = await queryWithRetry(() =>
      prisma.subscriber.findMany({
        orderBy: { createdAt: "desc" },
      })
    );
    return { success: true, subscribers: JSON.parse(JSON.stringify(subscribers)) };
  } catch (error) {
    console.error("Failed to fetch admin subscribers:", error);
    return { success: false, error: "Failed to fetch subscriber list." };
  }
}

export async function deleteSubscriberAction(id: string) {
  try {
    await queryWithRetry(() =>
      prisma.subscriber.delete({
        where: { id },
      })
    );
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete subscriber ${id}:`, error);
    return { success: false, error: "Failed to delete subscriber." };
  }
}
