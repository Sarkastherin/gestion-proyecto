
import { Button } from "./Buttons";
export function DataField({icon, label, value}) {
  return (
    <div className="flex justify-between mb-2 gap-4 text-neutral-700 text-sm">
      <span className="flex-none flex items-center font-semibold">
        <span className="mr-1.5">{icon}</span>
        {label}:
      </span>
      <span className="bg-neutral-50 rounded px-5 py-0.5 w-full">
        {value}
      </span>
    </div>
  );
}
export const NoDataComponent = ({title, text, children}) => {
  return (
    <div className="flex flex-col items-center justify-center text-neutral-700 gap-4 my-6">
      <p className="text-xl font bold">{title}</p>
      <p>{text}</p>
      {children}
    </div>
  );
};
export const NoDataComponentSimple = ({title, text, children}) => {
  return (
    <div className="flex flex-col items-center justify-center text-neutral-700 gap-4 my-4">
      <p className=" ">{title}</p>
      <p>{text}</p>
      {children}
    </div>
  );
};
