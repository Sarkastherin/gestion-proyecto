import { Bars3Icon } from "@heroicons/react/16/solid";
import { ButtonIcons } from "./Buttons";
import { Subheader } from "./SubHeader";
function Header({ text, hasSubheader, menuItems, icon }) {
  return (
    <div className="fixed w-full ">
      <div className="flex justify-between bg-neutral-200 px-12 py-4 shadow-sm">
        <span className="text-xl font-medium text-indigo-500">{text}</span>
        <ButtonIcons icon={<Bars3Icon width={"16px"} />} />
      </div>
      {hasSubheader && (
        <Subheader name={'Nombre de la oportunidad'} menuItems={menuItems} icon={icon}/>
      )}

    </div>
  );
}
export default Header;
