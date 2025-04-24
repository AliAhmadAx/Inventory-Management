import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-6">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
