import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  JSX,
} from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
const basesClass = (error: string) => {
  return `mt-0.5 w-full rounded border py-2 px-2 shadow-sm sm:text-sm text-zinc-700
          ${error ? "border-red-500" : "border-zinc-300 dark:border-zinc-600"}
          dark:text-zinc-200 disabled:bg-zinc-500/15`;
};
type CommonInputsProps = {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: string;
};
type InputProps = CommonInputsProps &
  InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };
export const Input = ({
  label,
  id,
  register,
  error,
  ref,
  ...inputProps
}: InputProps): JSX.Element => {
  return (
    <label htmlFor={id}>
      <span
        className={`text-sm font-medium text-zinc-700 dark:text-zinc-200 ${
          !label && "sr-only"
        }`}
      >
        {label}
      </span>

      <input
        ref={ref}
        id={id}
        className={`dark:[&::-webkit-calendar-picker-indicator]:invert
 ${basesClass(error ?? "")}`}
        {...inputProps}
        {...register}
      />
      {error && (
        <span className="block mt-0.5 text-red-500 text-xs dark:text-red-400">
          {error}
        </span>
      )}
    </label>
  );
};
type CheckboxProps = CommonInputsProps &
  InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };
export const Checkbox = ({
  label,
  id,
  register,
  error,
  ref,
  ...inputProps
}: CheckboxProps): JSX.Element => {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200"
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={`h-4 w-4 rounded border-zinc-300 text-primary focus:ring-2 focus:ring-primary/40 dark:border-zinc-600 dark:bg-zinc-900 ${
            error ? "ring-2 ring-red-500/40" : ""
          }`}
          {...inputProps}
          {...register}
        />
        <span className={`${!label && "sr-only"}`}>{label}</span>
      </label>
      {error && (
        <span className="block mt-0.5 text-red-500 text-xs dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  );
};
type ToggleProps = CommonInputsProps &
  InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };
export const Toggle = ({
  label,
  id,
  register,
  error,
  ref,
  ...inputProps
}: ToggleProps): JSX.Element => {
  return (
    <div
      className="mt-0.5 rounded border py-1.5 px-2 shadow-sm disabled:bg-zinc-500/15 border-zinc-300 dark:border-zinc-600"
    >
      <label htmlFor={id} className="flex items-center gap-3 text-sm">
        <span className={`${!label && "sr-only"}`}>{label}</span>
        <span className="relative inline-flex h-6 w-11 items-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className="peer sr-only"
            {...inputProps}
            {...register}
          />
          <span
            className={`absolute inset-0 rounded-full border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 ${
              error
                ? "border-red-500/60"
                : "border-zinc-300 dark:border-zinc-600"
            } ${
              inputProps.disabled
                ? "bg-zinc-200/60 dark:bg-zinc-800/60"
                : "bg-zinc-200 peer-checked:bg-primary dark:bg-zinc-700"
            }`}
          />
          <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5 dark:bg-zinc-50" />
        </span>
      </label>
      {error && (
        <span className="block mt-0.5 text-red-500 text-xs dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  );
};
export type SelectProps = {
  selectText?: string;
  children?: React.ReactNode;
} & CommonInputsProps &
  SelectHTMLAttributes<HTMLSelectElement>;
export const Select = ({
  label,
  id,
  register,
  error,
  selectText = "Seleccione una opción",
  children,
  ...selectProps
}: SelectProps): JSX.Element => {
  return (
    <div>
      <label htmlFor={id}>
        <span
          className={`text-sm font-medium text-zinc-700 dark:text-zinc-200 ${
            !label && "sr-only"
          }`}
        >
          {label}
        </span>
        <div className="relative">
          <select
            name={id}
            id={id}
            className={`${basesClass(
              error ?? "",
            )}  dark:bg-zinc-800 dark:text-white appearance-none`}
            {...selectProps}
            {...register}
          >
            <option value="">{selectText}</option>
            {children}
          </select>
          {error && (
            <span className="block mt-0.5 text-red-500 text-xs dark:text-red-400">
              {error}
            </span>
          )}
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-zinc-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 0 1-.707-.293l-3-3a1 1 0 1 1 1.414-1.414L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3A1 1 0 0 1 10 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
};
type TextareaProps = CommonInputsProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Textarea = ({
  error,
  label,
  register,
  id,
  ...textareaProps
}: TextareaProps): JSX.Element => {
  return (
    <label htmlFor={id}>
      <span
        className={`text-sm font-medium text-zinc-700 dark:text-zinc-200 ${
          !label && "sr-only"
        }`}
      >
        {label}
      </span>

      <textarea
        id={id}
        className={`${basesClass(error ?? "")} field-sizing-conten`}
        rows={2}
        {...register}
        {...textareaProps}
      ></textarea>
    </label>
  );
};
