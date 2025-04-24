import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../../contexts/AuthContext";

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {user && <Sidebar role={user.role} />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {user && <Header />}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
