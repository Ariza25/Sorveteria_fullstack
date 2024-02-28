// CreateOrderController.ts

import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/order/CreateOrderService';

class CreateOrderController {
  async handle(request: Request, response: Response) {
    const orderProps = request.body;

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute(orderProps);

    return response.json(order);
  }
}

export { CreateOrderController };