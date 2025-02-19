import { Button } from "../Buttons";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
export default function ButtonEdit({ func }) {
  return (
    
      <Button
        type="button"
        variant="pink"
        text="Habilitar edición"
        icon={<PencilSquareIcon className="w-4" />}
        hidden_text
        rounded="rounded-full"
        onClick={func}
      />
  );
}
