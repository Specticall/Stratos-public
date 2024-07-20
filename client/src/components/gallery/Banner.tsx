import Image from "../general/Image";
import BannerImage from "./BannerImageEditor";
import Profile from "./Profile";

export default function Banner() {
  return (
    <div className="relative">
      <BannerImage />
      <Profile />
    </div>
  );
}
