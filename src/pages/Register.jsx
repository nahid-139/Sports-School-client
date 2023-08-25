import { useForm } from "react-hook-form";
import LoginRegistration from "../components/LoginRegistration/LoginRegistration";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, data.photo)
          .then(() => {
            const saveUser = {
              name: data.name,
              email: data.email,
              image: data.photo,
              role: "student",
            };
            fetch("https://sports-school-server.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data?.insertedId) {
                  reset();
                  Swal.fire({
                    title: "Success!",
                    text: "You have successfully signed up",
                    icon: "success",
                    confirmButtonText: "Cool",
                  });
                  navigate("/");
                  window.location.reload();
                }
              });
            console.log("success");
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong!",
              icon: "error",
              confirmButtonText: "Try Again",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <LoginRegistration title={"Registration Here"}>
      {error?.length > 2 && (
        <p className="my-5 bg-red-50 text-center py-4 rounded-lg text-red-500">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2 text-white text-base font-medium">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          className="py-3 px-3 w-full box-border rounded-lg"
          name="name"
          placeholder="Enter your name"
          {...register("name", {
            required: true,
          })}
        />
        {errors?.name?.type === "required" && (
          <p className="text-red-500 mt-2 text-base font-medium">
            Please input your name
          </p>
        )}
        <label className="block mb-2 text-white text-base font-medium mt-5">
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
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
            })}
          />
          <span
            className="absolute right-4 top-4 text-lg"
            role="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {errors?.password?.type === "required" && (
          <p className="text-red-500 mt-2 text-base font-medium">
            Please input your password
          </p>
        )}
        {errors?.password?.type === "minLength" && (
          <p className="text-red-500 mt-2 text-base font-medium">
            Please input at least 6 character
          </p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-red-500 mt-2 text-base font-medium">
            Password must have one uppercase and one special character.
          </p>
        )}
        <label className="block mb-2 text-white text-base font-medium mt-5">
          Confirm Password <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            className="py-3 px-3 w-full box-border rounded-lg"
            name="confirm_password"
            placeholder="Enter confirm password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirm_password", {
              required: true,
              validate: (value) =>
                value === watch("password") ||
                "The confirm password does not matched",
            })}
          />
          <span
            className="absolute right-4 top-4 text-lg"
            role="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {errors?.confirm_password?.type === "required" && (
          <p className="text-red-500 mt-2 text-base font-medium">
            Please input confirm password
          </p>
        )}
        {errors?.confirm_password && (
          <p className="text-red-500 mt-2 text-base font-medium">
            {errors.confirm_password.message}
          </p>
        )}
        <label className="block mb-2 text-white text-base mt-5 font-medium">
          Photo Url <span className="text-red-600">*</span>
        </label>
        <input
          className="py-3 px-3 w-full box-border rounded-lg"
          name="photo"
          placeholder="Enter your photo url"
          {...register("photo", {
            required: true,
          })}
        />
        {errors?.photo?.type === "required" && (
          <p className="text-red-500 mt-2 text-base font-medium">
            Please input your photo url
          </p>
        )}
        <div className="mt-10 flex justify-center">
          <input
            className="btn bg-secondary border-secondary hover:bg-white hover:text-primary text-white font-medium text-lg capitalize transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            type="submit"
            value="Register"
          />
        </div>
      </form>
      <div className="mt-5">
        <p className="text-center text-base text-white">
          Already registered ?{" "}
          <Link to="/login" className="text-secondary hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </LoginRegistration>
  );
};

export default Register;
