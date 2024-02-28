import { PrismaClient } from "@prisma/client";

class DeleteSizeService{
    async execute(id: string){
        const prisma = new PrismaClient();

        const size = await prisma.size.delete({
            where:{
                id
            }
        })

        return size;
    }
}

export {DeleteSizeService}