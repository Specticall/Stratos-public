import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}
