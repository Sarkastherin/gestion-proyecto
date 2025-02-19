import React from "react";
import 'flowbite';
export const Button = React.forwardRef(
  (
    {
      text,
      type = "button",
      onClick,
      variant = "default",
      className,
      title,
      name,
      icon,
      hidden_text,
      rounded = "rounded-sm",
      disabled = false,
      tooltip,
    },
    ref
  ) => {
    const baseClasses = `inline-flex items-center justify-center gap-1 ${rounded} border ${
      hidden_text
        ? "p-2.5"
        : "px-7 py-2.5 disabled:border-neutral-400 disabled:bg-neutral-400 disabled:hover:border-neutral-400 disabled:hover:bg-neutral-400 disabled:hover:text-white disabled:text-white disabled:cursor-not-allowed"
    } focus:ring-3 focus:outline-hidden cursor-pointer ${className}`;
    const variants = {
      default:
        "text-gray-700 border-gray-400 hover:bg-gray-200 focus:ring-gray-500",
      redOutline:
        "text-red-500 border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring active:bg-red-500",
      primaryOutline:
        "text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-600",
      secondaryOutline:
        "text-neutral-500 border-neutral-500 hover:bg-neutral-500 hover:text-white focus:outline-none focus:ring active:bg-neutral-500",
      successOutline:
        "text-green-600 border-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:bg-green-600",
      primary:
        "border-indigo-600 bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-600",
      success:
        "border-green-600 bg-green-600 text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500",
      yellow:
        "border-yellow-400 bg-yellow-400 text-gray-700 hover:bg-transparent hover:text-yellow-400 focus:outline-none focus:ring active:text-yellow-400",
      pink: "border-pink-500 bg-pink-500 text-white hover:bg-transparent hover:text-pink-500 focus:outline-none focus:ring active:text-pink-500",
      red: "border-red-500 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring active:text-red-500",
      primary_no_border:
        "border-none text-indigo-600 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-600",
        blue:
        "border-blue-500 bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 focus:outline-none focus:ring active:text-blue-500",
      
      };

    return (
      <button
        name={name}
        title={title ? title : text}
        type={type}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]}`}
        data-tooltip-target={tooltip}
      >
        <span className={`text-sm font-medium ${hidden_text && "sr-only"}`}>
          {" "}
          {text}{" "}
        </span>
        <span>{icon}</span>
      </button>
    );
  }
);
