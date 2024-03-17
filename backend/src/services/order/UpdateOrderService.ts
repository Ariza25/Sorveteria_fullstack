import { PrismaClient } from "@prisma/client";

class UpdateOrderService {
  async execute(id: string, status: boolean, deliveryStatus: boolean, deliveryStatusDone: boolean, finishOrder: boolean) {
    const prisma = new PrismaClient();

    const order = await prisma.order.update({
      where: { id },
      data: { 
        status,
        deliveryStatus,
        deliveryStatusDone,
        finishOrder,
        updated_at: new Date(),
      },
    });

    await prisma.$disconnect();

    return order;
  }
}

export { UpdateOrderService };