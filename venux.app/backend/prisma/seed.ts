import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding 30 products...");
  const types = ["Colar", "Anel", "Brinco", "Pulseira"];
  for (let i = 0; i < 30; i++) {
    const type = types[i % types.length];
    const p = await prisma.product.create({
      data: {
        name: `${type} Artesanal ${i + 1}`,
        slug: `${type.toLowerCase()}-artesanal-${i + 1}`,
        description: `Peça ${type.toLowerCase()} feita à mão, design exclusivo.`,
        price: Math.round((30 + Math.random() * 120) * 100) / 100,
      },
    });

    await prisma.productImage.create({
      data: {
        productId: p.id,
        url: `/imagens/${type.toLowerCase()}1_prata.svg`,
        alt: p.name,
        position: 0,
      },
    });
    await prisma.productVariant.create({
      data: {
        productId: p.id,
        material: "prata",
        additionalPrice: 0,
        stock: 20,
      },
    });
    await prisma.productVariant.create({
      data: {
        productId: p.id,
        material: "dourado",
        additionalPrice: 12,
        stock: 15,
      },
    });
  }
  console.log("Seed finished");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
