import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  UserIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CubeIcon,
  TruckIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Common navigation items for all roles
  const commonNavItems = [
    {
      to: "/dashboard",
      icon: <UserIcon className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      to: "/inventory",
      icon: <CubeIcon className="h-5 w-5" />,
      label: "Inventory",
    },
    {
      to: "/shipments",
      icon: <TruckIcon className="h-5 w-5" />,
      label: "Shipments",
    },
  ];

  // Role-specific navigation items
  const roleNavItems = {
    "super-admin": [
      {
        to: "/admin/warehouses",
        icon: <BuildingOfficeIcon className="h-5 w-5" />,
        label: "Warehouses",
      },
      {
        to: "/admin/users",
        icon: <UserGroupIcon className="h-5 w-5" />,
        label: "User Management",
      },
    ],
    manager: [
      {
        to: "/manager/inventory",
        icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
        label: "Manage Inventory",
      },
      {
        to: "/manager/shipments",
        icon: <EnvelopeIcon className="h-5 w-5" />,
        label: "Process Shipments",
      },
    ],
    user: [
      {
        to: "/user/pricing",
        icon: <CurrencyDollarIcon className="h-5 w-5" />,
        label: "Pricing Calculator",
      },
      {
        to: "/user/reports",
        icon: <ChartBarIcon className="h-5 w-5" />,
        label: "Reports",
      },
    ],
  };

  // Combine common and role-specific items
  const navItems = [...commonNavItems, ...(roleNavItems[user?.role] || [])];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* User Profile Section */}
          <div className="flex items-center px-4 pb-4 border-b border-gray-200">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role?.replace("-", " ") || "User"}
              </p>
              {user?.warehouse && (
                <p className="text-xs text-gray-500">{user.warehouse}</p>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-2 space-y-1 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive || location.pathname.startsWith(item.to)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <span className="mr-3 text-gray-500 group-hover:text-gray-900">
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Optional: Sidebar footer */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <a href="#" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <CogIcon className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Settings
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
