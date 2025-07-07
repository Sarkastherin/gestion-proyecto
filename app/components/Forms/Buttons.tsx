import type { JSX, ButtonHTMLAttributes } from "react";
export const variants = {
  primary: "border-indigo-600 bg-indigo-600 text-white hover:text-indigo-600 hover:border-indigo-600 dark:border-indigo-400 dark:bg-indigo-400 dark:text-zinc-800 dark:hover:text-indigo-400 dark:hover:border-indigo-400",
  blue: "border-blue-600 bg-blue-600 text-white hover:text-blue-600 hover:border-blue-600 dark:border-blue-500 dark:bg-blue-500 dark:text-zinc-800 dark:hover:text-blue-500 dark:hover:border-blue-500",
  green: "border-lime-600 bg-lime-600 text-white hover:text-lime-600 hover:border-lime-600 dark:border-lime-500 dark:bg-lime-500 dark:text-zinc-800 dark:hover:text-lime-500 dark:hover:border-lime-500",
  yellow: "border-yellow-500 bg-yellow-500 text-zinc-800 hover:text-yellow-500 hover:border-yellow-500",
  secondary: "border-gray-400 bg-gray-400 text-zinc-100 hover:text-gray-400 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-600 dark:hover:text-gray-600 dark:hover:border-gray-600",
  danger: "border-red-600 bg-red-600 text-white hover:text-red-600 hover:border-red-600 dark:border-red-400 dark:bg-red-400 dark:text-zinc-800 dark:hover:text-red-400 dark:hover:border-red-400",
  indigo: "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500",
  danger_outline:
    "border-red-500 text-red-500 hover:bg-red-500 hover:text-red-500 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-zinc-700",
  green_outline:
    "border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white",
  secondary_outline:
    "border-zinc-400 text-zinc-400 hover:bg-zinc-400 hover:text-white",
};
const basesClass = "w-full border cursor-pointer font-medium hover:bg-transparent disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400 disabled:hover:text-zinc-800";
const sizes = {
  sm: "text-xs h-8 px-4 rounded-sm",
  md: "text-sm py-2 px-4 rounded-md",
  lg: "h-13 px-6 rounded-md",
};

type ButtonProps = {
  children?: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};
type ButtonNativeProps = ButtonHTMLAttributes<HTMLButtonElement>;
type Props = ButtonProps & ButtonNativeProps;
export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...buttonProps
}: Props): JSX.Element => {
  return (
    <button
      className={`${basesClass} ${sizes[size]} ${variants[variant]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
