export type ReportMode =
  | "closed"
  | "byType"
  | "groupedServices"
  | "useCategory"
  | "materialsOnly"
  | "fullBreakdown"
  | "comparative"
  | "percentage"
  | "threshold"
  | "viewMode";

export type PropsModelTable = {
  name: string;
  mode: ReportMode;
  paragraph?: string;
  listDescription: string[];
};
export const TextDescription = ({
  description,
}: {
  description: PropsModelTable;
}) => {
  if (!description) return null;

  return (
    <div className="mt-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 shadow-sm">
      <h4 className="text-base font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
        {description.name}
      </h4>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{description.paragraph}</p>
      <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
        {description.listDescription.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  );
};
