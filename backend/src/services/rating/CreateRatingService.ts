import { PrismaClient } from "@prisma/client";

class CreateRatingService {
  async execute(userId: string, productId: string, ratingValue: number) {
    const prisma = new PrismaClient();

    const rating = await prisma.ratingOnProduct.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
        rating: { create: { starValue: ratingValue } },
      },
    });

    return rating;
  }
}

export {CreateRatingService};