// ratingController.ts
import { Request, Response } from "express";
import {CreateRatingService} from "../../services/rating/CreateRatingService";

class CreateRatingController {
  async handle(request: Request, response: Response) {
    const { userId, productId, starValue } = request.body;

    const createRatingService = new CreateRatingService();

    const rating = await createRatingService.execute(userId, productId, starValue);

    return response.status(200).json(rating);
  }
}

export {CreateRatingController};