import {Request, Response} from 'express'
import { ListProductsService } from '../../services/product/ListProductsService'

class ListProductController{
    async handle(req: Request, res: Response){
        try{
            const listProductsService = new ListProductsService()
            const products = await listProductsService.execute()
            return res.status(200).json({ message: "Products listed successfully", products });
        }catch(err){
            return res.status(500).json((err as Error).message)
        }
    }
}

export {ListProductController}