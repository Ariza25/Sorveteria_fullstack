import {Request, Response} from 'express';
import { UpdateOrderService } from '../../services/order/UpdateOrderService';

class UpdateOrderController{
    async handle(req: Request, res: Response){
        const { id, status } = req.body;

        const updateOrderService = new UpdateOrderService();

        const order = await updateOrderService.execute(id, status);

        return res.status(200).json(order);
    }
}

export {UpdateOrderController}