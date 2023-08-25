import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CardMotion from "../motion/cardMotion";
import SubCardMotion from "../motion/subCardMotion";
import { motion } from "framer-motion";

const PopularInstructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: instructors = [] } = useQuery(
    ["instructors/popular"],
    async () => {
      const res = await axiosSecure.get("/instructors/popular");
      return res.data;
    }
  );

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto pb-12 lg:px-0 px-5">
        <CardMotion>
          <h1 className="text-4xl font-bold font-oswald text-center">
            Popular <span className="text-secondary">Instructors</span>
          </h1>
        </CardMotion>
        <SubCardMotion>
          <p className="text-lg font-open_sans italic text-center mt-2">
            Join our sports school instructor and be good player.
          </p>
        </SubCardMotion>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-8 mt-12">
          {instructors?.map((c) => (
            <CardMotion key={c?._id}>
              <div
                className={`bg-white rounded-lg shadow-lg p-5 border hover:border-secondary ${
                  c?.seats === 0 && "!bg-red-600 text-white"
                }`}
              >
                <div className="md:h-[300px] h-[230px] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: [null, 1.2] }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={c?.image}
                      alt=""
                      className="md:h-[300px] h-[230px] rounded-lg w-full object-cover"
                    />
                  </motion.div>
                </div>
                <h1 className="text-2xl font-semibold font-oswald mt-4 mb-4 text-secondary text-center">
                  {c?.name}
                </h1>
                <div className="space-y-2 text-center">
                  <p className="text-lg">
                    <span className="font-medium font-open_sans">Email : </span>
                    {c?.email}
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

export default PopularInstructors;
