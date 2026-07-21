"use server";

import { prisma } from "@/lib/db";
import { queryWithRetry } from "./products";

export async function logAdminAction(action: string, details: string) {
  try {
    await queryWithRetry(() =>
      prisma.auditLog.create({
        data: {
          action,
          details,
        },
      })
    );
  } catch (error) {
    console.error("Failed to write to audit log:", error);
  }
}
