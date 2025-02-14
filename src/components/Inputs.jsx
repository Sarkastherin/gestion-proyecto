import React from "react";
const stylebases = "rounded-md border-gray-200 shadow-xs sm:text-sm disabled:bg-neutral-100";
export const Label = ({ label, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-neutral-700 mb-1"
    >
      {" "}
      {label}{" "}
    </label>
  );
};
export const Input = React.forwardRef(
  (
    { onChange, onBlur, name, placeholder, onClick, type = "text", onInput, readOnly , className, disabled},
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
        readOnly={readOnly}
        disabled={disabled}
        className={`w-full ${stylebases} ${className}`}
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
      disabled
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
        disabled={disabled}
        className={`w-full ${stylebases} ${className}`}
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
