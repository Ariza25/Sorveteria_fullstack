import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../services/axios";

import registerImage from "../images/logonobackground.png";

interface CategoryProps {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [register, setRegister] = useState<CategoryProps[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmitRegister(e: FormEvent) {
    e.preventDefault();

    if (!name || !email || !password || confirmPassword !== password) {
      setErrors({
        name: "O campo 'nome' é obrigatório",
        email: "O campo 'email' é obrigatório",
        password: "O campo 'senha' é obrigatório",
        confirmPassword: "O campo 'confirmar senha' é obrigatório",
      });
      return;
    }

    try {
      const response = await api.post("/v1/api/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      setRegister(response.data);
      navigate("/login");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }

    if (field === "name") {
      setName(value);
    } else if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    } else if (field === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  useEffect(() => {}, [register]);

  return (
    <>
      <div className="w-full min-h-screen bg-slate-50 flex justify-center px-20">
        <main className="my-10 w-[90%] me-20 md:max-w-2xl pe-20 border-e-2 border-yellow-600">
          <h1 className="font-medium text-center text-yellow-600 text-4xl">
            Register New Account
          </h1>

          <form
            className="flex flex-col my-6 pb-6"
            onSubmit={handleSubmitRegister}
          >
            <label className="font-medium text-yellow-600">Full name:</label>
            <input
              type="text"
              placeholder="Full Name"
              className={`w-full mb-5 p-2 rounded ${
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

            <label className="font-medium text-yellow-600">Email:</label>
            <input
              type="text"
              placeholder="Digite seu email"
              autoComplete="new-email"
              className={`w-full mb-5 p-2 rounded ${
                errors.email && !email ? "bg-red-200" : ""
              }`}
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {errors.email && !email && (
              <span className="text-red-500 font-medium mt-[-15px] mb-3">
                {errors.email}
              </span>
            )}

            <label className="font-medium text-yellow-600">Password:</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              autoComplete="new-password"
              className={`w-full mb-5 p-2 rounded ${
                errors.password && !password ? "bg-red-200" : ""
              }`}
              value={password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            {errors.password && !password && (
              <span className="text-red-500 font-medium mt-[-15px] mb-3">
                {errors.password}
              </span>
            )}

            <label className="font-medium text-yellow-600">
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="Confirme sua senha"
              className={`w-full mb-5 p-2 rounded ${
                errors.confirmPassword && !confirmPassword ? "bg-red-200" : ""
              }`}
              value={confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
            />
            {errors.confirmPassword && !confirmPassword && (
              <span className="text-red-500 font-medium mt-[-15px] mb-3">
                {errors.confirmPassword}
              </span>
            )}

            <button
              type="submit"
              className="cursor-pointer rounded w-full p-2 bg-red-600 hover:bg-red-500 font-semibold text-white"
            >
              Register
            </button>
          </form>

          <span className="text-slate-600 flex justify-center mb-4 mt-[-20px]">
            Already have an account?
            <Link
              className="underline hover:text-slate-400 ms-1 font-bold"
              to="/login"
            >
              Login
            </Link>
          </span>
        </main>

        <section>
          <img
            src={registerImage}
            alt="register"
            className="w-[700px] h-[400px] object-cover rounded-lg mt-20"
          />
        </section>
      </div>
      <hr />
    </>
  );
};

export default Register;
