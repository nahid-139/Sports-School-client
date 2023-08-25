import { useQuery } from "@tanstack/react-query";
import PageTitle from "../components/common/PageTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useSelectClass from "../hooks/useSelectClass";
import { motion } from "framer-motion";
import CardMotion from "../components/motion/cardMotion";

const Classes = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [selectedClass] = useSelectClass();
  const [axiosSecure] = useAxiosSecure();
  const { data: classList = [], refetch } = useQuery(
    ["class/approved"],
    async () => {
      const res = await axiosSecure.get("/class/approved");
      return res.data;
    }
  );

  const handleSelectClass = (item) => {
    if (!user) {
      Swal.fire({
        title: "Warning!",
        text: "Login first to select this class!",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      const classItem = {
        item: item,
        email: user.email,
        payment_status: "unpaid",
      };
      fetch("https://sports-school-server.vercel.app/class/select", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(classItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch(); // refetch cart to update the number of items in the cart
            Swal.fire({
              title: "Success!",
              text: "You have successfully selected this class!",
              icon: "success",
              confirmButtonText: "Cool",
            });
          }
        });
    }
  };
  return (
    <div>
      <PageTitle title={"Our Classes"}></PageTitle>
      <div className="">
        <div className="max-w-screen-xl mx-auto py-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:px-0 px-5 gap-8">
          {classList?.map((c) => (
            <CardMotion key={c?._id}>
              <div
                key={c?._id}
                className={`bg-white rounded-lg shadow-lg p-5 border hover:border-secondary ${
                  c?.seats === 0 && "!bg-red-600 text-white"
                }`}
              >
                <div className="h-[250px] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: [null, 1.2] }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={c?.image}
                      alt=""
                      className="h-[250px] rounded-lg w-full"
                    />
                  </motion.div>
                </div>
                <h1 className="text-2xl font-semibold font-oswald mt-4 mb-4 text-secondary">
                  {c?.class_name}
                </h1>
                <div className="space-y-2">
                  <p className="text-lg">
                    <span className="font-medium font-open_sans">
                      Instructor :{" "}
                    </span>
                    {c?.instructor_name}
                  </p>
                  <p className="text-lg">
                    <span className="font-medium font-open_sans">
                      Available Seats :{" "}
                    </span>
                    {c?.seats}
                  </p>
                  <p className="text-lg">
                    <span className="font-medium font-open_sans">Price : </span>
                    ${c?.price}
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleSelectClass(c)}
                    className="btn w-full bg-secondary !border-secondary hover:bg-white hover:text-primary text-white font-medium text-lg capitalize"
                    disabled={
                      c?.seats === 0 ||
                      isAdmin ||
                      isInstructor ||
                      selectedClass?.item?._id === c?._id
                    }
                  >
                    {" "}
                    select
                  </button>
                </div>
              </div>
            </CardMotion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
