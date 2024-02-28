import { FormEvent, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"

import loginImage from "../images/logonobackground.png"

 const Login = () => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  async function handleSubmitLogin(e: FormEvent) {
    e.preventDefault();
    await signIn(email, password);
    navigate("/");
  }

  const handleInputChange = (field: string, value: string) => {
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }

    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-slate-50 flex justify-center px-20 pb-10">
        <section>
          <img
            src={loginImage}
            alt="register"
            className="w-[700px] h-[400px] object-cover rounded-lg mt-16"
          />
        </section>

        <main className="mt-10 w-[90%] ms-20 md:max-w-2xl ps-20 border-s-2 border-yellow-600">
          <h1 className="mt-16 font-medium text-center text-yellow-600 text-4xl">
            Login your Account
          </h1>

          <form
            className="flex flex-col my-6 pb-6"
            onSubmit={handleSubmitLogin}
          >
            <label className="font-medium text-yellow-600">Email:</label>
            <input
              type="text"
              placeholder="Digite seu email"
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
            <button
              type="submit"
              className="cursor-pointer rounded w-full p-2 bg-red-600 hover:bg-red-500 font-semibold text-white"
            >
            Login
            </button>
          </form>

          <span className="text-slate-600 flex justify-center mb-4 mt-[-20px]">
            Does not have an account?
            <Link
              className="underline hover:text-slate-400 ms-1 font-bold"
              to="/register"
            >
              Register
            </Link>
          </span>
        </main>
      </div>
    </>
  );
};

export default Login;