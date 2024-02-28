import { PrismaClient } from "@prisma/client"

interface CreateSizeProps{
    id: string
    name: string
    created_at: string
    updated_at: string
}

class CreateSizeService {
  async execute({id, name}: CreateSizeProps) {
    const prisma = new PrismaClient();

    const size = await prisma.size.create({
      data: {
        id,
        name,
      },
    });

    return size;
  }
}

export { CreateSizeService}