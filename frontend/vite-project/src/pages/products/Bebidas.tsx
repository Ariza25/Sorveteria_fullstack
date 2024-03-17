import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Product } from "../../context/ProductContext";
import truncateString from "../../utils/TextReduce";
import WhatsApp from "../../components/WhatsApp";
import PageBackToTop from "../../components/PageBackToTop";

const Bebidas = () => {
  const { loadProducts, products, selectProduct } = useContext(ProductContext);

  const navigate = useNavigate();

  const categoryId = "65e62c8cfe6ec441efb384f2";
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
    <PageBackToTop/>
    <WhatsApp/>
      <main className="h-auto-screen shadow-slate-400 my-10 px-20">
        <h2 className="flex justify-left my-6 border-b font-semibold text-yellow-600 text-3xl">
          Bebidas
        </h2>
        <section className="grid grid-cols-4 gap-6 w-[100%]">
          {filteredProducts.map((product) => {
            const imageUrl = `http://localhost:3333/${product.images[0].replace(
              /\\/g,
              "/"
            )}`;

            return (
              <div
                key={product.id}
                className="relative shadow-lg flex-column cursor-pointer hover:shadow-slate-400"
                onClick={() => {
                  if (product.stock === true) {
                    handleSelectProduct(product);
                  }
                }}
              >
                <div>
                  <img
                    src={imageUrl}
                    className="w-[260px] h-[250px] cursor-pointer"
                    alt={product.name}
                  />
                  {product.stock === false && (
                    <div className="absolute top-0 left-0 w-[259px] h-[250px] bg-red-500 bg-opacity-50 flex items-center justify-center">
                      <p className="text-slate-50 text-2xl font-semibold">Out of Stock</p>
                    </div>
                  )}
                </div>
                <div className="p-6 bg-slate-50 ps-4 h-[35vh]">
                  <h3 className="font-semibold text-lg text-red-800">
                    {product.name}
                  </h3>
                  <p className="font-sans text-sm">
                    {truncateString(product.description, 50)}
                  </p>
                  <p className=" mt-4 font-bold text-xl text-red-800">
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

export default Bebidas;
