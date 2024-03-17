import { useContext, useState } from "react";
import { UserDataContext } from "../../context/DataUserContext";
import { useForm } from "react-hook-form";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import WhatsApp from "../../components/WhatsApp";
interface FormData {
  fullName: string;
  phone: string;
  address: string;
  addressNumber: string;
  addressDistrict: string;
  complement: string;
  addressCity: string;
  paymentMethod: string;
  cpf: string;
}

const DataUser = () => {
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("onSubmit called");

    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("addressNumber", data.addressNumber);
    formData.append("addressDistrict", data.addressDistrict);
    formData.append("complement", data.complement);
    formData.append("addressCity", data.addressCity);
    formData.append("paymentMethod", data.paymentMethod);
    formData.append("cpf", data.cpf);

    setIsLoading(true);

    try {
      setUserData(data);
      navigate("/verification");
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <WhatsApp/>
      <h1 className="text-3xl py-6 border-b text-left ms-20 text-yellow-600">
        Informe seus dados
      </h1>
      <div className="flex px-20">
        <main className="w-[100%] items-left">
          <div className="flex flex-col text-slate-600"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 mb-2">
            <div className="flex gap-10" id="col1">
              <div className="w-[36rem]">
                <div>
                  <label className="font-medium text-yellow-600 pb-1">
                    Nome Completo:
                  </label>
                  <input
                    className={`w-full p-2.5 rounded-lg border ${
                      errors?.fullName ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Ex.: Matheus José Sanches Ariza"
                    {...register("fullName", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  {errors?.fullName?.type === "required" && (
                    <p className="text-red-600 pt-1 mb-2">name is required</p>
                  )}
                  {errors?.fullName?.type === "minLength" && (
                    <p className="text-red-600 pt-1 mb-2">
                      name has lass than 6 characteres
                    </p>
                  )}
                </div>
              </div>

              <div className="w-[26.5rem]">
                <div>
                  <label className="font-medium text-yellow-600 pb-1">
                    Número de Contato:
                  </label>
                  <input
                    className={`w-full p-2.5 rounded-lg border ${
                      errors?.phone ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Ex.: (43) 99806-8708"
                    {...register("phone", {
                      required: true,
                    })}
                  />
                  {errors?.phone?.type === "required" && (
                    <p className="text-red-600 pt-1 mb-2">Phone is required</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-10" id="col2">
              <div className="w-[20rem] mt-4">
                <div>
                  <label className="font-medium text-yellow-600 pb-1">
                    Endereço:
                  </label>
                  <input
                    className={`w-full p-2.5 rounded-lg border ${
                      errors?.address ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Ex.: Rua Ametista"
                    {...register("address", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  {errors?.address?.type === "required" && (
                    <p className="text-red-600 pt-1 mb-2">
                      address is required
                    </p>
                  )}
                  {errors?.address?.type === "minLength" && (
                    <p className="text-red-600 pt-1 mb-2">
                      address has lass than 6 characteres
                    </p>
                  )}
                </div>
              </div>
              <div className="w-[14rem] mt-4">
                <div>
                  <label className="font-medium text-yellow-600 pb-1">Nº</label>
                  <input
                    className={`w-full p-2.5 rounded-lg border ${
                      errors?.addressNumber ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Ex.: 123"
                    {...register("addressNumber", {
                      required: true,
                    })}
                  />
                  {errors?.addressNumber?.type === "required" && (
                    <p className="text-red-600 pt-1 mb-2">Number is required</p>
                  )}
                </div>
              </div>
              <div className="w-[26rem] mt-4">
                <div>
                  <label className="font-medium text-yellow-600 pb-1">
                    Bairro:
                  </label>
                  <input
                    className={`w-full p-2.5 rounded-lg border ${
                      errors?.addressDistrict ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Ex.: Jardim Paulista"
                    {...register("addressDistrict", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  {errors?.addressDistrict?.type === "required" && (
                    <p className="text-red-600 pt-1 mb-2">Bairro is required</p>
                  )}
                  {errors?.addressDistrict?.type === "minLength" && (
                    <p className="text-red-600 pt-1 mb-2">
                      name has lass than 6 characteres
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-10" id="col3">
              <div className="w-[31.5rem] mt-4">
                <div>
                  <label className="font-medium text-yellow-600 pb-1">
                    Cidade:
                  </label>
                  <input
                    className={`w-full p-2.5 rounded-lg border ${
                      errors?.addressCity ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Ex.: Cornélio Procópio"
                    {...register("addressCity", {
                      required: true,
                      minLength: 3,
                    })}
                  />
                  {errors?.addressCity?.type === "required" && (
                    <p className="text-red-600 pt-1 mb-2">City is required</p>
                  )}
                  {errors?.addressCity?.type === "minLength" && (
                    <p className="text-red-600 pt-1 mb-2">
                      name has lass than 3 characteres
                    </p>
                  )}
                </div>
              </div>
              <div className="w-[31rem] mt-4">
                <div>
                  <label className="font-medium text-yellow-600 pb-1">
                    Complemento:
                  </label>
                  <input
                    className={`w-full p-2.5 rounded-lg border ${
                      errors?.complement ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Ex.: Casa, Apartamento, Bloco, etc."
                    {...register("complement", {
                      required: true,
                    })}
                  />
                  {errors?.complement?.type === "required" && (
                    <p className="text-red-600 pt-1">Complement is required</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-10" id="col4">
              <div className="mt-4 mb-8 items-center gap-10">
                <div>
                  <h2 className="font-semibold text-md text-yellow-600 pb-2">
                    Método de Pagamento:
                  </h2>
                </div>
                <select  {...register("paymentMethod", {required: true})}  className={`w-full p-2.5 rounded-lg border ${
                      errors?.addressCity ? "border-red-500 text-slate-500" : ""
                    }`}>
                  <option value="">Select a payment method</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Pix">Pix</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
                
                {errors?.paymentMethod?.type === "required" && (
                    <p className="text-red-600">Select a payment method</p>
                  )}
              </div>
              <div className="mt-4 mb-8 items-center gap-10">
                <div className="flex flex-col">
                  <label className="font-semibold text-md text-yellow-600 pb-2">
                    CPF na nota:
                  </label>
                  <input
                    className={`w-full p-2.5 rounded-lg border ${
                      errors?.cpf ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Ex.: 012.345.678-90"
                    {...register("cpf", {
                      required: true,
                    })}
                  />
                  {errors?.cpf?.type === "required" && (
                    <p className="text-red-600">CPF is required</p>
                  )}
                </div>
              </div>
            </div>

            <button
              className="mb-8 bg-red-700 hover:bg-red-600 rounded-lg text-slate-50"
              type="submit"
              style={{ width: "200px", height: "50px" }}
            >
              {isLoading ? <Spinner /> : "Resumo do Pedido"}
            </button>
          </form>
        </main>
      </div>
    </>
  );
};
export default DataUser;
