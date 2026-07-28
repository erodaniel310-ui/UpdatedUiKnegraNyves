import {
  LayoutDashboard,
  Package,
  ShoppingBag,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    path: "/admin",
  },
  {
    icon: Package,
    title: "Products",
    path: "/admin/products",
  },
  {
    icon: ShoppingBag,
    title: "Orders",
    path: "/admin/orders",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 bg-white border-r">
      <div className="h-20 flex items-center justify-center border-b">
        <h2 className="text-2xl font-black tracking-widest">
          ADMIN
        </h2>
      </div>

      <nav className="p-5 space-y-2">
        {links.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl transition ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            <item.icon size={20} />
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}