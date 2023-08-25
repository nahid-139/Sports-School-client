import { Link } from "react-router-dom";
import useSelectClass from "../../../hooks/useSelectClass";

const MyEnrolledClass = () => {
    const [selectedClass] = useSelectClass();

    const selectedClasses = selectedClass?.filter(
      (item) => item?.payment_status === "paid"
    );

    return (
      <div>
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/dashboard/instructor-home">Home</Link>
            </li>
            <li>My Enrolled Classes</li>
          </ul>
        </div>
        <div className="overflow-x-auto shadow-lg rounded-lg px-5">
          <h1 className="my-10 text-2xl font-oswald text-primary font-bold uppercase border-b border-secondary pb-5">
            My Enrolled Classes
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
                  <td className="text-green-600">{c?.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyEnrolledClass;