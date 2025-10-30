import type { InputHTMLAttributes, ElementType } from "react";

type TextFieldVariant = "outlined" | "contained";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
  component?: ElementType;
  variant?: TextFieldVariant;
}

export const TextField = ({
  error = false,
  helperText,
  label,
  className = "",
  id,
  component: Component = "input",
  variant = "contained",
  ...props
}: TextFieldProps) => {
  const inputId = id || (props?.name || "").toLowerCase().replace(/\s+/g, "-");

  const getInputClasses = (variant: TextFieldVariant, error: boolean) => {
    const baseClasses =
      "w-full placeholder:text-inherit focus:outline-none transition-all duration-200";

    if (variant === "outlined") {
      return `${baseClasses} bg-transparent border-0 border-b border-transparent rounded-none ${
        error
          ? "border-b-custom-red-400 focus:border-b-custom-red-400 hover:border-b-custom-red-400"
          : "hover:border-b-custom-grey-200 focus:border-b-custom-blue-500 active:border-b-custom-blue-500"
      }`;
    }

    return `${baseClasses} border bg-white rounded-lg focus:ring-2 ${
      error
        ? "border-red-300 focus:ring-red-500 focus:border-red-400"
        : "border-grey-200 focus:ring-blue-500 focus:border-blue-500"
    }`;
  };

  const inputClassName = `${getInputClasses(variant, error)} ${className}`;

  return (
    <>
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-0 text-caption text-main mb-2"
        >
          {label}
        </label>
      )}
      <Component id={inputId} className={inputClassName} {...props} />
      {helperText && (
        <p
          className={`text-caption ${error ? "text-red-400" : "text-grey-500"}`}
        >
          {helperText}
        </p>
      )}
    </>
  );
};
