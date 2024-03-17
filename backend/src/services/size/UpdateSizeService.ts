import { PrismaClient } from "@prisma/client";

class UpdateSizeService {
  async execute(id: string, name: string) {
    const prisma = new PrismaClient();

    const size = await prisma.size.update({
      where: { id },
      data: { name },
    });

    return size;
  }
}

export { UpdateSizeService}