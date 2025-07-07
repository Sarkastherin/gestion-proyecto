interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  tooltip?: string;
  growthRate: number;
  variant?: "primary" | "success" | "warning" | "danger";
}

export const KpiCard = ({title, value,growthRate}:KpiCardProps) => {
  return (
    <article className="flex items-end justify-between rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

        <p className="text-2xl font-medium text-gray-900 dark:text-white">
          {value}
        </p>
      </div>

      <div className="inline-flex gap-2 rounded-sm bg-green-100 p-1 text-green-600 dark:bg-green-700 dark:text-green-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>

        <span className="text-xs font-medium">{growthRate} %</span>
      </div>
    </article>
  );
};

const variantColorMap = {
  primary: "border-blue-500",
  success: "border-green-500",
  warning: "border-yellow-500",
  danger: "border-red-500",
};
