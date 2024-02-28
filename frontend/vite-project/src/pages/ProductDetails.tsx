import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { useContext, useState} from "react";

import { IoMdHeartEmpty } from "react-icons/io";

import Quantity from "../components/Quantity";
import Rating from "../components/Rating";

const ProductDetails = () => {
  const { selectedProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  
  const [isSelectImage, setIsSelectImage] = useState(0);
  const [isSelectedQuantity, setIsSelectedQuantity] = useState(1);

  if (!selectedProduct) {
    return <div>No product selected</div>;
  }

  const imageUrls = selectedProduct.images.map(
    (image) => `http://localhost:3333/${image.replace(/\\/g, "/")}`
  );

  const imageUrl = imageUrls[isSelectImage];

  const handleSelectImage = (imageUrl: string) => {
    const index = imageUrls.indexOf(imageUrl);
    if (index !== -1) {
      setIsSelectImage(index);
    }
  };

    const handleAddToCart = () => {
        addToCart({
        ...selectedProduct,
        selectedQuantity: isSelectedQuantity,
        });
    };

  return (
    <>
      <section className="flex justify-center border-t-2 ms-14 py-10 shadow-sm h-[80vh] w-[90%]">
        <div>
          {imageUrls.map((imageUrl, index) => (
            <img
              onClick={() => handleSelectImage(imageUrl)}
              key={index}
              src={imageUrl}
              alt={selectedProduct.name}
              className={`h-[50px] w-[50px] ms-6 shadow-lg rounded-lg flex flex-column"
    ${
      isSelectImage === index
        ? "bg-slate-100 border-2 border-red-800"
        : "hover:border-slate-800"
    } cursor-pointer mb-5`}
            />
          ))}
        </div>

        <div className="w-[40%] h-[80vh] ms-4">
          <img
            src={imageUrl}
            alt={selectedProduct.name}
            className="h-[60vh] w-[90%] ms-6 shadow-lg rounded-lg"
          />
        </div>

        <div className="w-[50%] h-[80vh] ms-4 mt-2">
          <div className="flex items-center">
            <div className="font-bold text-2xl text-red-700">
              {selectedProduct.name}
            </div>
            <div className="ms-3 mt-1 cursor-pointer">
              <IoMdHeartEmpty size={25} />
            </div>
          </div>

          <Rating />

          <div className="flex mt-4">
            <h3 className="font-bold text-md text-gray-800">Price:</h3>
            <div className="ms-1 me-5 text-md">R${selectedProduct.price}</div>
            <h3 className="font-bold text-md text-gray-800">In Stock:</h3>
            <div className="ms-1 text-md">
              {selectedProduct.quantity} unities
            </div>
          </div>

          <div className="flex mt-4 items-center">
            <h3 className="font-bold text-md me-2">
              <Quantity onQuantityChange={(quantity: number) => setIsSelectedQuantity(quantity)} />
            </h3>
          </div>
          <h3 className="font-bold mt-4 text-gray-800">Product Description</h3>
          {selectedProduct.description}
          <div className="my-8 flex gap-4">
            <button className="p-2 rounded-lg bg-red-800 text-slate-50 hover:bg-red-700">
              Buy now
            </button>
            <button className="p-2 rounded-lg bg-red-600 border hover:bg-red-500 text-slate-50"
            onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col h-[100%] shadow-md w-[90%] ms-14 mb-20">
        <div className="flex flex-row w-[100%]">
          <div className="bg-red-800">
            <h2 className="ps-10 font-semibold flex w-[300px] text-2xl text-slate-50 mt-14">
              Rating do Produto
            </h2>
            <div className="flex items-center mt-2 ms-10">
              <div className="text-[50px] text-slate-50 me-4 mb-2">4.8</div>
              <div>
                <div className="flex text-white">
                  <Rating />
                </div>
                <small>250 avaliações</small>
              </div>
            </div>
            <div className="ms-10">
              <p className="text-slate-50">Perfeito para % dos clientes</p>
            </div>
          </div>

        </div>
      </section>

      
    </>
  );
};

export default ProductDetails;