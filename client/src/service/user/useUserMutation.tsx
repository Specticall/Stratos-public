import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../API";
import { UserData } from "../../utils/types";
import { useToast } from "../../components/general/Toast";

export default function useUserMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: (data: Partial<UserData>) => {
      return API.patch<UserData>("/user", {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Successfuly updated your profile");
    },
    onError: () => {
      toast.error("Oops! Sometihng went very wrong");
    },
  });

  return { updateUserMutation };
}
