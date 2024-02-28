import { PrismaClient } from "@prisma/client";

class UpdateOrderService{
    async execute(id: string, status: boolean){
        const prisma = new PrismaClient();
    
        const order = await prisma.order.update({
            where: { id: id },
            data: { status: status }
        });
    
        return order;
    }
}

export { UpdateOrderService }