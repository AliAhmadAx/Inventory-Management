import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/layout/Layout";
import LoadingOverlay from "./components/ui/LoadingOverlay";

const App = () => {
  // Example: Global loading state
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    // const mockUser = {
    //   id: 1,
    //   email: "user@email.com",
    //   role: "user", // or 'manager', 'super-admin'
    //   name: "John Doe",
    // };

    // localStorage.setItem("user", JSON.stringify(mockUser));
    const timer = setTimeout(() => setAppLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider>
        {/* Global loading overlay */}
        {appLoading && <LoadingOverlay />}
        {/* Main app content */}
        <div className="min-h-screen bg-gray-50">
          {/* <Layout /> */}
          <AppRoutes />
          {/* </Layout> */}
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
