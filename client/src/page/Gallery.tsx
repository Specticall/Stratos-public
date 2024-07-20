import Banner from "../components/gallery/Banner";
import Profile from "../components/gallery/Profile";
import UserDescription from "../components/gallery/UserDescription";
import bannerImage from "/banner.png";

export default function Gallery() {
  return (
    <div>
      <Banner />
      <UserDescription />
    </div>
  );
}
