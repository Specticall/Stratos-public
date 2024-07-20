import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/general/Button";
import Input from "../components/general/Input";
import { AxiosError } from "axios";
import { ServerErrorResponse } from "../utils/types";
import useLoginMutation from "../service/auth/useLoginMutation";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

type RegisterValues = {
  email: string;
  password: string;
};

export default function Login() {
  const { loginMutation } = useLoginMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterValues>();

  const onSubmit: SubmitHandler<RegisterValues> = (value) => {
    loginMutation.mutate(
      {
        password: value.password,
        email: value.email,
      },
      {
        onError: (error) => {
          const serverError = (error as AxiosError).response?.data;
          const errorMessage = (serverError as ServerErrorResponse).message;

          let errorType: keyof RegisterValues = "email";
          if (errorMessage.includes("email")) errorType = "email";
          if (errorMessage.includes("password")) errorType = "password";

          setError(errorType, {
            message: errorMessage,
          });
        },
        onSuccess: (data) => {
          localStorage.setItem("token", data.data.token);
          navigate("/app/gallery");
        },
      }
    );
  };

  return (
    <main className="grid grid-cols-2">
      <div className="px-8 py-8 grid-rows-[1fr_4fr_1fr] grid">
        <div>
          <div className="text-accent flex items-center hover:opacity-60 transition-all duration-200 cursor-pointer">
            <i className="bx bx-chevron-left text-xl"></i>
            Go Back
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[25rem] w-full mx-auto"
        >
          <p className="font-semibold text-lg mb-4 text-dark">Logo.</p>
          <h1 className="text-[2.25rem] mb-4 text-dark">Login</h1>

          <div className="grid gap-6">
            <Input
              label="Email"
              placeholder="example@mail.com"
              {...register("email", { required: "This field is required" })}
              errorMessage={errors.email?.message}
            />

            <Input
              label="Password"
              placeholder="*****"
              type="password"
              {...register("password", { required: "This field is required" })}
              errorMessage={errors.password?.message}
            />
          </div>
          <Button
            className="w-full py-3 mt-6"
            isLoading={loginMutation.isPending}
          >
            Login
          </Button>
        </form>
        <div className="flex items-center justify-center">
          <p className="text-light">
            Don't have an account?{" "}
            <span className="text-accent underline hover:opacity-60 transition-all duration-200 cursor-pointer">
              Sign In
            </span>
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#E4ECFF] to-[#F2F7FF]w-full min-h-screen"></div>
    </main>
  );
}
