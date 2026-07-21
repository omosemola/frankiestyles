"use server";

import { prisma } from "@/lib/db";
import { queryWithRetry } from "./products";
import { checkAdminAuthAction } from "./admin";
import { logAdminAction } from "./audit";

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
    const order = await queryWithRetry(() => 
      prisma.order.create({
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
      })
    );

    // Send confirmation email notifications in background (don't block client response)
    import('@/lib/email').then(({ sendOrderEmailsAction }) => {
      sendOrderEmailsAction({
        id: order.id,
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        city: order.city,
        state: order.state,
        paymentMethod: order.paymentMethod,
        paymentReference: order.paymentReference,
        totalAmount: order.totalAmount,
        shippingFee: order.shippingFee,
        items: order.items as any[]
      }).catch(err => {
        console.error("Background order email dispatch failed:", err);
      });
    }).catch(err => {
      console.error("Failed to import email utilities for background dispatch:", err);
    });

    return { success: true, id: order.id };
  } catch (error) {
    console.error("Failed to create order record:", error);
    return { success: false, error: "Database error. Please try again." };
  }
}

export async function getAdminOrders() {
  const isAdmin = await checkAdminAuthAction();
  if (!isAdmin) return { success: false, error: "Unauthorized" };

  try {
    const orders = await queryWithRetry(() =>
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      })
    );
    return { success: true, orders: JSON.parse(JSON.stringify(orders)) };
  } catch (error) {
    console.error("Failed to fetch admin orders:", error);
    return { success: false, error: "Failed to fetch orders." };
  }
}

export async function updateOrderStatusAction(id: string, status: string) {
  const isAdmin = await checkAdminAuthAction();
  if (!isAdmin) return { success: false, error: "Unauthorized" };

  try {
    const updated = await queryWithRetry(() =>
      prisma.order.update({
        where: { id },
        data: { status },
      })
    );

    // Send status update email notification in background
    import('@/lib/email').then(({ sendOrderStatusUpdateEmailAction }) => {
      sendOrderStatusUpdateEmailAction({
        name: updated.name,
        email: updated.email,
        paymentReference: updated.paymentReference,
        totalAmount: updated.totalAmount,
        shippingFee: updated.shippingFee,
        items: updated.items as any[],
        status: updated.status
      }).catch(err => {
        console.error(`Background ${updated.status} status email dispatch failed:`, err);
      });
    }).catch(err => {
      console.error("Failed to import email utilities for status update:", err);
    });

    await logAdminAction("ORDER_STATUS_CHANGE", `Order ID: ${id} status updated to ${status}.`);

    return { success: true, order: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error(`Failed to update order status for ${id}:`, error);
    return { success: false, error: "Failed to update order status." };
  }
}

export async function deleteOrderAction(id: string) {
  const isAdmin = await checkAdminAuthAction();
  if (!isAdmin) return { success: false, error: "Unauthorized" };

  try {
    await queryWithRetry(() =>
      prisma.order.delete({
        where: { id },
      })
    );
    await logAdminAction("ORDER_DELETE", `Deleted order ID: ${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete order ${id}:`, error);
    return { success: false, error: "Failed to delete order." };
  }
}

export async function getPaystackPublicKeyAction() {
  console.log("SERVER ACTION: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY =", process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);
  return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
}
