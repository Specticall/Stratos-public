import { useMutation } from "@tanstack/react-query";
import { API } from "../API";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

type LoginFields = {
  password: string;
  email: string;
};

export default function useLoginMutation() {
  const { setUserId } = useUser();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (fields: LoginFields) => {
      return API.post<{ token: string; userId: string }>("/auth/login", fields);
    },
    onSuccess(data) {
      setUserId(data.data.userId);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.userId);
      navigate("/app/gallery");
    },
  });

  return { loginMutation };
}
