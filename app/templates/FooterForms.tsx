import { useUI } from "~/context/UIContext";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "~/components/Forms/Buttons";
import  type {JSX } from "react";
type FooterFormsProps = {
  isNew: boolean;
  isEditMode: boolean;
  onToggleEdit: () => void;
};
export default function FooterForms({
  isNew,
  isEditMode,
  onToggleEdit,
}: FooterFormsProps): JSX.Element {
  return (
    <div className="fixed left-0 bottom-0 dark:bg-zinc-900 bg-zinc-300 shadow-lg shadow-zinc-900 dark:shadow-zinc-500 min-w-full">
      <div className="px-6 md:px-10 py-3 flex justify-between">
        {!isNew && (
          <label
            htmlFor="ChangeViewToEdit"
            className={
              "relative block h-8 w-14 rounded-full bg-zinc-400 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-lime-500 dark:bg-zinc-600 dark:has-checked:bg-lime-600"
            }
          >
            <input
              type="checkbox"
              id="ChangeViewToEdit"
              className="peer sr-only"
              checked={isEditMode}
              onChange={onToggleEdit}
            />

            <span className="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block dark:bg-zinc-900 dark:text-zinc-200">
              <EyeIcon className="size-4" />
              <PencilIcon className="size-4" />
            </span>
          </label>
        )}

        <div className="text-end">
          <Button type="submit" variant="primary" disabled={!isEditMode}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
