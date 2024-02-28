import { PrismaClient } from "@prisma/client";

class DeleteCategoryService{
    async execute(id: string){
        const prisma = new PrismaClient();

        const category = await prisma.category.delete({
            where:{
                id: id
            }
        })
        return category;
    }
}

export {DeleteCategoryService};