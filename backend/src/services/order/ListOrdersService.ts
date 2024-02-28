import { PrismaClient } from "@prisma/client";

class ListOrdersService {
    async execute() {
        const prisma = new PrismaClient();

        const orders = await prisma.order.findMany({
            include: {
                products: {}
            }
        });

        return orders;
    }
}

export { ListOrdersService };