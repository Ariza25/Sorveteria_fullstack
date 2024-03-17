import { PrismaClient } from "@prisma/client";

class ListContactService {
  async execute() {
    const prisma = new PrismaClient();

    const contacts = await prisma.contact.findMany();

    return contacts;
  }
}

export { ListContactService}