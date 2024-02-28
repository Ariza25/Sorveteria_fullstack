import {Request, Response} from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController{
    async handle(req: Request, res: Response){

        try{
            const {name, email, password, confirmPassword} = req.body;

            const createUserService = new CreateUserService();
            const user = await createUserService.execute({name, email, password, confirmPassword});
    
            const userResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
            };
            console.log(userResponse)

            return res.status(200).json({ message: "User created successfully", user: userResponse});
        }catch(error){
            return res.status(500).json({ error: 'An error occurred while creating user.', details: error });
        }
    }
}

export {CreateUserController}