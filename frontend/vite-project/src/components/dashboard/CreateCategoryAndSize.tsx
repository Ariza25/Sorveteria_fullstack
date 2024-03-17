import { useForm } from "react-hook-form";
import { api } from "../../services/axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Spinner from "../Spinner";

interface FormDataCategory {
  id: string;
  name: string;
}

interface FormDataSize {
  id: string;
  name: string;
}

const CreateCategoryAndSize = () => {
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [isLoadingSize, setIsLoadingSize] = useState(false);

  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    formState: { errors: errorsCategory },
  } = useForm<FormDataCategory>();

  const {
    register: registerSize,
    handleSubmit: handleSubmitSize,
    formState: { errors: errorsSize },
  } = useForm<FormDataSize>();

  const CreatedCategory = () =>
    toast.success("Category created successfully!", {
      autoClose: 1000,
    });
  const ErrorCategory = () =>
    toast.error("Error to creating Category!", {
      autoClose: 1000,
    });

  const CreatedSize = () =>
    toast.success("Size created successfully!", {
      autoClose: 1000,
    });
  const ErrorSize = () =>
    toast.error("Error to creating Size!", {
      autoClose: 1000,
    });

  const onSubmitCategory = async (data: FormDataCategory) => {
    setIsLoadingCategory(true);
    try {
      const response = await api.post("/v1/api/category", data);
      await response.data;
      CreatedCategory();
    } catch (err) {
      ErrorCategory();
      console.log(err);
    } finally {
      setIsLoadingCategory(false);
    }
  };

  const onSubmitSize = async (data: FormDataSize) => {
    setIsLoadingSize(true);
    try {
      const response = await api.post("/v1/api/size", data);
      await response.data;
      CreatedSize();
    } catch (err) {
      ErrorSize();
      console.log(err);
    } finally {
      setIsLoadingSize(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <main className="flex flex-col items-left px-20">
        <div className="mt-14 mb-6 font-bold text-yellow-600 text-2xl">
          <h1>Cadastrar Categorias</h1>
        </div>
        <div>
          <form onSubmit={handleSubmitCategory(onSubmitCategory)}>
            <label className="font-medium text-yellow-600 pb-2">
              Nome da Categoria:
            </label>
            <input
              className={`mt-1 w-full p-2.5 rounded-lg border ${
                errorsCategory?.name ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Ex.: Massas/IceCakes"
              {...registerCategory("name", {
                required: true,
                minLength: 3,
              })}
            />
            {errorsCategory?.name?.type === "required" && (
              <p className="text-red-600 pt-1">Category's name is required</p>
            )}
            {errorsCategory?.name?.type === "minLength" && (
              <p className="text-red-600 pt-1">
                Category's name is lass than 3 characteres
              </p>
            )}

            <button
              className="mt-4 bg-red-700 hover:bg-red-600 rounded-lg text-slate-50"
              type="submit"
              style={{ width: "160px", height: "40px" }}
            >
              {isLoadingCategory ? <Spinner /> : "Cadastrar Categoria"}
            </button>
          </form>
        </div>

        <div className="mt-14 mb-4 font-bold text-yellow-600 text-2xl">
          <h1>Cadastrar Tamanhos</h1>
        </div>
        <form onSubmit={handleSubmitSize(onSubmitSize)}>
          <label className="font-medium text-yellow-600 pb-2">
            Nome da Categoria:
          </label>
          <input
            className={`mt-1 w-full p-2.5 rounded-lg border ${
              errorsSize?.name ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Ex.: 70g/Medio"
            {...registerSize("name", {
              required: true,
              minLength: 3,
            })}
          />
          {errorsSize?.name?.type === "required" && (
            <p className="text-red-600 pt-1">Size's name is required</p>
          )}
          {errorsSize?.name?.type === "minLength" && (
            <p className="text-red-600 pt-1">
              Sizes's name is lass than 3 characteres
            </p>
          )}

          <button
            className="mt-4 bg-red-700 hover:bg-red-600 rounded-lg text-slate-50"
            type="submit"
            style={{ width: "160px", height: "40px" }}
          >
            {isLoadingSize ? <Spinner /> : "Cadastrar Tamanho"}
          </button>
        </form>
      </main>
    </>
  );
};

export default CreateCategoryAndSize;
