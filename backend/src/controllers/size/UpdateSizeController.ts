import {Request, Response} from "express"
import { UpdateSizeService } from "../../services/size/UpdateSizeService";

class UpdateSizeController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    const updateSizeService = new UpdateSizeService();

    const size = await updateSizeService.execute(id, name);

    return response.json(size);
  }
}

export { UpdateSizeController}