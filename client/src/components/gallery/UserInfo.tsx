import Badge from "../general/Badge";
import useUserQuery from "../../service/user/useUserQuery";
import Skeleton from "react-loading-skeleton";

export default function UserInfo() {
  const { userData, userQuery } = useUserQuery();

  return (
    <div className="px-8">
      <p className="font-medium mb-8">
        {userData?.location ||
          (userQuery.isPending ? (
            <Skeleton height={"1rem"} width={"10rem"} />
          ) : (
            <p>Location Not yet set</p>
          ))}
      </p>

      <div className="">
        <h4 className="font-medium mb-2">About Me</h4>
        <p className="leading-[200%] text-light">
          {userData?.aboutMe ||
            (userQuery.isPending ? (
              <Skeleton height={"1rem"} width={"100%"} count={3} />
            ) : (
              <p>Not yet set</p>
            ))}
        </p>
      </div>
      <div className="mt-10">
        <p className="font-medium mb-2">Skills</p>
        <div className="flex gap-3 flex-wrap">
          <Badge>Digital Art</Badge>
          <Badge>Character Design</Badge>
          <Badge>Concept Art</Badge>
          <Badge>Illustration</Badge>
        </div>
      </div>
    </div>
  );
}
