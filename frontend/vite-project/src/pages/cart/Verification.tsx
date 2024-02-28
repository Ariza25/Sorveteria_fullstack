import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { UserDataContext } from "../../context/DataUserContext";
import ShoppingResume from "../../components/cart/ShoppingResume";
import { api } from "../../services/axios";


const Verification = () => {
  const { userData } = useContext(UserDataContext);
  const { cart } = useContext(CartContext);

  const handleFinishOrder = async () => {
    try {
      // Prepare the order data
      const orderData = {
        fullName: userData.fullName,
        phone: userData.phone,
        address: userData.address,
        addressNumber: userData.addressNumber ? parseInt(userData.addressNumber) : 0,
        addressDistrict: userData.addressDistrict,
        addressCity: userData.addressCity,
        complement: userData.complement,
        paymentMethod: userData.paymentMethod,
        cpf: userData.cpf,
        status: true,
        products: cart.map(product => ({
          productName: product.name,
          productId: product.id,
          quantityBought: product.selectedQuantity,
          UnityPrice: product.price,
          UnitySubTotalPrice: (parseFloat(product.price) * product.selectedQuantity).toFixed(2),
          FinalPrice: (parseFloat(product.price) * product.selectedQuantity).toFixed(2),
        })),
      };
  
      // Send the order data to the API
      const response = await api.post('/v1/api/order', orderData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex px-20">
        <main className="w-[50%] items-left">
          <div className="text-3xl py-6 border-b text-left text-yellow-600">
            Finalizar Pedido
          </div>

          <div>
            <h2 className="font-semibold text-lg text-slate-800 my-4">
              Produto(s) selecionado(s):
            </h2>
          </div>
          <div>
            {cart.map((product) => {
              const totalPrice = (
                parseFloat(product.price) * product.selectedQuantity
              )
                .toFixed(2)
                .replace(".", ",");
              return (
                <div key={product.id} className="border-b py-4">
                  <div className="gap-2 flex">
                    <p className="font-semibold">Nome do Produto:</p>
                    {product.name}
                  </div>
                  <div className="gap-2 flex">
                    <p className="font-semibold">Quantidade:</p>
                    {product.selectedQuantity}
                  </div>
                  <div className="gap-2 flex">
                    <p className="font-semibold">Preço Unitário:</p>
                    R${product.price} |
                    <p className="font-semibold">Preço Total:</p>
                    R${totalPrice}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h2 className="font-semibold text-lg text-slate-800 my-4">
              Dados do Cliente:
            </h2>
          </div>
          <div className="gap-2 flex">
            <p className="font-semibold">Nome do Cliente:</p>
            {userData.fullName};
          </div>
          <div className="gap-2 flex">
            <p className="font-semibold">Telefone de Contato:</p>
            {userData.phone};
          </div>
          <div className="gap-2 flex">
            <p className="font-semibold">Endereço para entrega:</p>
            {userData.address} - Nº {userData.addressNumber};
          </div>
          <div className="gap-2 flex">
            <p className="font-semibold">Bairro:</p>
            {userData.addressDistrict};
          </div>
          <div className="gap-2 flex">
            <p className="font-semibold">Complemento:</p>
            {userData.complement};
          </div>
          <div className="gap-2 flex border-b pb-4">
            <p className="font-semibold">Cidade:</p>
            {userData.addressCity};
          </div>
          <div>
            <h2 className="font-semibold text-md text-slate-800 mt-4 mb-4 text-lg">
              Forma de Pagamento:
            </h2>
            <div className="gap-2 flex">
              <p className="font-semibold">Pagamento do Pedido:</p>
              {userData.paymentMethod};
            </div>
            <div className="gap-2 flex mb-10">
              <p className="font-semibold">CPF na Nota:</p>
              {userData.cpf};
            </div>
          </div>
        </main>
        <div className="w-[40%] mb-10">
          <ShoppingResume handleFinishOrder={handleFinishOrder} />
        </div>
      </div>
    </>
  );
};

export default Verification;
