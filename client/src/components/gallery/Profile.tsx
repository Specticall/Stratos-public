import Skeleton from "react-loading-skeleton";
import { useUser } from "../../context/UserContext";
import useUsersQuery from "../../service/user/useUserQuery";
import Button from "../general/Button";
import ProfilePicture from "../general/ProfilePicture";
import ProfileStatistics from "./ProfileStatistics";

export default function Profile() {
  const { userData } = useUsersQuery();

  return (
    <div className="px-6 absolute bottom-[-2rem]  left-0 right-0">
      <article className="bg-white  flex justify-between items-center max-w-[1200px] mx-auto px-8 py-5 rounded-lg shadow-lg shadow-slate-900/5">
        <div className="flex gap-8">
          <ProfilePicture />
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-xl font-semibold leading-[100%] mb-2">
              {userData?.username || (
                <Skeleton height={"1.75rem"} width={"8rem"} />
              )}
            </h1>
            <p className="text-slate-500">
              {userData?.tag || <Skeleton height={"1rem"} width={"5rem"} />}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Button
              to="/app/settings/user-profile"
              variant="secondary"
              className="h-fit"
            >
              Edit Profile
            </Button>
          </div>
        </div>
        <ProfileStatistics />
      </article>
    </div>
  );
}
