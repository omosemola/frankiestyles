import 'dotenv/config';
import { prisma } from '../src/lib/db';
import { DUMMY_PRODUCTS } from '../src/lib/products';

async function main() {
  console.log('Seeding products database...');
  for (const product of DUMMY_PRODUCTS) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        isNew: product.isNew ?? false,
        description: product.description,
        details: product.details,
        images: product.images,
        sizes: product.sizes,
      },
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        isNew: product.isNew ?? false,
        description: product.description,
        details: product.details,
        images: product.images,
        sizes: product.sizes,
      },
    });
  }
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
