import { Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import toast from "react-hot-toast";

export default function AdminHeader({ onAdd }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error("Failed to logout");
    }
  }

  return (
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-4xl font-black">
          Products
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your luxury fashion products.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-[#D4AF37] transition"
        >
          <Plus size={18} />
          Add Product
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}