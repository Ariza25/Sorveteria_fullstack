import { useContext, useState } from "react";
import { UserDataContext } from "../../context/DataUserContext";
import { useNavigate } from "react-router-dom";

const DataUser = () => {
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressDistrict, setAddressDistrict] = useState("");
  const [complement, setComplement] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cartão de Débito");
  const [cpf, setCpf] = useState("");
  const [errors, setErrors] = useState({
    fullName: fullName ? "" : "Nome completo é obrigatório",
    phone: phone ? "" : "Telefone é obrigatório",
    address: address ? "" : "Endereço é obrigatório",
    addressNumber: addressNumber ? "" : "Número do endereço é obrigatório",
    addressDistrict: addressDistrict ? "" : "Bairro é obrigatório",
    addressCity: addressCity ? "" : "Cidade é obrigatório",
    complement: "",
    cpf: "",
  });

  const handleInputChange = (field: string, value: string) => {
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }

    if (field === "fullName") {
      setFullName(value);
    } else if (field === "phone") {
      setPhone(value);
    } else if (field === "address") {
      setAddress(value);
    } else if (field === "addressNumber") {
      setAddressNumber(value);
    } else if (field === "addressDistrict") {
      setAddressDistrict(value);
    } else if (field === "complement") {
      setComplement(value);
    } else if (field === "addressCity") {
      setAddressCity(value);
    } else if (field === "cpf") {
      setCpf(value);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  function saveUserData() {
    const formData = {
      fullName,
      phone,
      address,
      addressNumber,
      addressDistrict,
      complement,
      addressCity,
      paymentMethod,
      cpf,
    };

    setUserData(formData);
    resetForm();
  }

  function resetForm() {
    setFullName("");
    setPhone("");
    setAddress("");
    setAddressNumber("");
    setAddressDistrict("");
    setComplement("");
    setAddressCity("");
    setCpf("");
  }

  const handleDataUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveUserData();
    navigate("/verification")
  }

  return (
    <>
      <h1 className="text-3xl py-6 border-b text-left ms-20 text-yellow-600">
        Informe seus dados
      </h1>
      <div className="flex px-20">
        <main className="w-[100%] items-left">
          <div className="flex flex-col text-slate-600">
            <div>
              <form onSubmit={handleDataUserSubmit}
                className="mt-6 mb-2"
              >
                <div className="flex gap-10" id="col1">
                  <div className="w-[36rem]">
                    <div>
                      <label className="font-semibold text-md text-slate-800">
                        Nome Completo:
                      </label>
                    </div>
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Ex.: Matheus Ariza"
                        className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                          errors.fullName && !fullName ? "bg-red-200" : ""
                        }`}
                        value={fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                      />
                      {errors.fullName && !fullName && (
                        <span className="text-red-500 font-medium mt-[-15px] mb-3">
                          {errors.fullName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-[26rem]">
                    <div>
                      <label className="font-semibold text-md text-slate-800">
                        Telefone de Contato:
                      </label>
                    </div>
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Ex.: (43) 998068708"
                        className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                          errors.phone && !phone ? "bg-red-200" : ""
                        }`}
                        value={phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                      {errors.phone && !phone && (
                        <span className="text-red-500 font-medium mt-[-15px] mb-3">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-10" id="col2">
                  <div className="w-[36rem]">
                    <div>
                      <label className="font-semibold text-md text-slate-800">
                        Endereço:
                      </label>
                    </div>
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Ex.: Rua/Av"
                        className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                          errors.address && !address ? "bg-red-200" : ""
                        }`}
                        value={address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                      />
                      {errors.address && !address && (
                        <span className="text-red-500 font-medium mt-[-15px] mb-3">
                          {errors.address}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-[26rem]">
                    <div>
                      <label className="font-semibold text-md text-slate-800">
                        Número:
                      </label>
                    </div>
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Ex.: 1020/ apt 101"
                        className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                          errors.addressNumber && !addressNumber
                            ? "bg-red-200"
                            : ""
                        }`}
                        value={addressNumber}
                        onChange={(e) =>
                          handleInputChange("addressNumber", e.target.value)
                        }
                      />
                      {errors.addressNumber && !addressNumber && (
                        <span className="text-red-500 font-medium mt-[-15px] mb-3">
                          {errors.addressNumber}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-10" id="col3">
                  <div className="w-[12rem]">
                    <div>
                      <label className="font-semibold text-md text-slate-800">
                        Bairro:
                      </label>
                    </div>
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Ex.: Jardim/Centro"
                        className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                          errors.addressDistrict && !addressDistrict
                            ? "bg-red-200"
                            : ""
                        }`}
                        value={addressDistrict}
                        onChange={(e) =>
                          handleInputChange("addressDistrict", e.target.value)
                        }
                      />
                      {errors.addressDistrict && !addressDistrict && (
                        <span className="text-red-500 font-medium mt-[-15px] mb-3">
                          {errors.addressDistrict}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-[24rem]">
                    <div>
                      <label className="font-semibold text-md text-slate-800">
                        Complemento
                      </label>
                    </div>
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Ex.: Casa de Esquina"
                        className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                          errors.complement && !complement ? "bg-red-200" : ""
                        }`}
                        value={complement}
                        onChange={(e) =>
                          handleInputChange("complement", e.target.value)
                        }
                      />
                      {errors.complement && !complement && (
                        <span className="text-red-500 font-medium mt-[-15px] mb-3">
                          {errors.complement}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-[28rem]">
                    <div>
                      <label className="font-semibold text-md text-slate-800">
                        Complemento
                      </label>
                    </div>
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Ex.: Cornélio Procópio"
                        className={`w-full mb-5 p-2 rounded bg-slate-100 ${
                          errors.addressCity && !addressCity ? "bg-red-200" : ""
                        }`}
                        value={addressCity}
                        onChange={(e) =>
                          handleInputChange("addressCity", e.target.value)
                        }
                      />
                      {errors.addressCity && !addressCity && (
                        <span className="text-red-500 font-medium mt-[-15px] mb-3">
                          {errors.addressCity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-8 flex items-center gap-10">
                  <div>
                    <div>
                      <h2 className="font-semibold text-md text-slate-800 pb-2">
                        Método de Pagamento:
                      </h2>
                    </div>
                    <select value={paymentMethod} onChange={handleSelectChange} className=" font-semibold text-sm px-2 pe-6 text-slate-800 py-2 border-2 rounded-md">
                      <option value="Cartão de Débito">Cartão de Débito</option>
                      <option value="Cartão de Crédito">Cartão de Crédito</option>
                      <option value="Pix">Pix</option>
                      <option value="Dinheiro">Dinheiro</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold text-md text-slate-800 pb-2">
                      CPF na nota:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex.: 012.345.678-90"
                      className={`w-[100%] p-2 rounded bg-slate-100 ${
                        errors.cpf && !cpf ? "bg-red-200" : ""
                      }`}
                      value={cpf}
                      onChange={(e) => handleInputChange("cpf", e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="mb-10 bg-red-700 hover:bg-red-600 text-slate-50 py-2 px-8 rounded-lg">Enviar</button>
              </form>
            </div>
          </div>
        </main>
        <div className="w-[50%] pe-20"></div>
      </div>
    </>
  );
};

export default DataUser;
