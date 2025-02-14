import { Bars3Icon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Button } from "./Buttons";
import { Subheader } from "./SubHeader";
import { NavLink } from "react-router-dom";
function Header({ text, hasSubheader, menuItems, icon, id, children }) {
  return (
    <div className="fixed w-full ">
      <div className="flex justify-between bg-neutral-200 px-4 py-2 shadow-sm md:px-6 md:py-3 xl:px-12 xl:py-4">
        <div className="inline-flex items-center gap-4">
          <Button rounded="full" variant='primaryOutline' text={'back'} icon={
            <NavLink to={'/oportunidades'}><ChevronLeftIcon className="w-5"/></NavLink>
            } hidden_text/>
        <span className="text-xl font-medium text-indigo-600">{text}</span>
        </div>
        <Button
        text='menu'
        hidden_text
        icon={<Bars3Icon width={"16px"} />}
        variant='primary'
        />
      </div>
      {hasSubheader && (
        <Subheader name={'Nombre de la oportunidad'} menuItems={menuItems} icon={icon} id={id}/>
      )}
        {children}
    </div>
  );
}
export default Header;
