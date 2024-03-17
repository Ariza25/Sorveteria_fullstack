import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import registerImage from "../images/logonobackground.png";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const password = watch("password");

  const { signUp } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log("onSubmit called");

    try {
      await signUp(data.name, data.email, data.password, data.confirmPassword);
      navigate("/login");
    } catch (error) {
      console.error("Error on register:", error);
    }
  };
  return (
    <>
      <div className="w-full min-h-screen bg-slate-50 flex justify-center px-20">
        <main className="my-10 w-[90%] me-20 md:max-w-2xl pe-20 border-e-2 border-yellow-600">
          <h1 className="font-medium text-center text-yellow-600 text-4xl">
            Register New Account
          </h1>

          <form
            className="flex flex-col my-6 pb-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="font-medium text-yellow-600 pb-1">
              Full Name:
            </label>
            <input
              className={`w-full p-2.5 rounded-lg border ${
                errors?.name ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Digite seu nome completo"
              {...register("name", {
                required: true,
                validate: (value) => validator.isAlphanumeric(value),
              })}
            />
            {errors?.name?.type === "required" && (
              <p className="text-red-600 pt-1">Name is required</p>
            )}
            {errors?.name?.type === "validate" && (
              <p className="text-red-600 pt-1">Name is invalid</p>
            )}

            <label className="font-medium text-yellow-600 pb-1 mt-4">Email:</label>
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
              <p className="text-red-600 pt-1">
                Password must have at least 6 characters
              </p>
            )}

            <label className="font-medium text-yellow-600 pt-4 pb-1">
              Confirm Password:
            </label>
            <input
              className={`w-full p-2.5 rounded-lg border ${
                errors?.confirmPassword ? "border-red-500" : ""
              }`}
              type="password"
              placeholder="Confirme sua senha"
              {...register("confirmPassword", {
                required: true,
                minLength: 6,
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
            />
            {errors?.confirmPassword?.type === "required" && (
              <p className="text-red-600 pt-1">
                Confirmation Password is required
              </p>
            )}
            {errors?.confirmPassword?.type === "minLength" && (
              <p className="text-red-600 pt-1">
                Confirmation Password must have at least 6 characters
              </p>
            )}
            {errors?.confirmPassword?.type === "validate" && (
              <p className="text-red-600 pt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            <button
              type="submit"
              className="mt-6 cursor-pointer rounded w-full p-2 bg-red-600 hover:bg-red-500 font-semibold text-white"
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
