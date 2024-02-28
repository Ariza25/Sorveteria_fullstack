import { useContext } from "react";
import { CartContext, SelectedProduct } from "../../context/CartContext";
import { Link } from "react-router-dom";

import CartQuantity from "../../components/cart/CartQuantity";
import ShoppingResume from "../../components/cart/ShoppingResume";

import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import emptyCartImage from "../../images/emptycart2.webp";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  if (!cart.length) {
    return (
      <>
        <div className="flex items-center justify-center pt-14">
        <img src={emptyCartImage} alt="empty cart" className="flex h-[10rem]"/>
        </div>
        <div className="flex flex-col items-center pb-20">
          <p className="font-semibold">Your cart is empty</p>
          <p className="pb-4">Looks like you have not added anything to your cart</p>
          <Link to="/"><button className="bg-red-600 hover:bg-red-500 text-slate-50 p-3 rounded-lg">Go back shopping</button></Link>
        </div>
      </>
    );
  }

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  return (
    <>
      <h1 className="text-3xl py-6 border-b text-left ms-20 text-yellow-600">
        Shopping Cart
      </h1>
      <div className="px-20 flex justify-between">
        <div className="flex flex-col">
          {cart.map((product: SelectedProduct) => {
            const imgUrl = product.images[0];
            const formattedUrl = `http://localhost:3333/${imgUrl.replace(
              /\\/g,
              "/"
            )}`;

            return (
              <div
                className="flex mt-10 w-[100%] justify-between border-b pb-12"
                key={product.id}
              >
                <div className="h-[25vh] shadow-2xl rounded-lg">
                  <img
                    src={formattedUrl}
                    alt={product.name}
                    className="h-[100%] w-[100%] rounded-lg"
                  />
                </div>

                <div className="ms-8 w-[400px]">
                  <div>
                    <p className="font-semibold text-md">{product.name}</p>
                  </div>

                  <div className="pt-2 pb-4">
                    <p className="font-semibold text-md text-red-600">
                      R${product.price} -{" "}
                      <small className="text-xs">preço individual</small>
                    </p>
                  </div>

                  <CartQuantity
                    quantity={product.selectedQuantity}
                    onUpdateQuantity={(quantity: number) =>
                      handleUpdateQuantity(product.id, quantity)
                    }
                  />
                  <div className="flex items-end my-2 gap-2">
                    <FaCheck className="text-green-500" />
                    <small>in Stock: {product.quantity}</small>
                  </div>
                </div>

                <div
                  className="ps-14 pt-[5px] cursor-pointer h-[2vh] duration-300 hover:text-red-500"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  <IoMdClose size={20} />
                </div>
              </div>
            );
          })}
        </div>
        <ShoppingResume/>
      </div>
    </>
  );
};

export default Cart;
