import React from "react";
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
      iconPosition="right"
    },
    ref
  ) => {
    const baseClasses = `inline-flex items-center justify-center gap-1 ${rounded} border ${
      hidden_text
        ? "p-2.5"
        : "px-7 py-2.5 disabled:border-neutral-400 disabled:bg-neutral-400 disabled:hover:border-neutral-400 disabled:hover:bg-neutral-400 disabled:hover:text-white disabled:text-white disabled:cursor-not-allowed"
    } focus:ring-3 focus:outline-hidden cursor-pointer ${className}`;
    const variants = {
      secondary:
        "border-neutral-300 bg-neutral-300 text-neutral-700 hover:bg-transparent hover:text-neutral-500 hover:border-neutral-500 hover:dark:text-neutral-400 hover:dark:border-neutral-400 focus:outline-none focus:ring active:text-neutral-400",
      redOutline:
        "text-red-500 border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring active:bg-red-500",
      primaryOutline:
        "text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-600",
      secondaryOutline:
        "text-neutral-500 border-neutral-500 hover:bg-neutral-500 hover:text-white focus:outline-none focus:ring active:bg-neutral-500",
      greenOutline:
        "text-green-500 border-green-500 hover:bg-green-500 hover:text-white focus:outline-none focus:ring active:bg-green-500",
      primary:
        "border-indigo-600 bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-600",
      green:
        "border-green-500 bg-green-500 text-white hover:bg-transparent hover:text-green-500 focus:outline-none focus:ring active:text-green-500",
      yellow:
        "border-yellow-400 bg-yellow-400 text-gray-700 hover:bg-transparent hover:text-yellow-400 focus:outline-none focus:ring active:text-yellow-400",
      pink: "border-pink-500 bg-pink-500 text-white hover:bg-transparent hover:text-pink-500 focus:outline-none focus:ring active:text-pink-500",
      green_csv: "border-green-700 bg-green-700 text-white hover:bg-transparent hover:text-green-700 focus:outline-none focus:ring active:text-green-700",
      red: "border-red-500 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring active:text-red-500",
      primary_no_border:
        "border-none text-indigo-600 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-600",
      cyan: "border-blue-500 bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 focus:outline-none focus:ring active:text-blue-500",
      blueOutline:
        "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring active:bg-blue-500 focus:bg-blue-500 focus:text-white",
        blue: "border-blue-500 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring active:text-blue-500",
    };

    return (
      <button
        name={name}
        title={title ? title : text}
        type={type}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]} flex items-center gap-1`}
        data-tooltip-target={tooltip}
        
      >
        {iconPosition === "left" && <span>{icon}</span>}
        <span className={`text-sm font-medium ${hidden_text && "sr-only"}`}>
          {" "}
          {text}{" "}
        </span>
        {iconPosition === "right" && <span>{icon}</span>}
      </button>
    );
  }
);
export const ButtonXS = React.forwardRef(
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
        ? "p-2"
        : "px-7 py-2.5 disabled:border-neutral-400 disabled:bg-neutral-400 disabled:hover:border-neutral-400 disabled:hover:bg-neutral-400 disabled:hover:text-white disabled:text-white disabled:cursor-not-allowed"
    } focus:ring-3 focus:outline-hidden cursor-pointer ${className}`;
    const variants = {
      secondary:
        "border-neutral-300 bg-neutral-300 text-neutral-700 hover:bg-transparent hover:text-neutral-500 hover:border-neutral-500 hover:dark:text-neutral-400 hover:dark:border-neutral-400 focus:outline-none focus:ring active:text-neutral-400",
      redOutline:
        "text-red-500 border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring active:bg-red-500",
      primaryOutline:
        "text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-600",
      secondaryOutline:
        "text-neutral-500 border-neutral-500 hover:bg-neutral-500 hover:text-white focus:outline-none focus:ring active:bg-neutral-500",
      greenOutline:
        "text-green-500 border-green-500 hover:bg-green-500 hover:text-white focus:outline-none focus:ring active:bg-green-500",
      primary:
        "border-indigo-600 bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-600",
      green:
        "border-green-500 bg-green-500 text-white hover:bg-transparent hover:text-green-500 focus:outline-none focus:ring active:text-green-500",
      yellow:
        "border-yellow-400 bg-yellow-400 text-gray-700 hover:bg-transparent hover:text-yellow-400 focus:outline-none focus:ring active:text-yellow-400",
      pink: "border-pink-500 bg-pink-500 text-white hover:bg-transparent hover:text-pink-500 focus:outline-none focus:ring active:text-pink-500",
      red: "border-red-500 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring active:text-red-500",
      primary_no_border:
        "border-none text-indigo-600 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-600",
      blue: "border-blue-500 bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 focus:outline-none focus:ring active:text-blue-500",
      blueOutline:
        "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring active:bg-blue-500 focus:bg-blue-500 focus:text-white",
      cyan: "border-indigo-600 bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-600",
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
