import React from "react";
import CurrencyInput from "react-currency-input-field";
const stylebases =
  "rounded-md border-gray-300 shadow-xs text-sm disabled:bg-neutral-100 text-neutral-800";
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
export const Select = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      placeholder,
      onClick,
      onInput,
      disabled,
      className,
      children,
      label ="falta label",
      no_label
    },
    ref
  ) => {
    return (
      <div className={`w-full ${className}`}>
        <label htmlFor={name} className={`block text-sm font-medium text-neutral-700 mb-1 ${no_label && 'sr-only'}`}>
          {" "}
          {label}{" "}
        </label>
      <select
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onClick={onClick}
        onInput={onInput}
        disabled={disabled}
        className={`w-full ${stylebases}`}
      >
        <option className="text-neutral-400" value="">
          {placeholder}
        </option>
        {children}
      </select>
      </div>
    );
  }
);
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
      readOnly,
      className,
      disabled,
      defaultValue,
      label ="falta label",
      no_label
    },
    ref
  ) => {
    return (
      <div className={`${className} w-full`}>
        <label htmlFor={name} className={`block text-sm font-medium text-neutral-700 mb-1 ${no_label && 'sr-only'}`}>
          {" "}
          {label}{" "}
        </label>

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
          defaultValue={defaultValue}
          className={`w-full ${stylebases}`}
        />
      </div>
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
      disabled,
      label ="falta label",
      no_label,
    },
    ref
  ) => {
    return (
      <div className={`w-full ${className}`}>
        <label htmlFor={name} className={`block text-sm font-medium text-neutral-700 mb-1 ${no_label && 'sr-only'}`}>
          {" "}
          {label}{" "}
        </label>
      <textarea
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        onClick={onClick}
        rows={rows}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full field-sizing-content ${stylebases}`}
      ></textarea></div>
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
      defaultValue,
      children,
    },
    ref
  ) => {
    return (
      <div className="relative">
        <input
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
          onClick={onClick}
          onInput={onInput}
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          className={`w-full ${stylebases} pe-10`}
        />
        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
          {children}
        </span>
      </div>
    );
  }
);
export const TextInvalidate = ({ message }) => {
  return <div className="mt-1 text-red-500 text-xs">{message}</div>;
};
export const CurrencyTypeInput = React.forwardRef(
  (
    {
      defaultValue = 0,
      decimalScale = 2,
      intlConfig = { locale: "es-AR", currency: "ARS" },
      className,
      onValueChange,
      value,
    },
    ref
  ) => {
    return (
      <CurrencyInput
        className={`w-full ${stylebases} ${className}`}
        intlConfig={intlConfig}
        decimalSeparator="."
        groupSeparator=","
        decimalScale={decimalScale}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        ref={ref}
        value={value}
      />
    );
  }
);
export const InputXS = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      placeholder,
      onClick,
      type = "text",
      onInput,
      readOnly,
      className,
      disabled,
      defaultValue,
      label ="falta label",
      no_label
    },
    ref
  ) => {
    return (
      <div className={`${className} w-full`}>
        <label htmlFor={name} className={`block text-sm font-medium text-neutral-700 mb-1 ${no_label && 'sr-only'}`}>
          {" "}
          {label}{" "}
        </label>

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
          defaultValue={defaultValue}
          className={`w-full rounded-sm border-gray-300 shadow-xs text-[13px] disabled:bg-neutral-100 text-neutral-800 px-2 py-1`}
        />
      </div>
    );
  }
);
