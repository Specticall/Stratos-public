import UserInfo from "./UserInfo";
import UserSales from "./UserSales";

export default function UserDescription() {
  return (
    <article className="grid grid-cols-[5fr_4fr] gap-12 mt-20 section ">
      <UserInfo />
      <UserSales />
    </article>
  );
}
