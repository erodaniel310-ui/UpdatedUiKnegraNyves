import AdminSidebar from "../components/Admin/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}