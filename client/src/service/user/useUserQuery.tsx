import { useQuery } from "@tanstack/react-query";
import { API } from "../API";
import { UserData } from "../../utils/types";

export default function useUserQuery() {
  const userQuery = useQuery({
    queryFn: () => API.get<UserData>(`/user`),
    queryKey: ["users"],
  });

  const userData = userQuery.data?.data;

  return { userQuery, userData };
}
