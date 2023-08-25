import { useForm } from "react-hook-form";
import LoginRegistration from "../components/LoginRegistration/LoginRegistration";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error] = useState("");
  const [defaultEmail, setDefaultEmail] = useState(null);
  const [defaultPassword, setDefaultPassword] = useState(null);
  const [show, setShow] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log("🚀 ~ file: Login.jsx:25 ~ onSubmit ~ data:", data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Success!",
          text: "You have successfully signed in",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Your have entered wrong credentials!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <LoginRegistration title={"Login Here"}>
      {error?.length > 2 && (
        <p className="my-5 bg-red-50 text-center py-4 rounded-lg text-red-500">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2 text-white text-base font-medium">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          className="py-3 px-3 w-full box-border rounded-lg"
          name="email"
          placeholder="Enter email"
          {...register("email", {
            required: true,
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="text-red-500 mt-2 text-base font-medium">
            Please input your email
          </p>
        )}
        <label className="block mb-2 text-white text-base font-medium mt-5">
          Password <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            className="py-3 px-3 w-full box-border rounded-lg"
            name="password"
            placeholder="Enter password"
            type={show ? "text" : "password"}
            {...register("password", {
              required: true,
            })}
          />
          <span
            className="absolute right-4 top-4 text-lg"
            role="button"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        {errors?.password?.type === "required" && (
          <p className="text-red-500 mt-2 text-base font-medium">
            Please input your password
          </p>
        )}
        <div className="mt-10 flex justify-center">
          <input
            className="btn bg-secondary border-secondary hover:bg-white hover:text-primary text-white font-medium text-lg capitalize transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            type="submit"
            value="Login"
          />
        </div>
      </form>
      <div className="mt-5">
        <p className="text-center text-base text-white">
          Don&apos;t have an account ?{" "}
          <Link to="/register" className="text-secondary hover:underline">
            Sign Up
          </Link>
        </p>
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              setDefaultEmail("student-sports@gmail.com");
              setDefaultPassword("Student$503");
            }}
            className="bg-secondary py-2 px-3 text-base font-semibold text-white border border-primary rounded-l-lg hover:text-primary hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
          >
            Student
          </button>
          <button
            onClick={() => {
              setDefaultEmail("instructor-sports@gmail.com");
              setDefaultPassword("Instructor$503");
            }}
            className="bg-secondary py-2 px-3 text-base font-semibold text-white border border-primary hover:text-primary hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
          >
            Instructor
          </button>
          <button
            onClick={() => {
              setDefaultEmail("admin-sports@gmail.com");
              setDefaultPassword("Admin$503");
            }}
            className="bg-secondary py-2 px-3 text-base font-semibold text-white border border-primary rounded-r-lg hover:text-primary hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
          >
            Admin
          </button>
        </div>
        {defaultEmail && (
          <div className="mt-3 text-center text-white">
            <p>
              <span className="text-secondary">Email:</span> {defaultEmail}
            </p>
            <p>
              <span className="text-secondary">Password:</span>{" "}
              {defaultPassword}
            </p>
          </div>
        )}
      </div>
    </LoginRegistration>
  );
};

export default Login;
