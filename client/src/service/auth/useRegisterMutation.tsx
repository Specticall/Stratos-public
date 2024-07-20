import { useMutation } from "@tanstack/react-query";
import { API } from "../API";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

type RegisterFields = {
  password: string;
  username: string;
  email: string;
};

export default function useRegisterMutation() {
  const { setUserId } = useUser();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (fields: RegisterFields) => {
      return API.post<{ token: string; userId: string }>(
        "/auth/register",
        fields
      );
    },
    onSuccess(data) {
      setUserId(data.data.userId);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.userId);
      navigate("/app/gallery");
    },
  });

  return { registerMutation };
}
