import React from "react";
import {
  ExclamationCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const Select = React.forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      onBlur,
      options = [],
      placeholder = "Select an option",
      error,
      disabled = false,
      required = false,
      className = "",
      selectClassName = "",
      labelClassName = "",
      errorClassName = "",
      icon,
      ...props
    },
    ref
  ) => {
    const baseClasses = `block w-full rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
      disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"
    }`;

    const selectClasses = `appearance-none ${
      error
        ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
        : ""
    } ${selectClassName}`;

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

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          <select
            id={name}
            name={name}
            className={`${baseClasses} ${selectClasses} ${
              icon ? "pl-10" : ""
            } pr-10`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {error ? (
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            )}
          </div>
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

Select.displayName = "Select";

export default Select;
