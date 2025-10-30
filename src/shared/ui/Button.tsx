import type { ElementType } from "react";
import { Spinner } from "./Spinner";

type ButtonVariant = "contained" | "outlined";
type ButtonColor =
  | "primary"
  | "secondary"
  | "warning"
  | "info"
  | "success"
  | "error";
type ButtonSize = "small" | "medium" | "large";

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  component?: ElementType;
}

type ButtonProps = BaseButtonProps & Record<string, unknown>;

const getButtonClasses = (
  variant: ButtonVariant,
  color: ButtonColor,
  size: ButtonSize
) => {
  const baseClasses =
    "rounded-lg text-button focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    small: "px-3 py-1.5",
    medium: "px-4 py-2",
    large: "px-6 py-3",
  };

  const colorMap = {
    primary: {
      contained:
        "bg-custom-blue-500 text-white hover:bg-custom-blue-900 focus:ring-custom-blue-500",
      outlined:
        "border bg-white border-custom-blue-400 text-custom-blue-500 hover:bg-custom-blue-400 hover:text-white focus:ring-custom-blue-500",
    },
    secondary: {
      contained:
        "bg-custom-grey-600 text-white hover:bg-custom-grey-500 focus:ring-custom-grey-500",
      outlined:
        "border bg-white border-custom-grey-200 text-custom-grey-600 hover:bg-custom-grey-100 hover:text-custom-grey-600 focus:ring-custom-grey-500",
    },
    warning: {
      contained:
        "bg-custom-yellow-400 text-custom-main hover:bg-custom-yellow-400 focus:ring-custom-yellow-400",
      outlined:
        "border bg-white border-custom-yellow-400 text-custom-yellow-400 hover:bg-custom-yellow-400 hover:text-custom-main focus:ring-custom-yellow-400",
    },
    info: {
      contained:
        "bg-custom-blue-400 text-white hover:bg-custom-blue-500 focus:ring-custom-blue-400",
      outlined:
        "border bg-white border-custom-blue-400 text-custom-blue-400 hover:bg-custom-blue-400 hover:text-white focus:ring-custom-blue-400",
    },
    success: {
      contained:
        "bg-custom-green-400 text-custom-main hover:bg-custom-green-300 focus:ring-custom-green-400",
      outlined:
        "border bg-white border-custom-green-300 text-custom-green-300 hover:bg-custom-green-100 hover:text-custom-green-300 focus:ring-custom-green-300",
    },
    error: {
      contained:
        "bg-custom-red-400 text-white hover:bg-custom-red-300 focus:ring-custom-red-400",
      outlined:
        "border bg-white border-custom-red-300 text-custom-red-300 hover:bg-custom-red-100 hover:text-custom-red-300 focus:ring-custom-red-300",
    },
  };

  const variantClasses = colorMap[color][variant];
  const currentSizeClasses = sizeClasses[size];

  return `${baseClasses} ${currentSizeClasses} ${variantClasses}`;
};

export const Button = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  loading = false,
  className = "",
  component: Component = "button",
  ...otherProps
}: ButtonProps) => {
  const buttonClasses = getButtonClasses(variant, color, size);

  return (
    <Component
      className={`${buttonClasses} ${className} ${
        loading ? "cursor-not-allowed" : ""
      }`}
      disabled={loading || otherProps.disabled}
      {...otherProps}
    >
      <div className="flex items-center justify-center">
        <div className="relative max-w-full">
          {children}
          {loading && (
            <div className="absolute top-0 left-0 -translate-x-full">
              <Spinner size="sm" className="border-current mx-2" />
            </div>
          )}
        </div>
      </div>
    </Component>
  );
};
