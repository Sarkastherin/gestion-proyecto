import { Button } from "../Buttons";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
export default function ButtonEdit({ func }) {
  return (
    <Button type="button" variant="pink" rounded="rounded-full" onClick={func}>
      {<PencilSquareIcon className="w-4" />}
    </Button>
  );
}
