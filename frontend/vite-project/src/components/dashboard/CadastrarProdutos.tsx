import { useForm } from "react-hook-form";
import validator from "validator";
import { api } from "../../services/axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Spinner from "../Spinner";

interface FormData {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  quantity: string;
  sizeId: string;
  stock: string;
  images: string[];
}

const CadastrarProdutos = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const productCreated = () =>
    toast.success("Product created successfully!", {
      autoClose: 1000,
    });
  const productError = () =>
    toast.error("Error to creating product!", {
      autoClose: 1000,
    });

  const onSubmit = async (data: FormData) => {
    console.log("onSubmit called");

    const formData = new FormData();

    for (const file of data.images) {
      formData.append("images", file);
    }

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("quantity", data.quantity);
    formData.append("sizeId", data.sizeId);
    formData.append("stock", data.stock);

    setIsLoading(true);

    try {
      const response = await api.post("v1/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await response.data;
      productCreated();
    } catch (error) {
      productError();
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="flex flex-col items-left px-10">
        <div className="mt-14 mb-4 font-bold text-yellow-600 text-2xl">
          <h1>Cadastrar Produtos</h1>
        </div>
        <div className="flex flex-col text-slate-600">
          <div>
            <form className="mt-6 mb-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-10" id="col1">
                <div className="w-[36rem]">
                  <div>
                    <label className="font-medium text-yellow-600 pb-1">
                      Nome do Produto:
                    </label>
                    <input
                      className={`w-full p-2.5 rounded-lg border ${
                        errors?.name ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Ex.: Digite o nome do Produto"
                      {...register("name", {
                        required: true,
                        minLength: 6,
                      })}
                    />
                    {errors?.name?.type === "required" && (
                      <p className="text-red-600 pt-1">name is required</p>
                    )}
                    {errors?.name?.type === "minLength" && (
                      <p className="text-red-600 pt-1">
                        name is over 6 characteres
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
                      className={`w-full p-2.5 rounded-lg border ${
                        errors?.price ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Ex.: 10,00"
                      {...register("price", {
                        required: true,
                      })}
                    />
                    {errors?.price?.type === "required" && (
                      <p className="text-red-600 pt-1">Price is required</p>
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
                      className={`w-full p-2.5 rounded-lg border ${
                        errors?.description ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Ex.: Sorvete de flocos 90mg"
                      {...register("description", {
                        required: true,
                        minLength: 10,
                      })}
                    />
                    {errors?.description?.type === "required" && (
                      <p className="text-red-600 pt-1">
                        Description is required
                      </p>
                    )}
                    {errors?.description?.type === "minLength" && (
                      <p className="text-red-600 pt-1">
                        Description is over 10 characters
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
                      className={`w-full p-2.5 rounded-lg border ${
                        errors?.categoryId ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Ex.: Digite a categoria do Produto"
                      {...register("categoryId", {
                        required: true,
                        validate: (value) => validator.isAlphanumeric(value),
                      })}
                    />
                    {errors?.categoryId?.type === "required" && (
                      <p className="text-red-600 pt-1">Category is required</p>
                    )}
                    {errors?.categoryId?.type === "validate" && (
                      <p className="text-red-600 pt-1">Category is invalid</p>
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
                      className={`w-full p-2.5 rounded-lg border ${
                        errors?.quantity ? "border-red-500" : ""
                      }`}
                      type="number"
                      placeholder="Ex.: 100"
                      {...register("quantity", {
                        required: true,
                        validate: (value) => validator.isNumeric(value),
                      })}
                    />
                    {errors?.quantity?.type === "required" && (
                      <p className="text-red-600 pt-1">Quantity is required</p>
                    )}
                    {errors?.quantity?.type === "validate" && (
                      <p className="text-red-600 pt-1">Quantity is invalid</p>
                    )}
                  </div>
                </div>

                <div className="w-[24rem] mt-4">
                  <div>
                    <label className="font-medium text-yellow-600 pb-1">
                      Tamanho do Produto:
                    </label>
                    <input
                      className={`w-full p-2.5 rounded-lg border ${
                        errors?.sizeId ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Ex.: Digite o tamanho do Produto"
                      {...register("sizeId", {
                        required: true,
                        validate: (value) => validator.isAlphanumeric(value),
                      })}
                    />
                    {errors?.sizeId?.type === "required" && (
                      <p className="text-red-600 pt-1">Size is required</p>
                    )}
                    {errors?.sizeId?.type === "validate" && (
                      <p className="text-red-600 pt-1">Size is invalid</p>
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
                      {...register("stock", { required: true })}
                    >
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                  {errors?.stock?.type === "required" && (
                    <p className="text-red-600 pt-1">
                      Este campo é obrigatório
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-10" id="col4">
                <div className="w-[36rem] mt-4">
                  <div>
                    <label className="font-medium text-yellow-600 pb-1">
                      Imagens do Produto:
                    </label>
                    <input
                      className={`w-full p-2.5 rounded-lg border ${
                        errors?.images ? "border-red-500" : ""
                      }`}
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
                {isLoading ? <Spinner /> : "Cadastrar Produto"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default CadastrarProdutos;
