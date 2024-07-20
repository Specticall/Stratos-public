import Skeleton from "react-loading-skeleton";
import useUserQuery from "../../service/user/useUserQuery";
import { cn } from "../../utils/helper";

export default function ProfileStatistics() {
  const { userData, userQuery } = useUserQuery();

  return (
    <div className="flex gap-8 items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-1">
        <p>Rating</p>
        <p
          className={cn(
            "text-2xl font-semibold",
            userQuery.isLoading && "leading-[0%]"
          )}
        >
          {/* Before Render (Loading state) */}
          {userQuery.isLoading ? (
            <Skeleton height={"2rem"} width={"4rem"} />
          ) : // After Render (Rating exist / not)
          userData?.rating ? (
            `${userData.rating} / 5`
          ) : (
            "N/A"
          )}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <p>Followers</p>
        <p
          className={cn(
            "text-2xl font-semibold",
            userQuery.isLoading && "leading-[0%]"
          )}
        >
          {userData?.followers ?? <Skeleton height={"2rem"} width={"4rem"} />}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <p>Likes</p>
        <p className="text-2xl font-semibold">334K</p>
      </div>
    </div>
  );
}
