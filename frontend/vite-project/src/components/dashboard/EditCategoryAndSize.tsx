import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/axios";
import { Category, Size } from "../../context/ProductContext";

import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import Modal from "react-modal";
import Spinner from "../Spinner";

import { ToastContainer, toast } from "react-toastify";

const EditCategoryAndSize = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [isLoadingSize, setIsLoadingSize] = useState(false);

  const [modalCategoryIsOpen, setModalCategoryIsOpen] = useState(false);
  const [modalSizeIsOpen, setModalSizeIsOpen] = useState(false);

  const { register: registerCategory, handleSubmit: handleFormSubmitCategory } =
    useForm<Category>();

  const { register: registerSize, handleSubmit: handleFormSubmitSize } =
    useForm<Size>();

  const CategoryDeleted = () =>
    toast.success("Category deleted successfully!", {
      autoClose: 1000,
    });

    const CategoryUpdated = () =>
    toast.success("Category updated successfully!", {
      autoClose: 1000,
    });

  const CategoryError = () =>
    toast.error("Error to deleting Category!", {
      autoClose: 1000,
    });

  const SizeDeleted = () =>
    toast.success("Size deleted successfully!", {
      autoClose: 1000,
    });

    const SizeUpdated = () =>
    toast.success("Size updated successfully!", {
      autoClose: 1000,
    });

  const SizeError = () =>
    toast.error("Error to deleting Size!", {
      autoClose: 1000,
    });

  async function loadCategories() {
    try {
      const response = await api.get("/v1/api/categories");
      setCategories(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCategories(idToDelete: string) {
    if (!idToDelete) return;

    setIsLoadingCategory(true);
    try {
      const response = await api.delete(`/v1/api/category/${idToDelete}`);
      console.log(response);

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== idToDelete)
      );
      CategoryDeleted();
    } catch (err) {
      CategoryError();
      console.log(err);
    } finally {
      setIsLoadingCategory(false);
    }
  }

  async function updateCategories(data: Category) {

    if (!selectedCategory) {
      console.error("No category selected");
      return;
    }

    setIsLoadingCategory(true);
    try {
      const response = await api.put(
        `/v1/api/category/${selectedCategory.id}`,
        { name: data.name }
      );
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === selectedCategory.id ? response.data : category
        )
      );
      CategoryUpdated();
      setModalCategoryIsOpen(false);
    } catch (err) {
      console.log("Error occurred:", err);
    } finally {
      setIsLoadingCategory(false);
    }
  }

  async function updateSizes(data: Size) {
    if (!selectedSize) {
      console.error("No category selected");
      return;
    }

    setIsLoadingSize(true);
    try {
      const response = await api.put(`/v1/api/size/${selectedSize.id}`, {
        name: data.name,
      });
      setSizes((prevSizes) =>
        prevSizes.map((size) =>
          size.id === selectedSize.id ? response.data : size
        )
      );
      SizeUpdated();
      setModalSizeIsOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingSize(false);
    }
  }

  async function loadSizes() {
    try {
      const response = await api.get("/v1/api/sizes");
      setSizes(response.data.sizes);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSizes(idToDelete: string) {
    if (!idToDelete) return;
    console.log(idToDelete);

    setIsLoadingSize(true);
    try {
      const response = await api.delete(`/v1/api/size/${idToDelete}`);
      console.log(response);

      setSizes((prevSizes) =>
        prevSizes.filter((size) => size.id !== idToDelete)
      );
      SizeDeleted();
    } catch (err) {
      SizeError();
      console.log(err);
    } finally {
      setIsLoadingSize(false);
    }
  }

  useEffect(() => {
    loadSizes();
    loadCategories();
  }, []);

  return (
    <>
      <ToastContainer />
      <main className="w-full px-20 my-10">
        <h2 className="font-semibold text-2xl text-yellow-600 border-b mb-4">
          Categorias Cadastradas
        </h2>
        <div className="flex justify-between text-sm border-b py-8">
          <p className="w-[40%]">
            <i>Nome da Categoria:</i>
          </p>
        </div>
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="w-[40%] font-semibold text-md">
                <p>{category.name}</p>
              </div>
              <div>
                <div className="flex flex-col gap-2 text-slate-50">
                  <button
                    className="bg-red-700 p-2 rounded-md hover:bg-red-500"
                    onClick={() => {
                      console.log(category.id);
                      setModalCategoryIsOpen(true);
                      setSelectedCategory(category);
                    }}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    className="bg-red-700 p-2 rounded-md hover:bg-red-500"
                    onClick={() => {
                      deleteCategories(category.id);
                    }}
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
        isOpen={modalCategoryIsOpen}
        onRequestClose={() => setSelectedCategory(null)}
        contentLabel="Category Edit"
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
            onClick={() => setModalCategoryIsOpen(false)}
          />
        </div>
        <main className="flex flex-col items-left px-10">
          <div className="mb-4 font-bold text-yellow-600 text-2xl">
            <h1>Editar Categoria</h1>
          </div>
          <form
            className="mt-6 mb-2"
            onSubmit={handleFormSubmitCategory(updateCategories)}
          >
            <div className="flex gap-10" id="col1">
              <div className="w-[36rem]">
                <div>
                  <label className="font-medium text-yellow-600 pb-1">
                    Nome da Categoria:
                  </label>
                  <input
                    className="w-full p-2.5 rounded-lg border"
                    type="text"
                    placeholder="Ex.: Digite o nome do Produto"
                    {...registerCategory("name", {
                      required: true,
                      minLength: 3,
                    })}
                  />
                  <button
                    className="my-8 bg-red-700 hover:bg-red-600 rounded-lg text-slate-50"
                    type="submit"
                    style={{ width: "200px", height: "50px" }}
                  >
                    {isLoadingCategory ? <Spinner /> : "Salvar Alterações"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </Modal>

      <main className="w-full px-20 my-10">
        <h2 className="font-semibold text-2xl text-yellow-600 border-b mb-4">
          Tamanhos Cadastrados
        </h2>
        <div className="flex justify-between text-sm border-b py-8">
          <p className="w-[40%]">
            <i>Nome do Tamanho:</i>
          </p>
        </div>
        {sizes.map((size) => {
          return (
            <div
              key={size.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="w-[40%] font-semibold text-md">
                <p>{size.name}</p>
              </div>
              <div>
                <div className="flex flex-col gap-2 text-slate-50">
                <button
                    className="bg-red-700 p-2 rounded-md hover:bg-red-500"
                    onClick={() => {
                      console.log(size.id);
                      setModalSizeIsOpen(true);
                      setSelectedSize(size);
                    }}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    className="bg-red-700 p-2 rounded-md hover:bg-red-500"
                    onClick={() => {
                      deleteSizes(size.id);
                    }}
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
        isOpen={modalSizeIsOpen}
        onRequestClose={() => setSelectedSize(null)}
        contentLabel="Size Edit"
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
            onClick={() => setModalSizeIsOpen(false)}
          />
        </div>
        <main className="flex flex-col items-left px-10">
          <div className="mb-4 font-bold text-yellow-600 text-2xl">
            <h1>Editar Tamanhos</h1>
          </div>
          <form
            className="mt-6 mb-2"
            onSubmit={handleFormSubmitSize(updateSizes)}
          >
            <div className="flex gap-10" id="col1">
              <div className="w-[36rem]">
                <div>
                  <label className="font-medium text-yellow-600 pb-1">
                    Nome do Tamanho:
                  </label>
                  <input
                    className="w-full p-2.5 rounded-lg border"
                    type="text"
                    placeholder="Ex.: Digite o nome do Produto"
                    {...registerSize("name", {
                      required: true,
                      minLength: 3,
                    })}
                  />
                  <button
                    className="my-8 bg-red-700 hover:bg-red-600 rounded-lg text-slate-50"
                    type="submit"
                    style={{ width: "200px", height: "50px" }}
                  >
                    {isLoadingSize ? <Spinner /> : "Salvar Alterações"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </Modal>
    </>
  );
};

export default EditCategoryAndSize;
