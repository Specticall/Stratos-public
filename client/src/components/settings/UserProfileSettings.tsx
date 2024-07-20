import { SubmitHandler, useForm } from "react-hook-form";
import useUserQuery from "../../service/user/useUserQuery";
import Button from "../general/Button";
import Input from "../general/Input";
import ProfilePicture from "../general/ProfilePicture";
import TextArea from "../general/TextArea";
import { useEffect } from "react";
import useUserMutation from "../../service/user/useUserMutation";

export type UserProfileFormValues = {
  username: string;
  location: string;
  aboutMe: string;
  email: string;
};

export default function UserProfileSettings() {
  const { updateUserMutation } = useUserMutation();
  const { userData, userQuery } = useUserQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileFormValues>({
    defaultValues: {
      username: userData?.username || "",
      location: userData?.location || "",
      email: userData?.email || "",
      aboutMe: userData?.aboutMe || "",
    },
  });

  useEffect(() => {
    reset(userData);
  }, [userData, reset]);

  const onSubmit: SubmitHandler<UserProfileFormValues> = (value) => {
    updateUserMutation.mutate({
      username: value.username,
      email: value.email,
      location: value.location,
      aboutMe: value.aboutMe,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-12 py-6">
      <h1 className="text-xl mb-1">Profile</h1>
      <p className="text-slate-500 mb-6">
        How others will see your information in your home page
      </p>
      <ProfilePicture className="w-24" />

      <div className="pt-8 grid gap-8">
        <Input
          placeholder="Username"
          label="Username"
          {...register("username", { required: "This field can't be empty" })}
          isLoading={userQuery.isLoading}
        />
        <Input
          placeholder="Email"
          label="Email"
          {...register("email", { required: "This field can't be empty" })}
          isLoading={userQuery.isLoading}
        />
        <Input
          placeholder="Tag"
          label="Tag"
          hint="Tags is a way for other people to find and mention you. You can’t change your tag once you have set them."
          disabled
          value={userData?.tag}
          isLoading={userQuery.isLoading}
        />
        <Input
          placeholder="Location"
          label="Location"
          hint="Your location will help potential customers to know when you might be available"
          {...register("location")}
          isLoading={userQuery.isLoading}
        />
        <TextArea
          placeholder="About Me"
          label="About Me"
          {...register("aboutMe")}
          isLoading={userQuery.isLoading}
        />
      </div>
      <div className="mt-24 flex items-end justify-end">
        <Button variant={"primary"} isLoading={updateUserMutation.isPending}>
          Save
        </Button>
      </div>
    </form>
  );
}
