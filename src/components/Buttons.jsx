import React from "react";
export const ButtonIcons = ({ type, icon, onClick, variant = "primary", title = 'title' }) => {
  const baseClasses =
    "rounded-sm px-2 py-2 border font-medium focus:ring-3 focus:outline-hidden cursor-pointer";
  const variants = {
    primary:
      "border-indigo-500 bg-indigo-500 text-white hover:bg-transparent hover:text-indigo-500",
    primaryOutline:
      "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
    secondaryOutline:
      "border-neutral-300 text-neutral-400 hover:bg-neutral-300 hover:text-white",
    greenOutline:
      "border-green-500 text-green-600 hover:bg-green-500 hover:text-white",
  };
  return (
    <button
      title={title}
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {icon}
    </button>
  );
};
export const Button = React.forwardRef(
  (
    { type = "button", children, onClick, variant = "default", className, title = 'title' },
    ref
  ) => {
    const baseClasses = `p-2 rounded-md border focus:outline-none focus:ring-2 cursor-pointer mt-1 font-medium ${className}`;
    const variants = {
      default:
        "text-gray-700 border-gray-400 hover:bg-gray-200 focus:ring-gray-500",
      dangerOutline:
        "text-red-500 border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring active:bg-red-500",
      primaryOutline:
        "text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring active:bg-indigo-500",
      successOutline:
        "text-green-600 border-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:bg-green-600",
      primary:
        "border-indigo-500 bg-indigo-500 text-white hover:bg-transparent hover:text-indigo-500 focus:outline-none focus:ring active:text-indigo-500",
      success:
        "border-green-600 bg-green-600 text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500",
    };

    return (
      <button
      title={title}
        type={type}
        onClick={onClick}
        ref={ref}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  }
);
