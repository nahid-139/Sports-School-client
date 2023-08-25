import { Link } from "react-router-dom";
import useSelectClass from "../../../hooks/useSelectClass";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MySelectedClass = () => {
  const [selectedClass, refetch] = useSelectClass();
  const [axiosSecure] = useAxiosSecure();

  const selectedClasses = selectedClass?.filter((item)=> item?.payment_status === "unpaid")
  

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#043c7c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/class/select/${item?._id}`).then((res) => {
          console.log("deleted res", res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your selected class has been deleted.", "success");
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
          <li>My Selected Classes</li>
        </ul>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg px-5">
        <h1 className="my-10 text-2xl font-oswald text-primary font-bold uppercase border-b border-secondary pb-5">
          My Selected Classes
        </h1>
        <table className="table">
          <thead>
            <tr className="text-base font-medium text-primary bg-secondary">
              <th>#</th>
              <th>image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Price</th>
              <th>Payment status</th>
              <th>Make Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedClasses?.map((c, index) => (
              <tr key={c?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          c?.item?.image
                            ? c?.item?.image
                            : "https://i.ibb.co/bWMQVhF/no-image.png"
                        }
                        alt="image"
                      />
                    </div>
                  </div>
                </td>
                <td>{c?.item?.class_name}</td>
                <td>{c?.item?.instructor_name}</td>
                <td>${c?.item?.price}</td>
                <td className="text-red-600">{c?.payment_status}</td>

                <td>
                  <Link
                    to={`/dashboard/payment/?item=${c?.item?._id}&price=${c?.item?.price}`}
                    className={`bg-secondary border border-secondary hover:text-secondary p-2.5 text-white text-base font-semibold rounded-lg hover:bg-white`}
                  >
                    Pay
                  </Link>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(c)}
                    className={`bg-red-600 border border-red-600 hover:text-red-600 p-3 text-white rounded-lg hover:bg-white`}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClass;
