import {Request, Response} from "express";
import { ListSizeService } from "../../services/size/ListSizeService";

class ListSizeController{
    async handle(req: Request, res: Response){
        try{
            const listSizeService = new ListSizeService();

            const sizes = await listSizeService.execute();
    
            return res.status(200).json({ message: "Sizes listed successfully", sizes });
        }catch(err){
            return res.status(500).json((err as Error).message)
        }
    }
}

export {ListSizeController}