import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user?.role === "super-admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
