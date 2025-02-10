import { Button } from "./Buttons";
import {
  BanknotesIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";

export const Subheader = ({ name, menuItems, icon }) => {
  return (
    <div className="px-12 border-b border-neutral-400 pb-2">
      <div className="flex gap-4 items-center py-6">
        <span className="rounded-sm p-1.5 bg-blue-500">
          {icon}
        </span>
        <h3 className="text-lg font-medium text-neutral-700">{name}</h3>
      </div>
      <div title="menu bar" className="flex gap-10">
        {menuItems.map(item => (
         <NavLink to={item.href}>
         <div className="flex gap-2 text-neutral-500 hover:text-indigo-500">
           {item.icon}
           <p>{item.title}</p>
         </div>
       </NavLink>
        ))}
        
      </div>
    </div>
  );
};
