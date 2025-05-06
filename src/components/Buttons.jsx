import React from "react";
const disabled = {
  outline:
    "disabled:text-neutral-400 disabled:border-neutral-400 disabled:hover:bg-transparent",
  regular:
    "disabled:text-white disabled:border-neutral-400 disabled:bg-neutral-400",
};
const variants = {
  primary: `border-indigo-600 bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600 ${disabled.regular}`,
  secondary: `border-gray-400 bg-gray-400 text-white hover:bg-transparent hover:text-gray-400 ${disabled.regular}`,
  success: `border-lime-600 bg-lime-600 text-white hover:bg-transparent hover:text-lime-600 ${disabled.regular}`,
  danger: `border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-red-500 ${disabled.regular}`,
  yellow: `border-amber-500 bg-amber-500 text-gray-800 hover:bg-transparent hover:text-amber-500 ${disabled.regular}`,
  pink: `border-pink-500 bg-pink-500 text-white hover:bg-transparent hover:text-pink-500 ${disabled.regular}`,
  green_csv: `border-green-700 bg-green-700 text-white hover:bg-transparent hover:text-green-700 ${disabled.regular}`,
  blue: `border-blue-500 bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 ${disabled.regular}`,
  primary_outline: `text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white ${disabled.outline}`,
  secondary_outline: `text-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white ${disabled.outline}`,
  success_outline: `text-lime-600 border-lime-600 hover:bg-lime-600 hover:text-white ${disabled.outline}`,
  danger_outline: `text-red-500 border-red-500 hover:bg-red-500 hover:text-white ${disabled.outline}`,
  blue_outline: `text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white ${disabled.outline}`,
  primary_no_border: `border-none text-indigo-600 hover:bg-indigo-600/10 hover:text-indigo-60 disabled:text-neutral-400 disabled:hover:bg-transparent`,
  secondary_no_border: `border-none text-gray-500 hover:bg-gray-500/10 hover:text-indigo-60 disabled:text-neutral-400 disabled:hover:bg-transparent`,
  green: `border-green-600 bg-green-600 text-white hover:bg-transparent hover:text-green-600 ${disabled.regular}`,
  cyan: `border-cyan-500 bg-cyan-500 text-white hover:bg-transparent hover:text-cyan-500 ${disabled.regular}`,
  emerald: `border-emerald-500 bg-emerald-500 text-white hover:bg-transparent hover:text-emerald-500 ${disabled.regular}`,
  purple: `border-purple-500 bg-purple-500 text-white hover:bg-transparent hover:text-purple-500 ${disabled.regular}`,
};
export const Button = React.forwardRef(
  (
    {
      type = "button",
      onClick,
      variant = "primary",
      className,
      title,
      name,
      rounded = "rounded-sm",
      disabled = false,
      children,
      size,
    },
    ref
  ) => {
    const baseClasses = `inline-flex items-center justify-center gap-1 ${rounded} border p-2 disabled:cursor-not-allowed focus:ring-2 focus:outline-hidden cursor-pointer ${className}`;
    return (
      <button
        name={name}
        title={title}
        type={type}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]}`}
      >
        <span className={`flex gap-2 font-medium ${size == "xs" && "text-sm"}`}>
          {children}
        </span>
      </button>
    );
  }
);

