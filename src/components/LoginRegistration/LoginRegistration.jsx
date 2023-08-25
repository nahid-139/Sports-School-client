import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";

const LoginRegistration = ({ children, title }) => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        image: loggedInUser.photoURL,
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
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "You have successfully signed in",
            icon: "success",
            confirmButtonText: "Cool",
          });
          navigate(from, { replace: true });
        });
    });
  };
  return (
    <div className="bg-primary flex border-b">
      <div className="lg:w-1/2  hidden min-h-screen lg:flex items-center justify-center">
        <img
          src="https://i.ibb.co/HnTqKW7/depositphotos-21113977-stock-photo-two-football-players-striking-the.webp"
          className="w-full h-full"
          alt=""
        />
      </div>
      <div className="lg:w-1/2 mx-auto mb-20 mt-20">
        <div className="">
          <div className=" text-center mx-auto">
            <div className="flex justify-center ">
              <img
                src="https://i.ibb.co/r6t5b3R/images-removebg-preview-1.png"
                className="h-[124px] w-[124px]"
                alt="logo"
              />
            </div>
            <h1 className="font-oswald text-2xl md:text-4xl uppercase font-bold text-white">
              <span className="text-secondary">Sports</span> School
            </h1>
            <h3 className="text-xl uppercase text-secondary font-semibold mt-4 font-oswald">
              {title}
            </h3>
          </div>
          <div className="login py-8 max-w-[400px] min-w-[250px] mx-auto">
            {children}
            <div className="divider text-white mt-10">OR</div>
            <div
              onClick={handleGoogleSignIn}
              className="border border-[#D0D0D0] rounded-[8px] h-[90px] w-[90px] flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer mx-auto mt-10 hover:bg-secondary "
            >
              <FcGoogle size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;
