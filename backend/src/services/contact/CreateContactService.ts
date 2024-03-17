import { PrismaClient } from "@prisma/client";

interface ContactProps{
    name: string;
    email: string;
    message: string;
}

class CreateContactService {
  async execute(data: ContactProps) {
    const prisma = new PrismaClient();

    const contact = await prisma.contact.create({
      data,
    });

    return contact;
  }
}

export { CreateContactService}