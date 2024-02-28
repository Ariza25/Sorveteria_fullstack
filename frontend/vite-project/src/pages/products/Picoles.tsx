import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Product } from "../../context/ProductContext";
import truncateString from "../../utils/TextReduce";

const Picoles = () => {
  const { loadProducts, products, selectProduct } = useContext(ProductContext);

  const navigate = useNavigate();

  const categoryId = "65cf8033eff00e0707a83eef";
  const filteredProducts = products.filter(
    (product) => product.categoryId === categoryId
  );

  const handleSelectProduct = (product: Product) => {
    selectProduct(product);
    navigate(`/productDetails/${product.id}`);
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <main className="w-[100%] h-auto-screen shadow-slate-400 ms-14 my-10">
        <section className="grid grid-cols-4 gap-2 w-[60%]">
          {filteredProducts.map((product) => {
            const imageUrl = `http://localhost:3333/${product.images[0].replace(
              /\\/g,
              "/"
            )}`;

            console.log(imageUrl)

            return (
              <div
                key={product.id}
                className="shadow-lg flex-column cursor-pointer hover:shadow-slate-400"
                onClick={() => handleSelectProduct(product)}
              >
                <div>
                  <img
                    src={imageUrl}
                    className="w-[180px] h-[180px] cursor-pointer"
                    alt={product.name}
                  />
                </div>
                <div className="p-6 bg-slate-50 ps-4 h-[30vh]">
                  <h3 className="font-semibold text-slate-800">
                    {product.name}

                  </h3>
                  <p className="font-sans text-sm">
                    {truncateString(product.description, 90)}
                  </p>
                  <p className=" mt-4 font-bold text-xl text-slate-800">
                    R${product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Picoles;
