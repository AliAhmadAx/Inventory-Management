import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/Home";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/public/NotFound";
import UserRoutes from "./UserRoutes";
import ManagerRoutes from "./ManagerRoutes";
import AdminRoutes from "./AdminRoutes";
import Layout from "../components/layout/Layout";

// User pages
import UserDashboard from "../pages/user/Dashboard";
import UserInventory from "../pages/user/Inventory";
import AddInventory from "../pages/user/AddInventory";
import EditInventory from "../pages/user/EditInventory";
import UserShipments from "../pages/user/Shipments";
import PricingCalculator from "../components/user/PricingCalculator";

// Manager pages
import ManagerDashboard from "../pages/manager/Dashboard";
import ManagerInventory from "../pages/manager/Inventory";
import ManagerShipments from "../pages/manager/Shipments";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminWarehouses from "../pages/admin/Warehouses";
import AdminUsers from "../pages/admin/Users";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<Layout />}>
        {/* User protected routes */}
        <Route element={<UserRoutes />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/inventory" element={<UserInventory />} />
          <Route path="/inventory/add" element={<AddInventory />} />
          <Route path="/inventory/:id/edit" element={<EditInventory />} />
          <Route path="/shipments" element={<UserShipments />} />
          <Route path="user/pricing" element={<PricingCalculator />} />
          {/* <Route path="user/reports" element={<Report />} /> */}

          {/* Add more user routes as needed */}
        </Route>

        {/* Manager protected routes */}
        <Route element={<ManagerRoutes />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/inventory" element={<ManagerInventory />} />
          <Route path="/manager/shipments" element={<ManagerShipments />} />
          {/* Add more manager routes as needed */}
        </Route>

        {/* Admin protected routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/warehouses" element={<AdminWarehouses />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          {/* Add more admin routes as needed */}
        </Route>
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
