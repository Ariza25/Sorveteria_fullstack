import {Request, Response} from 'express';
import {DeleteCategoryService} from '../../services/category/DeleteCategoryService';

class DeleteCategoryController{
    async handle(req: Request, res: Response){
        try{
            const {id} = req.params;

            const deleteCategoryService = new DeleteCategoryService();
            const category = await deleteCategoryService.execute(id as string);

            return res.status(200).json({ message: "Category deleted successfully", category });
        }catch(err){
            return res.status(500).json((err as Error).message);
        }
    }
}

export {DeleteCategoryController};