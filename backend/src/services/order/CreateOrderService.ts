// CreateOrderService.ts

import { PrismaClient } from "@prisma/client";

interface ProductProps {
  productId: string;
  productName: string;
  quantityBought: number;
  UnityPrice: string;
  UnitySubTotalPrice: string;
  FinalPrice: string;
}

interface OrderProps {
  fullName: string;
  phone: string;
  address: string;
  addressNumber: number;
  addressDistrict: string;
  addressCity: string;
  complement?: string;
  paymentMethod: string;
  cpf?: string;
  status: boolean;
  products: ProductProps[];
}

class CreateOrderService {
  private prisma = new PrismaClient();

  async execute(orderProps: OrderProps) {
    if (!Array.isArray(orderProps.products)) {
      throw new Error("Products must be an array");
    }

    const order = await this.prisma.order.create({
      data: {
        ...orderProps,
        products: {
          create: orderProps.products.map(product => ({
            product: {
              connect: {
                id: product.productId
              },
            },
            productName: product.productName,
            quantityBought: product.quantityBought,
            UnityPrice: product.UnityPrice,
            UnitySubTotalPrice: product.UnitySubTotalPrice,
            FinalPrice: product.FinalPrice
          }))
        }
      },
      include: {
        products: true
      }
    });

    return order;
  }
}

export { CreateOrderService };