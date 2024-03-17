// DeleteOrderController.ts

import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

class DeleteOrderController {
    async handle(request: Request, response: Response) {
        const { orderId } = request.params;
        const productIds = request.body.productIds;

        const deleteOrderService = new DeleteOrderService();

        try {
            const order = await deleteOrderService.execute(orderId, productIds);
            return response.json(order);
        } catch (error) {
            return response.status(500).json({ error: (error as Error).message });
        }
    }
}

export { DeleteOrderController };