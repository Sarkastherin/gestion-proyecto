import {
  ChevronDoubleDownIcon,
} from "@heroicons/react/16/solid";
export function BoxComponent({title, children}) {
  return (
    <div className="border border-neutral-400 max-w-6xl mx-auto mt-10 rounded-2xl">
      <div className="flex gap-2 border-b  border-neutral-400 p-3">
          <ChevronDoubleDownIcon width={"24px"} className="text-neutral-500" />
          <h2 className="text-xl font-medium text-neutral-700">
            {title}
          </h2>
        </div>
        <div className="p-6">
          {children}
        </div>
    </div>
  )
}