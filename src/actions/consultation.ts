"use server";

import { prisma } from "@/lib/db";
import { queryWithRetry } from "./products";

export interface ConsultationInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  notes?: string;
}

export async function createConsultationAction(input: ConsultationInput) {
  try {
    const consultation = await queryWithRetry(() => 
      prisma.consultation.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          service: input.service,
          date: input.date,
          notes: input.notes || null,
        },
      })
    );
    return { success: true, id: consultation.id };
  } catch (error) {
    console.error("Failed to create consultation record:", error);
    return { success: false, error: "Database error. Please try again." };
  }
}

export async function getAdminConsultations() {
  try {
    const consultations = await queryWithRetry(() =>
      prisma.consultation.findMany({
        orderBy: { createdAt: "desc" },
      })
    );
    return { success: true, consultations: JSON.parse(JSON.stringify(consultations)) };
  } catch (error) {
    console.error("Failed to fetch admin consultations:", error);
    return { success: false, error: "Failed to fetch consultations." };
  }
}

export async function deleteConsultationAction(id: string) {
  try {
    await queryWithRetry(() =>
      prisma.consultation.delete({
        where: { id },
      })
    );
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete consultation ${id}:`, error);
    return { success: false, error: "Failed to delete consultation." };
  }
}
