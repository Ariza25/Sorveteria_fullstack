import { createContext, useState } from 'react';

export interface Order {
    id: string;
    fullName: string;
    phone: string;
    address: string;
    addressNumber: number;
    addressDistrict: string;
    addressCity: string;
    complement: string;
    cpf: string;
    paymentMethod: string;
    status: boolean;
    FinalPrice: string;
    deliveryStatus: boolean;
    deliveryStatusDone: boolean;
    finishOrder: boolean;
    created_at: Date | string;
    updated_at: Date | string;
  
    products: [
      {
        productName: string;
        productId: string;
        quantityBought: number;
        UnityPrice: number;
        UnitySubTotalPrice: number;
      }
    ];
  }

export interface OrderContextData {
  finishedOrders: Order[];
  order: Order[];
  addFinishedOrder: (order: Order) => void;
  removeOrder: (id: string) => void;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

interface ProductProviderProps {
    children: React.ReactNode;
  }

const OrderProvider = ({ children }: ProductProviderProps) => {
  const [finishedOrders, setFinishedOrders] = useState<Order[]>([]);
  const [order] = useState<Order[]>([]);

  const addFinishedOrder = (order: Order) => {
    setFinishedOrders([...finishedOrders, order]);
  };

  const removeOrder = (orderId: string) => {
    console.log(`Attempting to remove order with id: ${orderId}`);
    
    const orderToRemove = finishedOrders.find((order) => order.id === orderId);
    
    if (!orderToRemove) {
      console.log(`Order with id: ${orderId} not found`);
      throw new Error('Order not found');
    }
    
    console.log(`Order found: `, orderToRemove);
    
    const productIdsToRemove = orderToRemove.products?.map((product) => product.productId);
    
    if (!productIdsToRemove || !Array.isArray(productIdsToRemove)) {
      console.log('Product IDs not found or not iterable');
      return;
    }
    
    console.log(`Product IDs to remove: `, productIdsToRemove);
    
    const updatedOrders = finishedOrders.filter(order => order.id !== orderId);
    setFinishedOrders(updatedOrders);
    console.log(`Updated orders: `, updatedOrders);
  }

  return (
    <OrderContext.Provider value={{ finishedOrders, addFinishedOrder, removeOrder, order }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };