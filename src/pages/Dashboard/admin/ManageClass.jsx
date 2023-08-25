import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classList = [], refetch } = useQuery(["class"], async () => {
    const res = await axiosSecure.get("/class");
    return res.data;
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [open, setOpen] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [confirmLoading] = useState(false);
  const [modalDetails, setModalDetails] = useState("");
  const [feedback, setFeedback] = useState("");

  const showModal = () => {
    setOpen(true);
  };
  const showFeedbackModal = () => {
    setOpenFeedback(true);
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };
  const handleCancelFeedback = () => {
    reset();
    setOpenFeedback(false);
  };

  const handleMakeApprove = (c) => {
    fetch(`https://sports-school-server.vercel.app/class/approve/${c._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${c?.class_name} Class is Approved Now!`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  const handleMakeDeny = (d) => {
    fetch(`https://sports-school-server.vercel.app/class/deny/${d._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${d?.class_name} Class is Denied Now!`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  const onSubmit = (data) => {
    console.log("🚀 ~ file: ManageClass.jsx:77 ~ onSubmit ~ data:", data);
    fetch(`https://sports-school-server.vercel.app/class/${data.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          reset();
          refetch();
          setOpen(false);
          Swal.fire({
            title: "Success!",
            text: `Sent Feedback`,
            icon: "success",
            confirmButtonText: "Ok",
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
          <li>Manage Class</li>
        </ul>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg px-5">
        <h1 className="my-10 text-2xl font-oswald text-primary font-bold uppercase border-b border-secondary pb-5">
          Manage Classes
        </h1>
        <table className="table">
          <thead>
            <tr className="text-base font-medium text-primary bg-secondary">
              <th>#</th>
              <th>image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classList?.map((c, index) => (
              <tr key={c?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          c?.image
                            ? c?.image
                            : "https://i.ibb.co/bWMQVhF/no-image.png"
                        }
                        alt="image"
                      />
                    </div>
                  </div>
                </td>
                <td>{c?.class_name}</td>
                <td>{c?.instructor_name}</td>
                <td>{c?.instructor_email}</td>
                <td>{c?.seats}</td>
                <td>${c?.price}</td>
                <td
                  className={`${c?.status === "pending" && "text-secondary"} ${
                    c?.status === "approved" && "text-green-600"
                  } ${c?.status === "denied" && "text-red-600"} capitalize`}
                >
                  {c?.status}
                </td>
                <th className="flex gap-x-2 capitalize">
                  <button
                    onClick={() => handleMakeApprove(c)}
                    className={`bg-green-600 px-3 py-2 text-white rounded-lg hover:text-green-600 hover:bg-white border border-green-600 ${
                      (c?.status === "approved" || c?.status === "denied") &&
                      "!bg-gray-300 !border-gray-300 hover:text-white"
                    }`}
                    disabled={
                      c?.status === "denied" || c?.status === "approved"
                    }
                  >
                    approve
                  </button>
                  <button
                    onClick={() => handleMakeDeny(c)}
                    className={`bg-red-600 px-3 py-2 text-white rounded-lg hover:text-red-600 border border-red-600 hover:bg-white ${
                      (c?.status === "approved" || c?.status === "denied") &&
                      "!bg-gray-300 !border-gray-300 hover:text-white"
                    }`}
                    disabled={
                      c?.status === "denied" || c?.status === "approved"
                    }
                  >
                    deny
                  </button>
                  {c?.feedback ? (
                    <button
                      onClick={() => {
                        showFeedbackModal(), setFeedback(c?.feedback);
                      }}
                      className="cursor-pointer text-primary underline px-3 hover:text-secondary"
                    >
                      view feedback
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        showModal(), setModalDetails(c?._id);
                      }}
                      className={`bg-primary px-3 py-2 text-white rounded-lg hover:text-primary border border-primary hover:bg-white ${
                        (c?.status === "approved" || c?.status === "pending") &&
                        "!bg-gray-300 !border-gray-300 hover:text-white"
                      }`}
                      disabled={
                        c?.status === "pending" || c?.status === "approved"
                      }
                    >
                      send feedback
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="Feedback"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              rows="4"
              cols=""
              className="py-3 px-3 w-full box-border border-2 border-primary focus:outline-secondary rounded-lg"
              name="feedback"
              {...register("feedback", {
                required: true,
              })}
            ></textarea>
            {errors?.feedback?.type === "required" && (
              <p className="text-red-500 mt-2 text-base font-medium">
                Please input feedback
              </p>
            )}
            <input
              type="hidden"
              value={modalDetails}
              name="id"
              {...register("id", {
                required: true,
              })}
            />
            <div className="mt-5 flex justify-end">
              <input
                className="btn bg-secondary border-secondary hover:bg-white hover:text-primary text-white font-medium text-lg capitalize transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        title="Feedback"
        open={openFeedback}
        onCancel={handleCancelFeedback}
        footer={null}
      >
        <div>
          <p>{feedback}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ManageClass;
