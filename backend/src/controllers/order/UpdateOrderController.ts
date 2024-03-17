import { Request, Response } from "express";
import { UpdateOrderService } from "../../services/order/UpdateOrderService";
import { ObjectId } from "mongodb";

class UpdateOrderController {
  async handle(req: Request, res: Response) {
    const { id } = req.query;
    const { status } = req.body;
    const { deliveryStatus } = req.body;
    const { finishOrder } = req.body;
    const { deliveryStatusDone } = req.body;

    if (!ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const updateOrderService = new UpdateOrderService();

    try {
      const order = await updateOrderService.execute(id as string, status, deliveryStatus, deliveryStatusDone, finishOrder);
      return res.json(order);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}

export { UpdateOrderController };