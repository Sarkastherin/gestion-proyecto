import { Subheader } from "../SubHeader";
import Header from "./Header";
function Container({ text,to, hasSubheader, menuItems, icon, id, name, children }) {
  return (
    <div className="fixed w-full ">
      <Header text={text} to={to}/>
      {hasSubheader && (
        <Subheader name={name} menuItems={menuItems} icon={icon} id={id}/>
      )}
        {children}
    </div>
  );
}
export default Container;