import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            class_name,
            instructor_name,
            instructor_email,
            seats,
            price,
          } = data;
          const newClass = {
            class_name,
            instructor_name,
            instructor_email,
            seats: parseInt(seats),
            price: parseFloat(price),
            image: imgURL,
            status: "pending",
            student: parseInt(0),
          };
          axiosSecure.post("/class", newClass).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                title: "Success!",
                text: "Successfully added a new class!",
                icon: "success",
                confirmButtonText: "Cool",
              });
            }
          });
        }
      });
  };

  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/dashboard/instructor-home">Home</Link>
          </li>
          <li>Add Class</li>
        </ul>
      </div>
      <div className="bg-gray-200 shadow-lg py-10 lg:px-32 md:px-20 px-5 rounded-lg mt-5">
        <h1 className="my-10 text-2xl font-oswald text-primary font-bold uppercase border-b border-secondary pb-5">
          Add New Class
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-primary text-base font-medium">
              Class Name <span className="text-red-600">*</span>
            </label>
            <input
              className="py-3 px-3 w-full box-border border-2 border-primary focus:outline-secondary rounded-lg"
              name="class_name"
              {...register("class_name", {
                required: true,
              })}
            />
            {errors?.class_name?.type === "required" && (
              <p className="text-red-500 mt-2 text-base font-medium">
                Please input class name
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-primary text-base font-medium">
              Instructor Name <span className="text-red-600">*</span>
            </label>
            <input
              className="py-3 px-3 w-full box-border border-2 border-primary focus:outline-secondary rounded-lg"
              name="instructor_name"
              value={user?.displayName}
              readOnly
              {...register("instructor_name", {
                required: true,
              })}
            />
          </div>
          <div>
            <label className="block mb-2 text-primary text-base font-medium">
              Instructor Email <span className="text-red-600">*</span>
            </label>
            <input
              className="py-3 px-3 w-full box-border border-2 border-primary focus:outline-secondary rounded-lg"
              name="instructor_email"
              value={user?.email}
              readOnly
              {...register("instructor_email", {
                required: true,
              })}
            />
          </div>
          <div>
            <label className="block mb-2 text-primary text-base font-medium">
              Available Seats <span className="text-red-600">*</span>
            </label>
            <input
              className="py-3 px-3 w-full box-border border-2 border-primary focus:outline-secondary rounded-lg"
              name="seats"
              type="number"
              {...register("seats", {
                required: true,
              })}
            />
            {errors?.seats?.type === "required" && (
              <p className="text-red-500 mt-2 text-base font-medium">
                Please input the number of available seats
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-primary text-base font-medium">
              Price <span className="text-red-600">*</span>
            </label>
            <input
              className="py-3 px-3 w-full box-border border-2 border-primary focus:outline-secondary rounded-lg"
              name="price"
              type="number"
              {...register("price", {
                required: true,
              })}
            />
            {errors?.price?.type === "required" && (
              <p className="text-red-500 mt-2 text-base font-medium">
                Please input the price
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-primary text-base font-medium">
              Image <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered file-input-warning w-full"
              {...register("image", {
                required: true,
              })}
            />
            {errors?.image?.type === "required" && (
              <p className="text-red-500 mt-2 text-base font-medium">
                Please input an image
              </p>
            )}
          </div>
          <div className="mt-10 flex justify-center">
            <input
              className="btn bg-secondary border-secondary hover:bg-white hover:text-primary text-white font-medium text-lg capitalize transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
