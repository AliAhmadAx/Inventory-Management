import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import DropdownMenu from "../ui/DropdownMenu";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-gray-900">
            IMS
          </Link>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <DropdownMenu
              trigger={
                <button className="flex items-center space-x-2 focus:outline-none">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                    <span className="text-sm font-medium leading-none text-white">
                      {user.name.charAt(0)}
                    </span>
                  </span>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </button>
              }
              items={[
                { label: "Profile", to: "/profile" },
                { label: "Settings", to: "/settings" },
                { type: "divider" },
                { label: "Sign out", onClick: logout },
              ]}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
