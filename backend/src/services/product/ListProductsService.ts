import { PrismaClient } from "@prisma/client";

class ListProductsService {
  async execute() {
    const prisma = new PrismaClient();

    const products = await prisma.product.findMany(
      {
        include: {
          category: true,
          size: true,
        }
      }
    );

    return products;
  }
}

export {ListProductsService}