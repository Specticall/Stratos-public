import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../utils/helper";

const settings = [
  { display: "User Profile", link: "user-profile" },
  { display: "Accounts", link: "account" },
  { display: "Payments", link: "payment" },
  { display: "Display", link: "display" },
  { display: "Notification", link: "notification" },
];

export default function SettingsNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col items-start">
      {settings.map((setting) => {
        return (
          <button
            key={setting.display}
            className={cn(
              "px-4 py-3 hover:bg-slate-100 cursor-pointer rounded-md transition-all duration-200 w-full text-start",
              pathname.includes(setting.link) && "bg-slate-100"
            )}
            onClick={() => navigate("/app/settings/" + setting.link)}
          >
            {setting.display}
          </button>
        );
      })}
    </aside>
  );
}
