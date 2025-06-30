import type React from "react";

type TableDetailsProps = {
  children: React.ReactNode;
  title: string;
  columns: { groupColsClass: string; label: string }[];
};
export const Cell = ({ children }: { children: React.ReactNode }) => {
    return <td className="px-1 py-2 whitespace-nowrap">{children}</td>;
  };
export function TableDetailsQuotes({
  children,
  title,
  columns,
}: TableDetailsProps) {
  return (
    <>
      <h2 className="mt-2 text-lg font-bold text-indigo-400">{title}</h2>
      <table className="min-w-full table-auto divide-y-2 divide-zinc-200 dark:divide-zinc-700 mt-2 mb-4">
        <colgroup>
          {columns.map((item, index) => (
            <col key={index} className={item.groupColsClass} />
          ))}
        </colgroup>
        <thead className="ltr:text-left rtl:text-right">
          <tr className="*:font-medium *:text-zinc-900 dark:*:text-white">
            {columns.map((item, index) => (
              <th key={index} className="px-3 py-2 whitespace-nowrap">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
          {children}
        </tbody>
      </table>
    </>
  );
}
