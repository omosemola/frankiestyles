"use server";

import { prisma } from "@/lib/db";

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
    const consultation = await prisma.consultation.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        service: input.service,
        date: input.date,
        notes: input.notes || null,
      },
    });
    return { success: true, id: consultation.id };
  } catch (error) {
    console.error("Failed to create consultation record:", error);
    return { success: false, error: "Database error. Please try again." };
  }
}
