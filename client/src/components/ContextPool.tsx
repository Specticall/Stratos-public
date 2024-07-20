import { Outlet } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import ToastProvider from "./general/Toast";

export default function ContextPool() {
  return (
    <UserProvider>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </UserProvider>
  );
}
