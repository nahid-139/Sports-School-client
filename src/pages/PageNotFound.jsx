import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const PageNotFound = () => {
  return (
    <div>
      <div className="text-center mt-10 pb-20">
        <div className="flex justify-center">
          <img
            src="https://i.ibb.co/D9P8M8Y/404-error-dribbble-800x600.gif"
            alt=""
          />
        </div>
        <h2 className="text-5xl font-oswald font-bold text-primary ">
          Oops! Page Not Found!
        </h2>
        <p className="text-lg font-open_sans my-8">
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </p>
        <Link to="/">
          <Button text={"Back To Home"}></Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
