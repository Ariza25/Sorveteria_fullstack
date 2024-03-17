import {Request, Response} from "express"
import { DeleteProductService } from "../../services/product/DeleteProductService"

class DeleteProductController{
    async handle(req: Request, res: Response){
        try{
            const { id } = req.params;
            const deleteProductService = new DeleteProductService();
            const product = await deleteProductService.execute(id as string)
            return res.status(200).json({ message: "Product deleted successfully", product });
        }catch(err){
            return res.status(500).json((err as Error).message)
        }
    }
}

export {DeleteProductController}