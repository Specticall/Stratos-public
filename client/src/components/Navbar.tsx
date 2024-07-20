import { useNavigate } from "react-router-dom";
import Button from "./general/Button";

const links = [
  {
    display: "My Gallery",
    icon: <i className="bx bx-palette"></i>,
    route: "gallery",
  },
  {
    display: "Explore",
    icon: <i className="bx bx-grid-alt"></i>,
    route: "explore",
  },
  {
    display: "Find Artist",
    icon: <i className="bx bx-search-alt-2"></i>,
    route: "find-artist",
  },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center px-6 py-3">
      <p className="mr-8 font-semibold text-xl">Logo.</p>
      <ul className="flex flex-1 gap-4">
        {links.map(({ display, icon, route }) => {
          return (
            <li
              className="[&>i]:text-lg flex gap-4 justify-center items-center text-dark hover:bg-slate-200 px-4 py-1 rounded-md duration-200 transition-all cursor-pointer"
              key={display}
              onClick={() => navigate("/app/" + route)}
            >
              {icon}
              <p>{display}</p>
            </li>
          );
        })}
      </ul>
      <div>
        <Button variant={"primary"}>Create Post</Button>
      </div>
    </nav>
  );
}
