"use server";

import { prisma } from "@/lib/db";

export interface OrderInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  paymentMethod: 'paystack' | 'whatsapp';
  paymentReference: string;
  totalAmount: number;
  shippingFee: number;
  items: any[]; // Array of cart items: { id, name, price, size, quantity }
}

export async function createOrderAction(input: OrderInput) {
  try {
    const order = await prisma.order.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        address: input.address,
        city: input.city,
        state: input.state,
        paymentMethod: input.paymentMethod,
        paymentReference: input.paymentReference,
        totalAmount: input.totalAmount,
        shippingFee: input.shippingFee,
        status: input.paymentMethod === 'paystack' ? 'paid' : 'pending', // Whatsapp checkout defaults to pending
        items: input.items,
      },
    });
    return { success: true, id: order.id };
  } catch (error) {
    console.error("Failed to create order record:", error);
    return { success: false, error: "Database error. Please try again." };
  }
}
