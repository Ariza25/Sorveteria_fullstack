import {Request, Response} from 'express';
import { UpdateProductService } from '../../services/product/UpdateProductService';
import { ProductProps } from '../../services/product/UpdateProductService';

class UpdateProductController {
    async handle(req: Request, res: Response){
        try{
            const {id} = req.params;
            let {name, price, description, categoryId, quantity, sizeId, stock, images} = req.body;

            if (stock !== undefined) stock = stock === 'true';
            if (quantity !== undefined) quantity = Number(quantity);
    
            const data: Partial<ProductProps> = {};
            if (name !== undefined) data.name = name;
            if (price !== undefined) data.price = price;
            if (description !== undefined) data.description = description;
            if (categoryId !== undefined) data.categoryId = categoryId;
            if (quantity !== undefined) data.quantity = quantity;
            if (sizeId !== undefined) data.sizeId = sizeId;
            if (stock !== undefined) data.stock = stock;
            if (images !== undefined) data.images = images;
            
            const updateProductService = new UpdateProductService();
            
            const product = await updateProductService.execute(id, data);
            
            return res.status(200).json(product);
        }catch(err){
            if (err instanceof Error) {
                return res.status(400).json({error: err.message});
            }
        }
    }
}

export {UpdateProductController}