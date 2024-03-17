import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import validator from "validator";

interface FormData {
  email: string;
  password: string;
}

import loginImage from "../images/logonobackground.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const onSubmit = async (data: FormData) => {
    console.log("onSubmit called");

    try {
      await signIn(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="font-medium text-yellow-600 pb-1">Email:</label>
            <input
              className={`w-full p-2.5 rounded-lg border ${
                errors?.email ? "border-red-500" : ""
              }`}
              type="email"
              placeholder="Digite seu email"
              {...register("email", {
                required: true,
                validate: (value) => validator.isEmail(value),
              })}
            />
            {errors?.email?.type === "required" && (
              <p className="text-red-600 pt-1">Email is required</p>
            )}
            {errors?.email?.type === "validate" && (
              <p className="text-red-600 pt-1">Email is invalid</p>
            )}

            <label className="font-medium text-yellow-600 pt-4 pb-1">
              Password:
            </label>
            <input
              className={`w-full p-2.5 rounded-lg border ${
                errors?.email ? "border-red-500" : ""
              }`}
              type="password"
              placeholder="Digite sua senha"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors?.password?.type === "required" && (
              <p className="text-red-600 pt-1">Password is required</p>
            )}
              {errors?.password?.type === "minLength" && (
              <p className="text-red-600 pt-1">Password must have at least 6 characters</p>
            )}
            <button
              type="submit"
              className="cursor-pointer rounded w-full p-2 mt-4 bg-red-600 hover:bg-red-500 font-semibold text-white"
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
