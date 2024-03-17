import {Request, Response} from 'express';
import { DeleteSizeService } from '../../services/size/DeleteSizeService';

class DeleteSizeController{
    async handle(req: Request, res: Response){
        try{
            const { id } = req.params;
            const deleteSizeService = new DeleteSizeService();

            await deleteSizeService.execute(id as string);
    
            return res.status(200).json({ message: "Size deleted successfully" });
        }catch(err){
            return res.status(500).json((err as Error).message)
        }
    }
}

export {DeleteSizeController}