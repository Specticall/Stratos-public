import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/general/Button";
import Checkbox from "../components/general/Checkbox";
import Input from "../components/general/Input";
import useRegisterMutation from "../service/auth/useRegisterMutation";
import { AxiosError } from "axios";
import { ServerErrorResponse } from "../utils/types";

type RegisterValues = {
  email: string;
  username: string;
  password: string;
  acceptedTerms: boolean;
};

export default function Register() {
  const { registerMutation } = useRegisterMutation();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<RegisterValues>();

  const onSubmit: SubmitHandler<RegisterValues> = (value) => {
    registerMutation.mutate(
      {
        username: value.username,
        password: value.password,
        email: value.email,
      },
      {
        onError: (error) => {
          const serverError = (error as AxiosError).response?.data;
          const errorMessage = (serverError as ServerErrorResponse).message;

          let errorType: keyof RegisterValues = "email";
          if (errorMessage.includes("email")) errorType = "email";

          setError(errorType, {
            message: errorMessage,
          });
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
          <h1 className="text-[2.25rem] mb-4 text-dark">Register</h1>

          <div className="grid gap-6">
            <Input
              label="Email"
              placeholder="example@mail.com"
              {...register("email", { required: "This field is required" })}
              errorMessage={errors.email?.message}
            />
            <Input
              label="Username"
              placeholder="myusername"
              {...register("username", { required: "This field is required" })}
              errorMessage={errors.username?.message}
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
            isLoading={registerMutation.isPending}
          >
            Register
          </Button>
          <p className="text-center mt-4 text-red-400">
            {errors.acceptedTerms?.message}
          </p>
          <Controller
            name="acceptedTerms"
            rules={{ required: "You haven't accepted our terms of service" }}
            control={control}
            render={({ field: { onChange } }) => {
              return (
                <div className="flex gap-2 items-center mt-10">
                  <Checkbox size="sm" onChange={onChange} />
                  <p className="text-slate-500">
                    I accept the{" "}
                    <span className="underline text-dark hover:text-accent duration-200 transition-all cursor-pointer">
                      Terms of Service and Privacy Policy
                    </span>
                  </p>
                </div>
              );
            }}
          />
        </form>
        <div className="flex items-center justify-center">
          <p className="text-light">
            Already have an account?{" "}
            <span className="text-accent underline hover:opacity-60 transition-all duration-200 cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#E4ECFF] to-[#F2F7FF]w-full min-h-screen"></div>
    </main>
  );
}
