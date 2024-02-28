import { PrismaClient } from "@prisma/client";

interface CategoryProps {
    id?: string;
    name: string;
    createAt?: Date;
    updatedAt?: Date;
}

class CreateCategoryService{
    async execute({name}: CategoryProps){
        const prisma = new PrismaClient();

        const category = await prisma.category.create({
            data:{
                name,
            }
        })
        return category;
    }
}

export {CreateCategoryService};