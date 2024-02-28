import {Request, Response} from 'express';
import {ListCategoryService} from '../../services/category/ListCategoriesService';

class ListCategoryController{
    async handle (req: Request, res: Response){
        try{
            const listCategoryService = new ListCategoryService();

            const categories = await listCategoryService.execute();
    
            return res.status(200).json({ message: "Categories listed successfully", categories });
        }catch(err){
            return res.status(500).json((err as Error).message);
        }
    }
}

export {ListCategoryController}