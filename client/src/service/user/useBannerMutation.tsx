import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../API";
import { useToast } from "../../components/general/Toast";

export default function useBannerMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (formData: FormData) =>
      API.post("/user/banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Successfuly updated your gallery banner");
    },
    onError: () => {
      toast.error("Oops, Something went wrong");
    },
  });

  return { updateMutation };
}
