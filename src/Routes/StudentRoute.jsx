import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { CirclesWithBar } from "react-loader-spinner";
import useStudent from "../hooks/useStudent";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isStudent, isStudentLoading] = useStudent();
  const location = useLocation();

  if (loading || isStudentLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      </div>
    );
  }

  if (user && isStudent) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;
