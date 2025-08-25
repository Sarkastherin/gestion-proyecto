import { Outlet } from "react-router";
import { useData } from "~/context/DataContext";
import { useEffect } from "react";
import { useParams } from "react-router";
import ItemsHeader from "~/components/Generals/ItemsHeader";
import { useUI } from "~/context/UIContext";
import {
  InformationCircleIcon,
  PresentationChartBarIcon,
  BriefcaseIcon,
} from "@heroicons/react/16/solid";
const menuItems = (id: number) => {
  return [
    {
      title: "Resumen",
      href: `/project/${id}/resumen`,
      icon: <PresentationChartBarIcon className="w-4" />,
    },
    {
      title: "Información",
      href: `/project/${id}/information`,
      icon: <InformationCircleIcon className="w-4" />,
    },
    {
      title: "Presupuesto",
      href: `/project/${id}/budget/materials`,
      icon: <InformationCircleIcon className="w-4" />,
    },
  ];
};
export default function ProjectLayout() {
  const { id } = useParams();
  const { getProjectById, selectedProject } = useData();
  const { setSelectedClient } = useUI();
  const menu = menuItems(Number(id));

  useEffect(() => {
    getProjectById(Number(id));
  }, []);
  useEffect(() => {
    if (selectedProject && selectedProject.client) {
      setSelectedClient(selectedProject.client);
    }
  }, [selectedProject]);
  return (
    <>
      {selectedProject && (
        <ItemsHeader
          iconTitle={
            <BriefcaseIcon className="w-5 text-white dark:text-zinc-900" />
          }
          color="bg-fuchsia-500"
          title={selectedProject?.name}
          menu={menu}
        />
      )}
      <Outlet />
    </>
  );
}
