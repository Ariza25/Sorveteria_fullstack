// DeleteOrderService.ts

import { PrismaClient, Prisma } from "@prisma/client";

class DeleteOrderService {
  private prisma = new PrismaClient();

  async execute(orderId: string, productIds: string[]) {
    // Delete all associated OrderProduct first
    for (const productId of productIds) {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error(`Product with ID ${productId} does not exist.`);
      }

      // Delete the OrderProduct relation
      await this.prisma.orderProduct.deleteMany({
        where: {
          productId: productId,
          orderId: orderId
        }
      });
    }

    // Then delete the order
    const order = await this.prisma.order.delete({
      where: {
        id: orderId
      }
    });

    return order;
  }
}

export { DeleteOrderService };