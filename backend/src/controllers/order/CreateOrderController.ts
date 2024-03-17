import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
  async handle(request: Request, response: Response) {
    const { 
      fullName, 
      phone, 
      address, 
      addressNumber, 
      addressDistrict, 
      addressCity, 
      complement, 
      paymentMethod, 
      cpf, 
      status, 
      products, 
      FinalPrice,
      deliveryStatus,
      deliveryStatusDone,
      finishOrder,
    } = request.body;

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute({
      fullName, 
      phone, 
      address, 
      addressNumber, 
      addressDistrict, 
      addressCity, 
      complement, 
      paymentMethod, 
      cpf, 
      status: true, 
      products, 
      FinalPrice,
      deliveryStatus: false,
      deliveryStatusDone: false,
      finishOrder: false
    });

    return response.json(order);
  }
}

export { CreateOrderController };