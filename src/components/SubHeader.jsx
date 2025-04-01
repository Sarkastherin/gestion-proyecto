import { NavLink } from "react-router-dom";

export const Subheader = ({ name, menuItems, icon, id }) => {
  
  const menu = menuItems(id)
  return (
    <div className="px-10 border-b border-neutral-400 pb-2">
      <div className="flex gap-4 items-center py-4">
        <span className="rounded-sm p-1.5 bg-blue-500">{icon}</span>
        <h3 className="text-lg font-medium text-neutral-700">{name}</h3>
      </div>
      <div title="menu bar" className="flex gap-10">
        {menu.map((item) => (
          <NavLink
            to={item.href}
            key={item.title}
            className={({ isActive }) =>
              `${
                isActive ? "text-indigo-600" : "text-neutral-500 hover:text-indigo-500"
              }`
            }
          >
            <div className="flex gap-2 ">
              {item.icon}
              <p>{item.title}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
