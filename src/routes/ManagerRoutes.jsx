import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ManagerRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user?.role === "manager" ? <Outlet /> : <Navigate to="/manager/dashboard" />;
};

export default ManagerRoutes;
