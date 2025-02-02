import React from "react";
export const ButtonIcons = ({ type, icon, onClick, variant = "primary" }) => {
  const baseClasses =
    "rounded-sm px-2 py-2 border font-medium focus:ring-3 focus:outline-hidden cursor-pointer";
  const variants = {
    primary:
      "border-indigo-500 bg-indigo-500 text-white hover:bg-transparent hover:text-indigo-500",
    primaryOutline:
      "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
    secondaryOutline:
      "border-neutral-300 text-neutral-400 hover:bg-neutral-300 hover:text-white",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {icon}
    </button>
  );
};
export const Button = React.forwardRef(({
  type,
  onClick,
  variant = "primary",
  onSubmit,
  className,
  children
}, ref) => {
  const baseClasses =
    "inline-block rounded-sm px-8 py-2 text-sm font-medium focus:ring-3 focus:outline-hidden min-w-35 cursor-pointer";
  const variants = {
    primary:
      "border border-indigo-600 bg-indigo-600 text-sm text-white hover:bg-transparent hover:text-indigo-600",
      secondary:
      "border border-neutral-500 bg-neutral-500 text-sm text-white hover:bg-transparent hover:text-neutral-500",
  };
  return (
    <button
      type={type}
      onSubmit={onSubmit}
      onClick={onClick}
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
});
