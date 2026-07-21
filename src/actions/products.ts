"use server";

import { prisma } from "@/lib/db";
import { Product } from "@/lib/products";
import { checkAdminAuthAction } from "./admin";
import { logAdminAction } from "./audit";

export async function queryWithRetry<T>(fn: () => Promise<T>, retries = 5, delay = 1000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      console.warn(`Database query failed (attempt ${i + 1}/${retries}). Retrying...`, err.message || err);
      try {
        await prisma.$disconnect();
      } catch (disconnectErr) {
        console.error("Failed to disconnect prisma client on error:", disconnectErr);
      }
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const whereClause = category ? { category } : {};
    const dbProducts = await queryWithRetry(() => 
      prisma.product.findMany({
        where: whereClause,
        orderBy: { id: 'asc' }, // Order by id to keep catalog presentation stable
      })
    );
    
    return dbProducts.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.image,
      isNew: p.isNew,
      description: p.description,
      details: p.details,
      images: p.images,
      sizes: p.sizes,
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const p = await queryWithRetry(() => 
      prisma.product.findUnique({
        where: { id },
      })
    );
    
    if (!p) return null;
    
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.image,
      isNew: p.isNew,
      description: p.description,
      details: p.details,
      images: p.images,
      sizes: p.sizes,
    };
  } catch (error) {
    console.error(`Failed to fetch product by id ${id}:`, error);
    return null;
  }
}

export interface ProductInput {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew: boolean;
  description: string;
  details: string[];
  images: string[];
  sizes: string[];
}

export async function createProductAction(input: ProductInput) {
  const isAdmin = await checkAdminAuthAction();
  if (!isAdmin) return { success: false, error: "Unauthorized" };

  try {
    const product = await queryWithRetry(() =>
      prisma.product.create({
        data: {
          id: input.id,
          name: input.name,
          price: input.price,
          category: input.category,
          image: input.image,
          isNew: input.isNew,
          description: input.description,
          details: input.details,
          images: input.images,
          sizes: input.sizes,
        },
      })
    );
    await logAdminAction("PRODUCT_CREATE", `Created product ${input.name} (ID: ${input.id}) with price ${input.price}`);
    return { success: true, product };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product in database." };
  }
}

export async function updateProductAction(id: string, input: ProductInput) {
  const isAdmin = await checkAdminAuthAction();
  if (!isAdmin) return { success: false, error: "Unauthorized" };

  try {
    const oldProduct = await getProductById(id);
    const product = await queryWithRetry(() =>
      prisma.product.update({
        where: { id },
        data: {
          id: input.id, // allow renaming ID
          name: input.name,
          price: input.price,
          category: input.category,
          image: input.image,
          isNew: input.isNew,
          description: input.description,
          details: input.details,
          images: input.images,
          sizes: input.sizes,
        },
      })
    );
    let details = `Updated product ${input.name} (ID: ${id}).`;
    if (oldProduct && oldProduct.price !== input.price) {
      details += ` Price changed from ${oldProduct.price} to ${input.price}.`;
      await logAdminAction("PRICE_CHANGE", details);
    } else {
      await logAdminAction("PRODUCT_UPDATE", details);
    }
    return { success: true, product };
  } catch (error) {
    console.error(`Failed to update product ${id}:`, error);
    return { success: false, error: "Failed to update product in database." };
  }
}

export async function deleteProductAction(id: string) {
  const isAdmin = await checkAdminAuthAction();
  if (!isAdmin) return { success: false, error: "Unauthorized" };

  try {
    await queryWithRetry(() =>
      prisma.product.delete({
        where: { id },
      })
    );
    await logAdminAction("PRODUCT_DELETE", `Deleted product ID: ${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete product ${id}:`, error);
    return { success: false, error: "Failed to delete product from database." };
  }
}

