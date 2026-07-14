"use server";

import { prisma } from "@/lib/db";
import { Product } from "@/lib/products";

async function queryWithRetry<T>(fn: () => Promise<T>, retries = 3, delay = 500): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      console.warn(`Database query failed (attempt ${i + 1}/${retries}). Retrying...`, err.message || err);
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
