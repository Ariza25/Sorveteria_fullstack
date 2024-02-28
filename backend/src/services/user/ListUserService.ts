import { PrismaClient } from "@prisma/client";

class ListUserService {
  async execute() {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany();

    return users;
  }
}

export {ListUserService}