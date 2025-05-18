import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const Input = React.forwardRef(
  (
    {
      label,
      name,
      type = "text",
      value,
      onChange,
      onBlur,
      placeholder,
      error,
      disabled = false,
      required = false,
      className = "",
      inputClassName = "",
      labelClassName = "",
      errorClassName = "",
      as = "input",
      rows = 3,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const baseClasses = `block w-full p-3 rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
      disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"
    }`;

    const inputClasses = `${
      error
        ? "border-red-300 text-red-900 p-3 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
        : ""
    } ${
      icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""
    } ${inputClassName}`;

    const renderInput = () => {
      if (as === "textarea") {
        return (
          <textarea
            id={name}
            name={name}
            rows={rows}
            className={`${baseClasses} ${inputClasses}`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            ref={ref}
            {...props}
          />
        );
      } else {
        return (
          <input
            id={name}
            name={name}
            type={type}
            className={`${baseClasses} ${inputClasses}`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            ref={ref}
            {...props}
          />
        );
      }
    };

    return (
      <div className={`${className}`}>
        {label && (
          <label
            htmlFor={name}
            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative rounded-md shadow-sm">
          {icon && iconPosition === "left" && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          {renderInput()}

          {icon && iconPosition === "right" && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          {error && type !== "password" && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        {error && (
          <p
            className={`mt-2 text-sm text-red-600 ${errorClassName}`}
            id={`${name}-error`}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
