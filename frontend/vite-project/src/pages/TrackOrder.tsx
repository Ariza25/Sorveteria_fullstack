import { IoIosBusiness } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { FaHouseUser } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";
import { api } from "../services/axios";
import { useEffect, useState } from "react";
import { Order } from "../context/OrderContext";

const TrackOrder = () => {
  const [orderStatus, setOrderStatus] = useState<Order[]>([]);

  const getOrderStatus = async () => {
    const response = await api.get("/v1/api/orders");
    console.log(response.data[response.data.length - 1].id);
    setOrderStatus(response.data);
  };

  useEffect(() => {
    getOrderStatus();
  }, []);

  return (
    <main className="px-20 pb-20">
      <div className="text-yellow-600 font-semibold text-2xl my-10">
        <h2>Acompanhe seu pedido:</h2>
        {orderStatus.length > 0 && (
          <h5 className="text-lg">
            Código do pedido:{" "}
            {orderStatus[orderStatus.length - 1].id.toString().slice(-6)}
          </h5>
        )}
      </div>
      <ol className="items-center sm:flex sm:flex-wrap sm:justify-between">
        <li className="relative mb-6 sm:mb-0 sm:w-1/4">
          <div className="flex items-center">
            <div
              className={`text-lg font-semibold rounded-full p-1 ${
                orderStatus[orderStatus.length - 1]?.status === true
                  ? "bg-red-700"
                  : "bg-gray-700"
              }`}
            >
              <IoIosBusiness size={40} className="text-slate-50 p-1" />
            </div>
            <div
              className={`hidden sm:flex w-full h-0.5 ${
                orderStatus[orderStatus.length - 1]?.status === true
                  ? "bg-red-700"
                  : "bg-gray-700"
              }`}
            ></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3
              className={`text-lg font-semibold ${
                orderStatus[orderStatus.length - 1]?.status === true
                  ? "text-red-700"
                  : "text-gray-700"
              }`}
            >
              Pedido Recebido
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              10 de Dezembro de 2021
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              O Pedido está sendo preparado pela loja e já já está a caminho!
            </p>
          </div>
        </li>

        <li className="relative mb-6 sm:mb-0 sm:w-1/4">
          <div className="flex items-center">
            <div
              className={`text-lg font-semibold rounded-full p-1 ${
                orderStatus[orderStatus.length - 1]?.deliveryStatus === true
                  ? "bg-red-700"
                  : "bg-gray-700"
              }`}
            >
              <TbTruckDelivery size={40} className="text-slate-50 p-1" />
            </div>
            <div
              className={`hidden sm:flex w-full h-0.5 ${
                orderStatus[orderStatus.length - 1]?.deliveryStatus === true
                  ? "bg-red-700"
                  : "bg-gray-700"
              }`}
            ></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3
              className={`text-lg font-semibold ${
                orderStatus[orderStatus.length - 1]?.deliveryStatus === true
                  ? "text-red-700"
                  : "text-gray-700"
              }`}
            >
              Pedido Saiu para Entrega
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on December 2, 2021
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              O pedido está a caminho do seu endereço.
            </p>
          </div>
        </li>

        <li className="relative mb-6 sm:mb-0 sm:w-1/4">
          <div className="flex items-center">
            <div
              className={`text-lg font-semibold rounded-full p-1 ${
                orderStatus[orderStatus.length - 1]?.finishOrder === false && orderStatus[orderStatus.length - 1]?.deliveryStatusDone === true 
                  ? "bg-red-700"
                  : "bg-gray-700"
              }`}
            >
              <FaHouseUser size={40} className="text-slate-50 p-1" />
            </div>
            <div
              className={`hidden sm:flex w-full h-0.5 ${
                orderStatus[orderStatus.length - 1]?.finishOrder === false && orderStatus[orderStatus.length - 1]?.deliveryStatusDone === true 
                  ? "bg-red-700"
                  : "bg-gray-700"
              }`}
            ></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3
              className={`text-lg font-semibold ${
                orderStatus[orderStatus.length - 1]?.finishOrder === false && orderStatus[orderStatus.length - 1]?.deliveryStatusDone === true 
                  ? "text-red-700"
                  : "text-gray-700"
              }`}
            >
              Pedido Entregue
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on December 2, 2021
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              O pedido já foi entregue. Agora é só aproveitar!
            </p>
          </div>
        </li>

        <li className="relative mb-6 sm:mb-0 sm:w-1/4">
          <div className="flex items-center">
            <div
              className={`text-lg font-semibold rounded-full p-1 ${
                orderStatus[orderStatus.length - 1]?.finishOrder === true
                  ? "bg-red-700"
                  : "bg-gray-700"
              }`}
            >
              <LuFileSpreadsheet size={40} className="text-slate-50 p-1" />
            </div>
            <div
              className={`hidden sm:flex w-full h-0.5 ${
                orderStatus[orderStatus.length - 1]?.finishOrder === true
                  ? "bg-red-700"
                  : "bg-gray-700"
              }`}
            ></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3
              className={`text-lg font-semibold ${
                orderStatus[orderStatus.length - 1]?.finishOrder === true
                  ? "text-red-700"
                  : "text-gray-700"
              }`}
            >
              Pedido Finalizado
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on December 2, 2021;
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Obrigado por comprar com a gente. Te esperamos em breve!
            </p>
          </div>
        </li>
      </ol>
    </main>
  );
};

export default TrackOrder;
