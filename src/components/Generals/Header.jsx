import { Bars3Icon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Button } from "../Buttons";
import { NavLink } from "react-router-dom";
function Header({ text, to}) {
  return (
      <div className="flex justify-between bg-neutral-200 px-4 py-2 shadow-sm md:px-6 md:py-3 xl:px-10 xl:py-3">
        <div className="inline-flex items-center gap-4">
          <Button rounded="rounded-full" variant='primaryOutline' text={'back'} icon={
            <NavLink to={to}><ChevronLeftIcon className="w-5"/></NavLink>
            } hidden_text/>
        <span className="text-xl font-medium text-indigo-600">{text}</span>
        </div>
        <Button
        className="sr-only"
        text='menu'
        hidden_text
        icon={<Bars3Icon width={"16px"} />}
        variant='primary'
        />
      </div>
  );
}
export default Header;
