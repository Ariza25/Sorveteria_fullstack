import { useState, useEffect, useCallback, useContext } from "react";
import { Order } from "../../context/OrderContext";
import Modal from "react-modal";
import { api } from "../../services/axios";
import { toast, ToastContainer } from "react-toastify";
import { OrderContext } from "../../context/OrderContext";
import { TbTruckDelivery } from "react-icons/tb";


const PedidosFinalizados = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [ordersDone, setOrdersDone] = useState<Order[]>([]);
  const [statusDone, setStatusDone] = useState<boolean>(false);
  console.log(statusDone)

  const { addFinishedOrder } = useContext(OrderContext);

  const notifySucess = () => {
    toast.success("Pedido entregue com sucesso!", {
      autoClose: 1000,
    });
  }

  const notifyError = () => {
    toast.error("Erro ao entregar o Pedido!", {
      autoClose: 1000,
    });
  }

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
  };

  const getOrdersDone = async () => {
    try {
      const response = await api.get("v1/api/orders");
      const ordersDone = response.data.filter(
        (order: Order) => order.deliveryStatus === true 
      );
      setOrdersDone(ordersDone);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatusToDeliveryDone = useCallback(
    async (order: { id: string }) => {
      const { id } = order;

      try {
        const response = await api.put(`http://localhost:3333/v1/api/order?id=${id}`, { deliveryStatus: false, deliveryStatusDone: true });
        console.log('API response:', response);
      } catch (err){
        console.log('API error:', err);
      }
    },
    []
  );

  const handleStatusDone = useCallback(
    async (order: Order | null) => {
      try{
        if (order) {
          await updateStatusToDeliveryDone(order);
          addFinishedOrder(order);
          setStatusDone(prevStatus => !prevStatus);
        }
      }catch(err){
        notifyError();
        console.log(err);
      }
    },
    [addFinishedOrder, updateStatusToDeliveryDone]
  );

  useEffect(() => {
    getOrdersDone();
  }, []);

  return (
    <>
    <ToastContainer/>
      <main className="flex flex-col py-10 px-10 w-full">
        <div className="pb-8">
          <h2 className="text-yellow-600 font-semibold text-3xl border-b">
            Pedidos a Caminho
          </h2>
        </div>
        <div className="flex justify-between text-sm">
          <h5 className="ms-6 w-[32rem]">
            <i>Nome do Pedido</i>
          </h5>
          <h5 className="w-[18rem]">
            <i>Método de Pagamento</i>
          </h5>
          <h5 className="w-[10rem]">
            <i>Valor Total do Pedido</i>
          </h5>
        </div>

        {ordersDone
          .filter((order) => order.deliveryStatus === true)
          .map((order) => (
            <div
              key={order.id}
              onClick={() => handleOpenModal(order)}
              className="mt-4 items-center flex justify-between border p-6 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer"
            >
              <div className="flex gap-4 items-center">
              <TbTruckDelivery size={25} />
                <div className="flex gap-28">
                  <p className="w-[17rem]">{order.fullName}</p>
                  <p className="w-[9rem]">{order.paymentMethod}</p>
                  <p className="w-[8rem]">R$ {order.FinalPrice}</p>
                </div>
              </div>
            </div>
          ))}

        <div>
          <Modal
            isOpen={!!selectedOrder}
            onRequestClose={() => setSelectedOrder(null)}
            contentLabel="Order Confirmation"
            style={{
              content: {
                width: "90%",
                height: "80%",
                margin: "0 auto",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              },
            }}
          >
            <div className="w-[100%] flex flex-col items-center border-red-800 border-y-2 border-x-2 px-10">
              <div className="flex justify-center w-[100%] mt-6 pb-6 text-yellow-600 font-semibold text-2xl border-b">
                Informações do Pedido
              </div>
              <div className="flex col-span-3 items-start w-[100%] justify-around my-6 border-b">
                <div>
                  <h2 className="font-bold mb-4">Cliente:</h2>
                  <p>
                    <b className="font-semibold">Nome Completo:</b>{" "}
                    {selectedOrder?.fullName};
                  </p>
                  <p>
                    <b className="font-semibold">Contato:</b>{" "}
                    {selectedOrder?.phone};
                  </p>
                  <p>
                    <b className="font-semibold">Endereço:</b>{" "}
                    {selectedOrder?.address};
                  </p>
                  <p>
                    <b className="font-semibold">Nº:</b>{" "}
                    {selectedOrder?.addressNumber};
                  </p>
                  <p>
                    <b className="font-semibold">Bairro:</b>{" "}
                    {selectedOrder?.addressDistrict};
                  </p>
                  <p>
                    <b className="font-semibold">Cidade:</b>{" "}
                    {selectedOrder?.addressCity};
                  </p>
                  <p>
                    <b className="font-semibold">Complemento:</b>{" "}
                    {selectedOrder?.complement};
                  </p>
                </div>
                <div>
                  <h2 className="font-bold mb-4">Pagamento:</h2>
                  <p>
                    <b className="font-semibold">Método de Pagamento:</b>{" "}
                    {selectedOrder?.paymentMethod};
                  </p>
                  <p>
                    <b className="font-semibold">CPF na nota:</b>{" "}
                    {selectedOrder?.cpf};
                  </p>
                </div>
                <div>
                  <h2 className="font-bold">Produto:</h2>
                  {selectedOrder?.products.map((product, index) => (
                    <div key={index} className="mb-4 mt-4">
                      <p>
                        <b className="font-semibold">Nome do Produto:</b>{" "}
                        {product.productName}
                      </p>
                      <p>
                        <b className="font-semibold">Quantidade:</b>{" "}
                        {product.quantityBought}
                      </p>
                      <p>
                        <b className="font-semibold">Preço Unitário:</b>{" "}
                        {product.UnityPrice}
                      </p>
                      <p>
                        <b className="font-semibold">SubTotal:</b>{" "}
                        {product.UnitySubTotalPrice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p>
                Valor total do pedido: <b>R$ {selectedOrder?.FinalPrice}</b>
              </p>
              <small>Pedido finalizado em: {new Date((selectedOrder as Order)?.updated_at).toLocaleString()}</small>

              <button
                className="bg-red-600 hover:bg-red-500 mb-6 text-white px-4 py-2 rounded-lg mt-4"
                onClick={() => {
                  setStatusDone(true);
                  notifySucess();
                  if (selectedOrder) {
                    handleStatusDone(selectedOrder);
                  }
                  setSelectedOrder(null);
                }}
              >
                Entrega realizada
              </button>

            </div>
          </Modal>
        </div>
      </main>
    </>
  );
};

export default PedidosFinalizados;
