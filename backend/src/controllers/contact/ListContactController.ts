import {Request, Response} from "express"
import {ListContactService} from "../../services/contact/ListContactService";

class ListContactController {
    async handle(request: Request, response: Response) {
        try{
            const listContactService = new ListContactService();

            const contacts = await listContactService.execute();

            return response.status(200).json(contacts);
        }catch(err){
            console.log(err);
        }
    }
}

export {ListContactController}