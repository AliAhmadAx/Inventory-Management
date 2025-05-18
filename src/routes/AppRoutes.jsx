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
import CustomerDashboard from "../pages/customer/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<Layout />}>
        {/* User protected routes */}
        <Route path="/user" element={<UserRoutes />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="inventory" element={<UserInventory />} />
          <Route path="inventory/add" element={<AddInventory />} />
          <Route path="inventory/:id/edit" element={<EditInventory />} />
          <Route path="shipments" element={<UserShipments />} />
          <Route path="pricing" element={<PricingCalculator />} />
          <Route path="customer-dashboard" element={<CustomerDashboard />} />

          {/* <Route path="user/reports" element={<Report />} /> */}

          {/* Add more user routes as needed */}
        </Route>

        {/* Manager protected routes */}
        <Route path="/manager" element={<ManagerRoutes />}>
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="inventory" element={<ManagerInventory />} />
          <Route path="shipments" element={<ManagerShipments />} />
          {/* Add more manager routes as needed */}
        </Route>

        {/* Admin protected routes */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="warehouses" element={<AdminWarehouses />} />
          <Route path="users" element={<AdminUsers />} />
          {/* Add more admin routes as needed */}
        </Route>
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
