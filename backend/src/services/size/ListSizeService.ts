import { PrismaClient } from "@prisma/client";

class ListSizeService{
    async execute(){
        const prisma = new PrismaClient();

        const sizes = await prisma.size.findMany();

        return sizes;
    }
}

export {ListSizeService}