"use server";

import { prisma } from "@/lib/db";
import { queryWithRetry } from "./products";
import { checkAdminAuthAction } from "./admin";

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

    // Asynchronously dispatch welcome email in the background
    import("@/lib/email").then(({ sendNewsletterWelcomeEmailAction }) => {
      sendNewsletterWelcomeEmailAction(cleanEmail).catch(err => {
        console.error("Background welcome email dispatch error:", err);
      });
    }).catch(err => {
      console.error("Dynamic import of email action failure:", err);
    });

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
  const isAdmin = await checkAdminAuthAction();
  if (!isAdmin) return { success: false, error: "Unauthorized" };

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
  const isAdmin = await checkAdminAuthAction();
  if (!isAdmin) return { success: false, error: "Unauthorized" };

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

export async function broadcastNewsletterAction(payload: { subject: string; content: string }) {
  const isAdmin = await checkAdminAuthAction();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized access." };
  }

  const { subject, content } = payload;
  if (!subject.trim() || !content.trim()) {
    return { success: false, error: "Subject and content are required." };
  }

  try {
    const subscribers = await queryWithRetry(() =>
      prisma.subscriber.findMany({
        select: { email: true },
      })
    );

    if (subscribers.length === 0) {
      return { success: false, error: "No subscribers found to broadcast to." };
    }

    const emailList = subscribers.map(s => s.email);

    const { sendNewsletterBroadcastAction } = await import("@/lib/email");
    const result = await sendNewsletterBroadcastAction(subject, content, emailList);

    if (result.success) {
      return { success: true, count: result.count };
    } else {
      return { success: false, error: result.error || "Failed to dispatch newsletter emails." };
    }
  } catch (error) {
    console.error("Failed to broadcast newsletter campaign:", error);
    return { success: false, error: "Broadcast error. Please check system mail configurations." };
  }
}
