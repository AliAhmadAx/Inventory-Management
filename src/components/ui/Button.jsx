import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "medium",
      loading = false,
      disabled = false,
      fullWidth = false,
      type = "button",
      className = "",
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
      success:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outline:
        "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-blue-500",
    };

    // Size styles
    const sizeStyles = {
      small: "px-3 py-1.5 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    };

    // Disabled state
    const disabledStyles =
      disabled || loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer";

    // Loading state
    const loadingStyles = loading ? "cursor-wait" : "";

    // Full width
    const fullWidthStyles = fullWidth ? "w-full" : "";

    // Base classes
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

    // Combine all classes
    const buttonClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${loadingStyles} ${fullWidthStyles} ${className}`;

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <ArrowPathIcon
            className={`h-4 w-4 animate-spin ${children ? "mr-2" : ""}`}
          />
        )}

        {/* Icon on left */}
        {icon && iconPosition === "left" && !loading && (
          <span className={`h-4 w-4 ${children ? "mr-2" : ""}`}>{icon}</span>
        )}

        {/* Button text */}
        {children}

        {/* Icon on right */}
        {icon && iconPosition === "right" && !loading && (
          <span className={`h-4 w-4 ${children ? "ml-2" : ""}`}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
