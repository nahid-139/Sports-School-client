import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useInstructorClass = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: data = [] } = useQuery({
    queryKey: ["data", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/instructor/class?email=${user?.email}`);
      return res.data;
    },
  });

  return [data, refetch];
};
export default useInstructorClass;
