import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";
import { Product } from "../context/ProductContext";
import handleSelectProduct from "../pages/products/Picoles";
import truncateString  from "../utils/TextReduce";
import itemNotFound from "../images/notfound.jpg";

interface SearchedItemsProps {
    busca: string;
  }

const SearchedItems: React.FC<SearchedItemsProps> = ({ busca }) => {
    const { products } = useContext(ProductContext);

    const buscaNormalized = busca.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filter = products.filter((product: Product) => {
        const productNameNormalized = product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (buscaNormalized === "") {
          return product;
        } else if (productNameNormalized.includes(buscaNormalized)) {
            console.log("o item filtrado foi: ", product.name)
          return true;
        }
        return false
    });

    if(filter.length === 0)
    return (
        <>
          <div className="flex items-center justify-center pt-14">
          <img src={itemNotFound} alt="empty search" className="flex h-[16rem]"/>
          </div>
          <div className="flex flex-col items-center pb-20">
            <p className="font-semibold">This item do not exist</p>
            <p className="pb-4">Please, Try to search again.</p>
          </div>
        </>
      );

    return (
        <>
          <main className="h-auto-screen shadow-slate-400 my-10 px-20">
            <h2 className="flex justify-left my-6 border-b font-semibold text-yellow-600 text-3xl">
              Itens Encontrados
            </h2>
            <section className="grid grid-cols-4 gap-6 w-[100%]">
              {filter.map((product) => {
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
                        handleSelectProduct();
                      }
                    }}
                  >
                    <div>
                      <img
                        src={imageUrl}
                        className="w-[260px] h-[240px] cursor-pointer"
                        alt={product.name}
                      />
                      {product.stock === false && (
                        <div className="absolute top-0 left-0 w-[259px] h-[240px] bg-red-500 bg-opacity-50 flex items-center justify-center">
                          <p className="text-slate-50 text-2xl font-semibold">Out of Stock</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6 bg-slate-50 ps-4 h-[30vh]">
                      <h3 className="font-semibold text-lg text-red-800">
                      {truncateString(product.name, 25)}
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
}

export default SearchedItems;