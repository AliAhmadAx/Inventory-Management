const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg font-medium text-gray-700">
          Loading application...
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
