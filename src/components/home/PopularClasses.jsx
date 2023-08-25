import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CardMotion from "../motion/cardMotion";
import { motion } from "framer-motion";
import SubCardMotion from "../motion/subCardMotion";

const OurClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classList = [] } = useQuery(["class/popular"], async () => {
    const res = await axiosSecure.get("/class/popular");
    return res.data;
  });
  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto py-20">
        <CardMotion>
          <h1 className="text-4xl font-bold font-oswald text-center">
            Popular <span className="text-secondary">Classes</span>
          </h1>
        </CardMotion>
        <SubCardMotion>
          <p className="text-lg font-open_sans italic text-center mt-2">
            Join our sports training class and be healthy.
          </p>
        </SubCardMotion>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:px-0 px-5 gap-8 mt-12">
          {classList?.map((c) => (
            <CardMotion key={c?._id}>
              <div
                className={`bg-white rounded-lg shadow-lg p-5 border hover:border-secondary h-full`}
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
                <h1 className="text-2xl font-semibold font-oswald mt-4 mb-4 text-secondary ">
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
                    <span className="font-medium font-open_sans">
                      Students :{" "}
                    </span>
                    {c?.student}
                  </p>
                  <p className="text-lg">
                    <span className="font-medium font-open_sans">Price : </span>
                    ${c?.price}
                  </p>
                </div>
              </div>
            </CardMotion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurClasses;
