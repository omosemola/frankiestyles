"use server";

import { checkAdminAuthAction } from "@/actions/admin";
import { getAdminOrders } from "@/actions/orders";
import { getAdminConsultations } from "@/actions/consultation";
import { getProducts } from "@/actions/products";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminPage() {
  const isAuth = await checkAdminAuthAction();
  if (!isAuth) {
    redirect("/admin/login");
  }

  // Fetch initial data for dashboard workspaces
  const productsData = await getProducts();
  const ordersResponse = await getAdminOrders();
  const consultationsResponse = await getAdminConsultations();

  const orders = ordersResponse.success ? ordersResponse.orders || [] : [];
  const consultations = consultationsResponse.success ? consultationsResponse.consultations || [] : [];

  return (
    <AdminDashboardClient
      initialProducts={productsData}
      initialOrders={orders}
      initialConsultations={consultations}
    />
  );
}
