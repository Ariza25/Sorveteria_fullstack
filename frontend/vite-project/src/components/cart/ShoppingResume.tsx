import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CartContext, SelectedProduct } from "../../context/CartContext";
import { UserDataContext } from "../../context/DataUserContext";

export interface ShoppingResumeProps {
  handleFinishOrder?: () => Promise<void>;
}

const ShoppingResume: React.FC<ShoppingResumeProps> = ({
  handleFinishOrder,
}) => {
  const [subTotal, setSubTotal] = useState<string>("0");
  const [total, setTotal] = useState<string>("0");
  const [frete, setFrete] = useState<string>("0");

  const { cart } = useContext(CartContext);
  const { userData } = useContext(UserDataContext);
  const location = useLocation();

  const hiddenPaths = ["/datauser", "/verification"];
  const hiddenPaths2 = ["/cart"];

  useEffect(() => {
    const city = userData.addressCity
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const frete = city === "cornelio procopio" ? 5.0 : 10.0;
    setFrete(frete.toString());

    const newSubTotal = cart.reduce((acc: number, product: SelectedProduct) => {
      const price = parseFloat(product.price);
      return acc + price * product.selectedQuantity;
    }, 0);

    setSubTotal(newSubTotal.toString());

    const total = newSubTotal + frete;
    setTotal(total.toString());
  
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, userData.addressCity]);

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

        {!hiddenPaths2.includes(location.pathname) && (
          <Link to="/verification">
            <div>
              <button
                onClick={handleFinishOrder}
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
