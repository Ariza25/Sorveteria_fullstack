import { PrismaClient } from "@prisma/client";

class ListCategoryService {
    async execute(){
        const prisma = new PrismaClient();

        const categories = await prisma.category.findMany();

        return categories;
    }
}

export { ListCategoryService }