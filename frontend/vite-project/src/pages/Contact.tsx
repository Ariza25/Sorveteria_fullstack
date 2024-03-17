import backgroundImage from "../images/contact.webp";
import { useForm } from "react-hook-form";
import { api } from "../services/axios";
import Spinner from "../components/Spinner";
import WhatsApp from "../components/WhatsApp";
import { useState } from "react";
import {toast, ToastContainer} from "react-toastify";

interface Contact {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<Contact>();

  const notifySuccess = () => {
    toast.success("Mensagem enviada com sucesso!", {
      autoClose: 1000
    });
  }

  const notifyError = () => {
    toast.success("Erro ao enviar a mensagem!", {
      autoClose: 1000
    });
  }

  const onSubmit = async (data: Contact) => {
    setIsLoading(true);
    try {
      const response = await api.post("/v1/api/contact", data);
      await response.data;
      setFormValues({ name: "", email: "", message: "" });
      notifySuccess();
    } catch (err) {
      notifyError();
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const setFormValues = (data: Contact) => {
    setValue("name", data.name);
    setValue("email", data.email);
    setValue("message", data.message);
  };

  return (
    <>
      <ToastContainer />
      <WhatsApp/>
      <main className="relative">
        <div>
          <img
            className="absolute blur-sm -z-10"
            src={backgroundImage}
            alt="Imagem de fundo"
          />
        </div>
        <div className="">
          <div>
            <div className="flex flex-col items-left px-20">
              <div className="mt-14 mb-6 font-bold text-yellow-600 text-2xl">
                <h1>Entre em contato:</h1>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="font-medium text-yellow-600">
                    Nome Completo:
                  </label>
                  <input
                    className={`mt-1 w-full p-2.5 rounded-lg border ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Ex.: Matheus José Sanches Ariza"
                    {...register("name", {
                      required: true,
                      minLength: 3,
                    })}
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-600 pt-1">Name is required</p>
                  )}
                  {errors.name?.type === "minLength" && (
                    <p className="text-red-600 pt-1">
                      Name is less than 3 characters
                    </p>
                  )}
                  <label className="font-medium text-yellow-600 pb-2">
                    Email:
                  </label>
                  <input
                    className={`mt-1 w-full p-2.5 rounded-lg border ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    type="email"
                    placeholder="Ex.: example@example.com"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-600 pt-1">Email is required</p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className="text-red-600 pt-1">Invalid email address</p>
                  )}
                  <label className="font-medium text-yellow-600 pb-2">
                    Message:
                  </label>
                  <textarea
                    className={`mt-1 w-full p-2.5 rounded-lg border ${
                      errors.message ? "border-red-500" : ""
                    }`}
                    placeholder="Your message"
                    {...register("message", {
                      required: true,
                      minLength: 3,
                      maxLength: 150,
                    })}
                  />
                  {errors.message?.type === "required" && (
                    <p className="text-red-600 pt-1">Message is required</p>
                  )}
                  {errors.message?.type === "minLength" && (
                    <p className="text-red-600 pt-1">
                      Message is less than 3 characters
                    </p>
                  )}
                  {errors.message?.type === "maxLength" && (
                    <p className="text-red-600 pt-1">
                      Message is over 150 characters
                    </p>
                  )}

                  <button
                    className="mt-4 mb-10 bg-red-700 hover:bg-red-600 rounded-lg text-slate-50"
                    type="submit"
                    style={{ width: "160px", height: "40px" }}
                  >
                    {isLoading ? <Spinner /> : "Enviar Mensagem"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
