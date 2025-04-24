const StatusStepper = ({ steps, currentStatus }) => {
  const currentIndex = steps.findIndex((step) => step.id === currentStatus);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div
        className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"
        aria-hidden="true"
      ></div>

      <ul className="space-y-6">
        {steps.map((step, index) => (
          <li key={step.id} className="relative pl-8">
            {/* Icon */}
            <div
              className={`absolute left-0 z-10 flex items-center justify-center w-8 h-8 rounded-full 
                ${index <= currentIndex ? "bg-blue-500" : "bg-gray-200"}`}
            >
              {index <= currentIndex ? (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="text-xs font-medium text-gray-500">
                  {index + 1}
                </span>
              )}
            </div>

            {/* Content */}
            <div
              className={`text-sm ${
                index <= currentIndex ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <p className="font-medium">{step.label}</p>
              {step.date && <p className="text-xs">{step.date}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusStepper;
