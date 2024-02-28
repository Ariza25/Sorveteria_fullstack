import {Request, Response} from "express";
import {CreateCategoryService} from "../../services/category/CreateCategoryService";

class CreateCategoryController{
    async handle(req: Request, res: Response){
        try{
            const {name} = req.body;

            const createCategoryService = new CreateCategoryService();
    
            const category = await createCategoryService.execute({name});
    
            return res.status(200).json({ message: "Category created successfully", category });
        }catch(err){
            return res.status(500).json((err as Error).message);
        
        }
    }
}

export {CreateCategoryController};