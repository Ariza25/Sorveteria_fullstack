import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CartContext, SelectedProduct } from "../../context/CartContext";
import { UserDataContext } from "../../context/DataUserContext";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import orderSuccess from "../../images/ordersucess.jpg";
import { api } from "../../services/axios";
import { Order } from "../../context/OrderContext";
import { OrderContext } from "../../context/OrderContext";

interface ShoppingResumeProps {
  handleFinishOrder?: (totalWithFreight: number) => Promise<void>;
  isModalOpen?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
}

const ShoppingResume: React.FC<ShoppingResumeProps> = ({
  handleFinishOrder,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { order } = useContext(OrderContext);
  const [subTotal, setSubTotal] = useState<string>("0");
  const [total, setTotal] = useState<string>("0");
  const [frete, setFrete] = useState<string>("0");
  const [orderId, setOrderId] = useState<string | Order>();

  const navigate = useNavigate();
  console.log(orderId)

  const { cart } = useContext(CartContext);
  const { userData } = useContext(UserDataContext);
  const location = useLocation();

  const hiddenPaths = ["/datauser", "/verification"];
  const hiddenPaths2 = ["/cart"];

  const handleFinishOrderWithFreight = async () => {
    if (handleFinishOrder) {
      const totalWithFreight = parseFloat(total) + parseFloat(frete);
      await handleFinishOrder(totalWithFreight);
    }
  };
  

  const getOrderID = async () => {
    try {
      const response = await api.get("/v1/api/orders", {});
      const lastOrderId = response.data[response.data.length - 1].id;
      setOrderId(lastOrderId);
      navigate("/trackorder");
      localStorage.setItem('lastOrderId', lastOrderId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.pathname === "/verification") {
      const city = userData.addressCity
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const frete = city === "cornelio procopio" ? 5.0 : 10.0;
      setFrete(frete.toString());
    }
  
    const newSubTotal = cart.reduce((acc: number, product: SelectedProduct) => {
      const price = parseFloat(product.price);
      return acc + price * product.selectedQuantity;
    }, 0);
    
    setSubTotal(newSubTotal.toString());
    
    const total = newSubTotal + parseFloat(frete);
    setTotal(total.toString());
    
    localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart, userData.addressCity, location.pathname, frete]);
    
    useEffect(() => {
      if (order.length > 0) {
        const total = parseFloat(order[order.length - 1].FinalPrice) + parseFloat(frete);
        setTotal(total.toString());
      }
    }, [cart, userData.addressCity, location.pathname, frete, order]);

  return (
    <>
      <div className="shadow-2xl bg-slate-50 w-[90%] h-[80vh] p-10 ms-28 rounded-lg ">
        <h2 className="font-bold mb-8 text-lg text-yellow-600 text-center">
          Resumo da Compra
        </h2>
        <div>
          <div className="flex justify-between py-4 border-y ">
            <h5 className="">Subtotal:</h5>
            <h5>R$ {subTotal},00</h5>
          </div>
          {!hiddenPaths2.includes(location.pathname) && (
            <div className="flex justify-between py-4 border-y ">
              <h5>Frete:</h5>
              <h5>R$ {frete},00</h5>
            </div>
          )}
        </div>
        <div className="flex justify-between py-4 border-y">
          <h5 className="font-semibold ">Total do Pedido:</h5>
          <h5>R$ {total},00</h5>
        </div>
        <div className="mt-10">
          {!hiddenPaths.includes(location.pathname) && (
            <Link
              to="/datauser"
              className="flex rounded bg-red-700 hover:bg-red-600 text-slate-100 p-2.5 font-semibold"
            >
              <p className="w-[100%] text-center">Continuar Compra</p>
            </Link>
          )}
        </div>

        <Modal
          isOpen={isModalOpen || false}
          onRequestClose={() => { setIsModalOpen && setIsModalOpen(false); }}
          contentLabel="Order Confirmation"
          style={{
            content: {
              width: '60%',
              height: '75%',
              margin: '0 auto',
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            }
          }}
        >
          <div className="w-[100%] flex flex-col items-center border-red-800 border-y-2 border-x-2">
            <div className="ms-6 w-[25%]">
              <img src={orderSuccess} />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-red-600 font-semibold text-2xl mt-4">Order Confirmation</h2>
              <p>Your order has been placed successfully!</p>
              <button
                className=" bg-red-700 hover:bg-red-600 text-slate-100 p-2 w-[10rem] font-semibold rounded-md  mt-4"
                onClick={() => {
                  setIsModalOpen && setIsModalOpen(false);
                  navigate("/");
                }}
              >
                Close
              </button>
              <button onClick={getOrderID} className="pt-4 pb-6 underline font-semibold text-yellow-600">Acompanhe seu pedido</button>
            </div>
          </div>
        </Modal>

        {!hiddenPaths2.includes(location.pathname) && (
          <Link to="/verification">
            <div>
              <button
                onClick={handleFinishOrderWithFreight}
                className="rounded bg-red-700 hover:bg-red-600 text-slate-100 p-2.5 w-full font-semibold"
              >
                Fechar Pedido
              </button>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default ShoppingResume;
