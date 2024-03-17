import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/axios";
import { Product, Category } from "../../context/ProductContext";

import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import Modal from "react-modal";
import Spinner from "../Spinner";

import { ToastContainer, toast } from "react-toastify";

const EditarProdutos = () => {
  const [isProducts, setIsProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    register,
    handleSubmit: handleFormSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>();

  const productDeleted = () =>
    toast.success("Product deleted successfully!", {
      autoClose: 1000,
    });

  const productUpdated = () =>
    toast.success("Product updated successfully!", {
      autoClose: 1000,
    });

  const productError = () =>
    toast.error("Error to deleting product!", {
      autoClose: 1000,
    });

  async function loadProducts() {
    try {
      const response = await api.get("/v1/api/products");
      setIsProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadCategories() {
    try {
      const response = await api.get("/v1/api/categories");
      setCategories(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteProduct(id: string) {
    try {
      await api.delete(`/v1/api/product/${id}`);
      productDeleted();
      loadProducts();
    } catch (error) {
      productError();
      console.error("Error during delete product:", error);
    }
  }

  async function onSubmit(data: Product) {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", String(data.price));
      formData.append("description", data.description);
      formData.append("quantity", String(data.quantity));
      formData.append("size", String(data.size.id));
      formData.append("categoryId", data.categoryId);
      formData.append("stock", String(data.stock));
      formData.append("images", data.images[0]);

      await api.put(`/v1/api/product/${selectedProduct?.id}`, formData);
      productUpdated();
      setIsLoading(false);
      setModalIsOpen(false);
      loadProducts();
    } catch (error) {
      console.error("Error during update product:", error);
    }
  }

  const setFormValues = (data: Product) => {
    setValue("name", data.name);
    setValue("price", data.price);
    setValue("description", data.description);
    setValue("quantity", data.quantity);
    setValue("size", data.size);
    setValue("categoryId", data.categoryId);
    setValue("stock", data.stock);

    if (Array.isArray(data.images)) {
      setValue("images", data.images);
    } else {
      setValue("images", [data.images]);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setFormValues(product);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  return (
    <>
      <ToastContainer />
      <main className="w-full px-20 my-10">
        <h2 className="font-semibold text-2xl text-yellow-600 border-b mb-4">
          Produtos Cadastrados
        </h2>
        <div className="flex justify-between text-sm border-b py-8">
          <p className="w-[40%]">
            <i>Nome do Produto</i>
          </p>
          <p className="w-[32%]">
            <i>Categoria do Produto</i>
          </p>
          <p className="w-[36%]">
            <i>Preço do Produto</i>
          </p>
        </div>
        {isProducts.map((product) => {
          const category = categories.find((c) => c.id === product.categoryId);
          return (
            <div
              key={product.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="w-[40%] font-semibold text-md">
                <p>{product.name}</p>
              </div>
              <div className="w-[30%]">
                <p>{category ? category.name : "Loading..."}</p>
              </div>
              <div className="w-[30%] text-md">
                <p>R${product.price}</p>
              </div>
              <div>
                <div className="flex flex-col gap-2 text-slate-50">
                  <button
                    className="bg-red-700 p-2 rounded-md hover:bg-red-500"
                    onClick={() => {
                      handleProductSelect(product);
                      setModalIsOpen(true);
                    }}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-700 p-2 rounded-md hover:bg-red-500"
                  >
                    <FaTrashCan size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setSelectedProduct(null)}
        contentLabel="Product Edit"
        style={{
          content: {
            width: "80%",
            height: "80%",
            margin: "0 auto",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 2000,
          },
        }}
      >
        <div className="flex justify-end">
          <IoMdClose
            size={25}
            className="hover:text-red-600 cursor-pointer"
            onClick={() => setModalIsOpen(false)}
          />
        </div>
        <main className="flex flex-col items-left px-10">
          <div className="mb-4 font-bold text-yellow-600 text-2xl">
            <h1>Editar Produtos</h1>
          </div>
          <div className="flex flex-col text-slate-600">
            <div>
              <form className="mt-6 mb-2" onSubmit={handleFormSubmit(onSubmit)}>
                <div className="flex gap-10" id="col1">
                  <div className="w-[36rem]">
                    <div>
                      <label className="font-medium text-yellow-600 pb-1">
                        Nome do Produto:
                      </label>
                      <input
                        className="w-full p-2.5 rounded-lg border"
                        type="text"
                        placeholder="Ex.: Digite o nome do Produto"
                        {...register("name", {
                          required: true,
                          minLength: 3,
                        })}
                      />
                      {errors?.name?.type === "required" && (
                        <p className="text-red-600 pt-1">name is required</p>
                      )}
                      {errors?.name?.type === "minLength" && (
                        <p className="text-red-600 pt-1">
                          name is lass than 3 characteres
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-[26rem]">
                    <div>
                      <label className="font-medium text-yellow-600 pb-1">
                        Preço do Produto:
                      </label>
                      <input
                        className="w-full p-2.5 rounded-lg border"
                        type="text"
                        placeholder="Ex.: 10,00"
                        {...register("price", {
                          required: true,
                        })}
                      />
                      {errors?.price?.type === "required" && (
                        <p className="text-red-600 pt-1">price is required</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-10" id="col2">
                  <div className="w-[36rem] mt-4">
                    <div>
                      <label className="font-medium text-yellow-600 pb-1 ">
                        Descrição do Produto:
                      </label>
                      <input
                        className="w-full p-2.5 rounded-lg border"
                        type="text"
                        placeholder="Ex.: Sorvete de flocos 90mg"
                        {...register("description", {
                          required: true,
                          minLength: 10,
                        })}
                      />
                      {errors?.description?.type === "required" && (
                        <p className="text-red-600 pt-1">price is required</p>
                      )}
                      {errors?.description?.type === "minLength" && (
                        <p className="text-red-600 pt-1">
                          price is less than 10 characteres
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-[26rem] mt-4">
                    <div>
                      <label className="font-medium text-yellow-600 pb-1">
                        Categoria do Produto:
                      </label>
                      <input
                        className="w-full p-2.5 rounded-lg border"
                        type="text"
                        placeholder="Ex.: Digite a categoria do Produto"
                        {...register("categoryId", {
                          required: true,
                        })}
                      />
                      {errors?.categoryId?.type === "required" && (
                        <p className="text-red-600 pt-1">
                          Category ID is required
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-10" id="col3">
                  <div className="w-[12rem] mt-4">
                    <div>
                      <label className="font-medium text-yellow-600 pb-1">
                        Quantidade disponível:
                      </label>
                      <input
                        className="w-full p-2.5 rounded-lg border"
                        type="number"
                        placeholder="Ex.: 100"
                        {...register("quantity", {
                          required: true,
                        })}
                      />
                      {errors?.quantity?.type === "required" && (
                        <p className="text-red-600 pt-1">
                          Quantity is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-[24rem] mt-4">
                    <div>
                      <label className="font-medium text-yellow-600 pb-1">
                        Tamanho do Produto:
                      </label>
                      <input
                        className="w-full p-2.5 rounded-lg border"
                        type="text"
                        placeholder="Ex.: Digite o tamanho do Produto"
                        {...register("size", {
                          required: true,
                        })}
                      />
                      {errors?.size?.type === "required" && (
                        <p className="text-red-600 pt-1">size is required</p>
                      )}
                    </div>
                  </div>

                  <div className="w-[12rem] mt-4">
                    <div>
                      <label className="font-semibold text-md text-yellow-600">
                        Em estoque?
                      </label>
                    </div>
                    <div className="p-2.5 rounded-lg border">
                      <select
                        className="w-full"
                        {...register("stock", {
                          required: "Stock is required",
                        })}
                      >
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                      </select>
                      {errors.stock && (
                        <p className="text-red-600 pt-1">
                          {errors.stock.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-10" id="col4">
                  <div className="w-[36rem] mt-4">
                    <div>
                      <label className="font-medium text-yellow-600 pb-1">
                        Imagens do Produto:
                      </label>
                      <input
                        className="w-full p-2.5 rounded-lg border"
                        type="file"
                        placeholder="Ex.: Digite o nome do Produto"
                        {...register("images", {
                          required: true,
                        })}
                      />
                        {errors?.images?.type === "required" && (
                        <p className="text-red-600 pt-1">Image is required</p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="my-8 bg-red-700 hover:bg-red-600 rounded-lg text-slate-50"
                  type="submit"
                  style={{ width: "200px", height: "50px" }}
                >
                  {isLoading ? <Spinner /> : "Salvar Alterações"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </Modal>
    </>
  );
};

export default EditarProdutos;
