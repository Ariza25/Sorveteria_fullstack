import {Request, Response} from "express";
import { CreateSizeService } from "../../services/size/CreateSizeService"

class CreateSizeController{
    async handle(request: Request, response: Response){
        const {id, name, updated_at, created_at} = request.body;

        const sizeService = new CreateSizeService();

        try {
            const size = await sizeService.execute({id, name, updated_at, created_at});
            return response.status(200).json({ message: 'Size created successfully', size });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'An error occurred while creating the size.', details: error });
        }
    }
}

export {CreateSizeController}