import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {
        try {
            const { name, price, quantity, description, categoryId, sizeId, stock } = req.body;
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No files included in request" });
            }
            const images = (req.files as Express.Multer.File[]).map(file => file.path);
            console.log('Image paths:', images);

            if (!categoryId) {
                return res.status(400).json({ message: "Category ID is required" });
              }

            if(quantity !== undefined && quantity !== null && isNaN(quantity)){
                return res.status(400).json({ message: "Quantity must be a number" });
            }

            if(stock !== 'true' && stock !== 'false'){
                return res.status(400).json({ message: "Stock must be a boolean" });
            }

            const quantityNumber = parseInt(quantity, 10);
            const stockBoolean = stock === 'true';

            const createProductService = new CreateProductService();

            const product = await createProductService.execute({ name, price, quantity: quantityNumber, description, categoryId, sizeId, stock: stockBoolean, images });

            return res.status(200).json({ message: "Product created successfully", product });
        } catch (err) {
            return res.status(500).json((err as Error).message);
        }
    }
}

export { CreateProductController }