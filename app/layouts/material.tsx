/* Dependencies*/
import { useEffect } from "react";
/* Contexts */
/* Dependencies*/
import { Outlet, useParams, useNavigate, useLocation } from "react-router";
import {
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
/* Contexts */
import { useUI } from "~/context/UIContext";
import type { JSX } from "react";
import { Button } from "~/components/Forms/Buttons";
import { materialsApi } from "~/backend/cruds";
import { useData } from "~/context/DataContext";

const menuItems = (id: number) => {
  return [
    {
      title: "Información",
      href: `/material/${id}`,
      icon: <InformationCircleIcon className="w-4" />,
    },
    {
      title: "Precios",
      href: `/material/${id}/prices`,
      icon: <CurrencyDollarIcon className="w-4" />,
    },
  ];
};
export default function OpportunityLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getMaterial, getMaterials, materials, selectedMaterial } = useData();
  const { isFieldsChanged, setIsFieldsChanged } = useUI();
  const { id } = useParams();
  const menu = menuItems(Number(id));
  useEffect(() => {
    if (!materials) getMaterials();
  }, []);
  useEffect(() => {
    if (materials) getMaterial(Number(id), materials);
  }, [materials]);
  const handleNavigate = (href: string) => {
    if (isFieldsChanged) {
      if (confirm("Tienes cambios sin guardar, ¿deseas continuar?")) {
        setIsFieldsChanged(false);
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };
  const MyNavLink = ({
    href,
    icon,
    title,
  }: {
    href: string;
    icon: JSX.Element;
    title: string;
  }) => {
    const isActive = location.pathname === href;
    return (
      <button
        type="button"
        className={`cursor-pointer ${
          isActive
            ? "font-semibold text-indigo-600 dark:text-indigo-400"
            : "text-zinc-500 hover:text-indigo-500 dark:hover:text-indigo-400"
        }`}
        onClick={() => handleNavigate(href)}
      >
        <div className="flex gap-2 ">
          {icon}
          <p>{title}</p>
        </div>
      </button>
    );
  };
  const handleDelete = async () => {
    if (confirm("¿Está seguro de eliminar este material?")) {
      const { error } = await materialsApi.remove({ id: Number(id) });
      if (error) {
        alert(error.message);
        return;
      }
      navigate("materils");
    }
  };
  return (
    <>
      <div className="px-10 pb-2 border-b border-zinc-100 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-700/25">
        <div className="flex gap-4 items-center py-4">
          <span className="rounded-sm p-1.5 bg-green-500">
            {<ArchiveBoxIcon className="w-5 text-white dark:text-zinc-900" />}
          </span>
          <h3 className="text-lg font-medium">
            {selectedMaterial?.description}
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <div title="menu bar" className="flex gap-10">
            {menu.map((item, index) => (
              <MyNavLink
                key={index}
                href={item.href}
                icon={item.icon}
                title={item.title}
              />
            ))}
          </div>
          <div className="w-42">
            <Button
              title="Eliminar material"
              variant="danger"
              onClick={handleDelete}
            >
              <div className="flex gap-1">
                <TrashIcon className="size-4" />
                <span>Eliminar Material</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
      {selectedMaterial ? (
        <Outlet />
      ) : (
        <p className="text-center mt-10">Cargando Material...</p>
      )}
    </>
  );
}
