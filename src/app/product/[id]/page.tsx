import { notFound } from 'next/navigation';
import { DUMMY_PRODUCTS } from '@/lib/products';
import { ProductDetailClient } from '@/components/shop/ProductDetailClient';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return DUMMY_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = DUMMY_PRODUCTS.find((p) => p.id === id);
  
  if (!product) {
    return {
      title: 'Product Not Found | Frankie Styles',
    };
  }

  return {
    title: `${product.name} | Frankie Styles`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = DUMMY_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
