import React from "react";
export const Label = ({ label, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-neutral-700"
    >
      {" "}
      {label}{" "}
    </label>
  );
};
export const Input = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      placeholder,
      onClick,
      type = "text",
      onInput,
      className,
    },
    ref
  ) => {
    return (
      <input
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onClick={onClick}
        type={type}
        onInput={onInput}
        className={`w-full rounded-md border-neutral-300 shadow-xs sm:text-md ${className}`}
      />
    );
  }
);
export const Textarea = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      placeholder,
      onClick,
      onInput,
      className,
      rows = 3,
    },
    ref
  ) => {
    return (
      <textarea
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        onClick={onClick}
        rows={rows}
        ref={ref}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-lg border-neutral-300 align-top shadow-xs sm:text-sm ${className}`}
      ></textarea>
    );
  }
);

export const InputGroup = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      placeholder,
      onClick,
      type = "text",
      onInput,
      children,
    },
    ref
  ) => {
    return (
      <div className="flex gap-1 mt-1">
        <Input
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
          placeholder={placeholder}
          onClick={onClick}
          type={type}
          onInput={onInput}
        />
        {children}
      </div>
    );
  }
);
export const TextInvalidate = ({ message }) => {
  return <div className="mt-1 text-sm text-red-500">{message}</div>;
};
