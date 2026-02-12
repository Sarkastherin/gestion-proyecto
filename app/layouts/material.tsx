import { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router";
import {
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { Button, ButtonOnlyIcon } from "~/components/Forms/Buttons";
import { materialsApi } from "~/backend/cruds";
import { useData } from "~/context/DataContext";
import ItemsHeader from "~/components/Generals/ItemsHeader";
import { useUIModals } from "~/context/ModalsContext";

const menuItems = (id: number) => {
  return [
    {
      title: "Información",
      href: `/materials/${id}`,
      icon: <InformationCircleIcon className="w-4" />,
    },
    {
      title: "Precios",
      href: `/materials/${id}/prices`,
      icon: <CurrencyDollarIcon className="w-4" />,
    },
  ];
};
export default function MaterialLayout() {
  const navigate = useNavigate();
  const { getMaterial, getMaterials, materials, selectedMaterial } = useData();
  const { openModal } = useUIModals();
  const { id } = useParams();
  const menu = menuItems(Number(id));
  useEffect(() => {
    if (!materials) getMaterials();
  }, []);
  useEffect(() => {
    if (materials) getMaterial(Number(id), materials);
  }, [materials]);
  const handleDelete = async () => {
    openModal("CONFIRMATION", {
      title: "Confirmar eliminación",
      message: "¿Está seguro de eliminar este material?",
      onConfirm: async () => {
        const { error } = await materialsApi.remove({ id: Number(id) });
        if (error) {
          openModal("ERROR", {
            message: error.message,
          });
          return;
        }
        openModal("SUCCESS", {
          message: "Material eliminado correctamente",
        });
        getMaterials();
        navigate("materials");
      },
    });
  };
  return (
    <>
      {selectedMaterial && (
        <ItemsHeader
          iconTitle={
            <ArchiveBoxIcon className="w-5 text-white dark:text-zinc-900" />
          }
          color="bg-green-500"
          title={selectedMaterial?.description}
          menu={menu}
          rightSection={
            <div className="w-fit">
              <ButtonOnlyIcon
                title="Eliminar material"
                size="sm"
                variant="red"
                onClick={handleDelete}
                icon={{component: TrashIcon, color: "text-white"}}
                className="md:hidden"
              />
              <Button
              size="sm"
                title="Eliminar material"
                variant="red"
                onClick={handleDelete}
                className="md:inline-flex hidden"
                icon={{component: TrashIcon, color: "text-white"}}
              >
                Eliminar Material
              </Button>
            </div>
            
          }
          back_path="/materials"
        />
      )}
      {selectedMaterial ? (
        <Outlet />
      ) : (
        <p className="text-center mt-10">Cargando Material...</p>
      )}
    </>
  );
}
