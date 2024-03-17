import { PrismaClient } from "@prisma/client";

export interface ProductProps{
    name?: string;
    price?: string;
    description?: string;
    categoryId?: string;
    quantity?: number;
    sizeId?: string;
    stock?: boolean;
    images?: string[]
}

class UpdateProductService {
  async execute(id: string, data: ProductProps) {
    const prisma = new PrismaClient();

    const product = await prisma.product.update({
      where: { id: id },
      data: data,
    });

    return product;
  }
}

export { UpdateProductService };