import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Inventory Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your inventory, shipments, and warehouse management with
            our powerful IMS solution.
          </p>
          <div className="space-x-4">
            {user ? (
              <Link
                to={
                  user.role === "super-admin"
                    ? "/admin/dashboard"
                    : user.role === "manager"
                    ? "/manager/dashboard"
                    : "/dashboard"
                }
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
