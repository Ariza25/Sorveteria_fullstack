import { PrismaClient } from "@prisma/client";

class UpdateCategoryService {
  async execute(id: string, name: string) {
    const prisma = new PrismaClient();

    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return category;
  }
}

export { UpdateCategoryService}