import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AiOutlineLogout, AiOutlineMenuUnfold } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlinePreview, MdPayment } from "react-icons/md";
import { FaHome, FaUsers, FaCalendarAlt, FaBookReader } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useStudent from "../hooks/useStudent";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
          <AiOutlineMenuUnfold
            className="ml-10 mt-5 bg-primary p-2 text-white rounded-lg"
            size={42}
          />
        </label>
        <div className="pt-5 px-10">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side bg-primary">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 text-base text-white dashboard space-y-2 font-open_sans font-medium">
          {/* Sidebar content here */}
          <li>
            <div className="flex flex-col text-center mx-auto py-5">
              <div className="flex justify-center ">
                <img
                  src="https://i.ibb.co/r6t5b3R/images-removebg-preview-1.png"
                  className="h-[100px] w-[100px]"
                  alt="logo"
                />
              </div>
              <h1 className="font-oswald text-2xl md:text-3xl uppercase font-bold text-white">
                <span className="text-secondary">Sports</span> School
              </h1>
              <h3 className="text-xl uppercase text-secondary font-semibold mt-2 font-oswald">
                {isAdmin && "Admin"}
                {isInstructor && "Instructor"}
                {isStudent && "Student"}
              </h3>
            </div>
          </li>

          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/admin-home">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-class">
                  {" "}
                  <SiGoogleclassroom /> Manage Classes
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers></FaUsers> Manage Users
                </NavLink>
              </li>
            </>
          )}
          {isInstructor && (
            <>
              <li>
                <NavLink to="/dashboard/instructor-home">
                  <FaHome></FaHome> Instructor Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-class">
                  {" "}
                  <FaBookReader /> Add Class
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/instructor/my-class">
                  <SiGoogleclassroom /> My Classes
                </NavLink>
              </li>
            </>
          )}
          {isStudent && (
            <>
              <li>
                <NavLink to="/dashboard/student-home">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/selected-class">
                  <FaCalendarAlt></FaCalendarAlt> My Selected Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/enrolled-class">
                  <SiGoogleclassroom /> My Enrolled Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history">
                  <MdPayment /> Payment History
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/">
              <MdOutlinePreview></MdOutlinePreview> Live Website
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogOut}>
              <AiOutlineLogout></AiOutlineLogout> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
