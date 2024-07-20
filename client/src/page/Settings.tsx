import { Outlet } from "react-router-dom";
import SettingsNavbar from "../components/settings/SettingsNavbar";

export default function Settings() {
  return (
    <main className="section grid grid-cols-[1fr_4fr]">
      <div className="col-span-2 mt-12 border-b-[1px] border-slate-200 pb-4 mb-4">
        <h1 className="text-xl font-semibold mb-1">Settings</h1>
        <p className="text-light">
          Manage your account settings an preferences
        </p>
      </div>
      <SettingsNavbar />
      <Outlet />
    </main>
  );
}
