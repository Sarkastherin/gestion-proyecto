import { Bars3Icon } from "@heroicons/react/16/solid";
import { ButtonIcons } from "./Buttons";
function Header({text}) {
  return (
    <div className="flex justify-between bg-neutral-200 px-12 py-4">
      <span className="text-xl font-medium text-indigo-500">{text}</span>
      <ButtonIcons icon={<Bars3Icon width={'16px'}/>}/>
    </div>
  )
  
}
export default Header;