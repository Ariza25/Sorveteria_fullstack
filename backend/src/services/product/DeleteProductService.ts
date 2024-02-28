import { PrismaClient } from "@prisma/client";

class DeleteProductService {
  async execute(id: string) {
    const prisma = new PrismaClient();

    const product = await prisma.product.delete({
      where: {
        id: id
      }
    });

    return product;
  }
}

export { DeleteProductService }