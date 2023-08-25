import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const AllUser = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    fetch(`https://sports-school-server.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${user.name} is an Admin Now!`,
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  const handleMakeInstructor = (user) => {
    fetch(
      `https://sports-school-server.vercel.app/users/instructor/${user._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${user.name} is an Instructor Now!`,
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/dashboard/admin-home">Home</Link>
          </li>
          <li>Manage Users</li>
        </ul>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg px-5">
        <h1 className="my-10 text-2xl font-oswald text-primary font-bold uppercase border-b border-secondary pb-5">
          Manage Users
        </h1>
        <table className="table">
          <thead>
            <tr className="text-base font-medium text-primary bg-secondary">
              <th>#</th>
              <th>image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          user?.image
                            ? user?.image
                            : "https://i.ibb.co/bWMQVhF/no-image.png"
                        }
                        alt="image"
                      />
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td className="capitalize">{user?.role}</td>
                <th className="flex gap-x-2">
                  <button
                    onClick={() => handleMakeInstructor(user)}
                    disabled={user?.role === "instructor"}
                    className={`bg-primary px-3 py-2 text-white rounded-lg hover:text-secondary ${
                      user?.role === "instructor" &&
                      "!bg-gray-300 hover:text-white"
                    }`}
                  >
                    Make Instructor
                  </button>
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    disabled={user?.role === "admin"}
                    className={`bg-primary px-3 py-2 text-white rounded-lg hover:text-secondary ${
                      user?.role === "admin" && "!bg-gray-300 hover:text-white"
                    }`}
                  >
                    Make Admin
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
