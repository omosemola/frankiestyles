import { notFound } from 'next/navigation';
import { getProducts, getProductById } from '@/actions/products';
import { ProductDetailClient } from '@/components/shop/ProductDetailClient';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  
  if (!product) {
    return {
      title: 'Product Not Found | Frankie Styles',
    };
  }

  return {
    title: `${product.name} | Frankie Styles`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Frankie Styles - Bespoke Traditional Luxury`,
      description: product.description,
      type: 'website',
      url: `/product/${product.id}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 1067,
          alt: product.name,
        }
      ],
      siteName: 'Frankie Styles',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Frankie Styles`,
      description: product.description,
      images: [product.image],
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'NGN',
      'product:category': product.category,
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
