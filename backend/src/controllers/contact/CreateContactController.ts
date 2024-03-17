import {Request, Response} from "express";
import {CreateContactService} from "../../services/contact/CreateContactService";

class CreateContactController {
    async handle(request: Request, response: Response) {
        try{
            const {name, email, message} = request.body;

            const createContactService = new CreateContactService();
    
            const contact = await createContactService.execute({
                name,
                email,
                message
            });
    
            return response.status(200).json(contact);
        }catch(err){
            console.log(err);
        }
    }
}

export {CreateContactController}