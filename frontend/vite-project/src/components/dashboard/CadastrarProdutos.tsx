import { useState } from "react";
import { api } from "../../services/axios";

const CadastrarProdutos = () => {
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    quantity: "",
    stock: "",
    images: "",
    sizeId: "",
  });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stock, setStock] = useState<string>("true");
  const [images, setImages] = useState<FileList | null>(null);
  const [sizeId, setSizeId] = useState("");

  async function saveProduct() {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("quantity", quantity);
      formData.append("stock", stock === "true" ? "true" : "false");
      formData.append("sizeId", sizeId);

      for (const file of images || []) {
        formData.append("images", file);
      }

      const response = await api.post("/v1/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  const handleInputChange = (
    field: string,
    value: string,
  ) => {
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }

    if (field === "stock") {
      setStock(value);
    } else if (field === "name") {
      setName(value);
    } else if (field === "price") {
      setPrice(value);
    } else if (field === "description") {
      setDescription(value);
    } else if (field === "categoryId") {
      setCategoryId(value);
    } else if (field === "quantity") {
      setQuantity(value);
    } else if (field === "sizeId") {
      setSizeId(value);
    }
  };

  return (
    <main className="flex flex-col items-left px-10">
      <div className="mt-14 mb-4 font-bold text-yellow-600 text-2xl">
        <h1>Cadastrar Produtos</h1>
      </div>
      <div className="flex flex-col text-slate-600">
        <div>
          <form
            className="mt-6 mb-2"
            onSubmit={(e) => {
              e.preventDefault();
              saveProduct();
            }}
          >
            <div className="flex gap-10" id="col1">
              <div className="w-[36rem]">
                <div>
                  <label className="font-semibold text-md text-slate-800">
                    Nome do Produto:
                  </label>
                </div>
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Ex.: Picolé de Morango"
                    className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                      errors.name && !name ? "bg-red-200" : ""
                    }`}
                    value={name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  {errors.name && !name && (
                    <span className="text-red-500 font-medium mt-[-15px] mb-3">
                      {errors.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-[26rem]">
                <div>
                  <label className="font-semibold text-md text-slate-800">
                    Preço do Produto:
                  </label>
                </div>
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Ex.: R$ 100,00"
                    className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                      errors.price && !price ? "bg-red-200" : ""
                    }`}
                    value={price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                  {errors.price && !price && (
                    <span className="text-red-500 font-medium mt-[-15px] mb-3">
                      {errors.price}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-10" id="col2">
              <div className="w-[36rem]">
                <div>
                  <label className="font-semibold text-md text-slate-800">
                    Descrição do Produto:
                  </label>
                </div>
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Ex.: Picolé de frutas vermelhas com 90g desnatado"
                    className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                      errors.name && !name ? "bg-red-200" : ""
                    }`}
                    value={description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                  {errors.description && !description && (
                    <span className="text-red-500 font-medium mt-[-15px] mb-3">
                      {errors.description}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-[26rem]">
                <div>
                  <label className="font-semibold text-md text-slate-800">
                    ID da Categoria do Produto:
                  </label>
                </div>
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Ex.: 035as98fkc878"
                    className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                      errors.categoryId && !categoryId ? "bg-red-200" : ""
                    }`}
                    value={categoryId}
                    onChange={(e) =>
                      handleInputChange("categoryId", e.target.value)
                    }
                  />
                  {errors.categoryId && !categoryId && (
                    <span className="text-red-500 font-medium mt-[-15px] mb-3">
                      {errors.categoryId}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-10" id="col3">
              <div className="w-[12rem]">
                <div>
                  <label className="font-semibold text-md text-slate-800">
                    Quantidade disponível:
                  </label>
                </div>
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Ex.: 10"
                    className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                      errors.quantity && !quantity ? "bg-red-200" : ""
                    }`}
                    value={quantity}
                    onChange={(e) =>
                      handleInputChange("quantity", e.target.value)
                    }
                  />
                  {errors.quantity && !quantity && (
                    <span className="text-red-500 font-medium mt-[-15px] mb-3">
                      {errors.quantity}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-[24rem]">
                <div>
                  <label className="font-semibold text-md text-slate-800">
                    Tamanho do Produto (opcional)
                  </label>
                </div>
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Ex.: 035as98fkc878"
                    className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                      errors.sizeId && !sizeId ? "bg-red-200" : ""
                    }`}
                    value={sizeId}
                    onChange={(e) =>
                      handleInputChange("sizeId", e.target.value)
                    }
                  />
                  {errors.sizeId && !sizeId && (
                    <span className="text-red-500 font-medium mt-[-15px] mb-3">
                      {errors.sizeId}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-[12rem]">
                <div>
                  <label className="font-semibold text-md text-slate-800">
                    Em estoque?
                  </label>
                </div>
                <div className="pt-2">
                  <select
                    className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                      errors.stock && !stock ? "bg-red-200" : ""
                    }`}
                    value={stock}
                    onChange={(e) =>
                      handleInputChange(
                        "stock",
                        e.target.value === "true" ? "true" : "false"
                      )
                    }
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-10" id="col4">
              <div className="w-[36rem]">
                <div>
                  <label className="font-semibold text-md text-slate-800">
                    Imagen(s) do(s) Produto(s)
                  </label>
                </div>
                <div className="pt-2">
                  <input
                    type="file"
                    multiple
                    className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                      errors.images && !images ? "bg-red-200" : ""
                    }`}
                    onChange={(e) => setImages(e.target.files)}
                  />
                  {errors.images && !images && (
                    <span className="text-red-500 font-medium mt-[-15px] mb-3">
                      {errors.images}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              className="p-3 bg-red-700 hover:bg-red-600 rounded-lg text-slate-50"
              type="submit"
            >
              Cadastrar Produto
            </button>
          </form>
        </div>
      </div>
      <div className="my-10">
        <h1>Preencha cadastrados</h1>
      </div>
    </main>
  );
};

export default CadastrarProdutos;
