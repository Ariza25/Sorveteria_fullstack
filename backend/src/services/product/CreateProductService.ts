import { PrismaClient } from "@prisma/client";

interface ProductProps{
    name: string;
    price: string;
    description: string;
    categoryId: string;
    quantity: number;
    sizeId?: string;
    stock: boolean;
    images: string[]
}

class CreateProductService{
    async execute({name, price, quantity, description, categoryId, stock, sizeId, images}: ProductProps){
        const prisma = new PrismaClient();

        const product = await prisma.product.create({
            data:{
                name,
                price,
                description,
                quantity,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                size: {
                    connect: {
                        id: sizeId
                    }
                },
                stock,
                images,
            }
        })
        return product;
    }
}

export {CreateProductService}