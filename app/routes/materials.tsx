import type { Route } from "./+types/home";
import type { TableColumn } from "react-data-table-component";
import { BadgeStatus } from "~/components/Specific/Badge";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useData } from "~/context/DataContext";
import { EntityTable } from "~/components/Generals/EntityTable";
import { Button } from "~/components/Forms/Buttons";
import { ButtonNavigate } from "~/components/Specific/Buttons";
import type { MaterialsUI } from "~/types/materialsType";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Materiales" },
    { name: "description", content: "Materiales" },
  ];
}
const columns: TableColumn<MaterialsUI>[] = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "80px",
    sortable: true,
  },
  {
    name: "Descripcion",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "Sub-rubro",
    selector: (row) => row.view_categorizations.description_subcategory,
    width: "250px",
    sortable: true,
  },
  {
    name: "Rubro",
    selector: (row) => row.view_categorizations.description_category,
    width: "250px",
    sortable: true,
  },
  {
    name: "Familia",
    selector: (row) => row.view_categorizations.description_family,
    width: "250px",
    sortable: true,
  },
];
export default function Materials() {
  const { getMaterials, materials } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!materials) getMaterials();
  }, []);

  return (
    <>
      {materials && (
        <EntityTable
          title="Materiales"
          data={materials}
          columns={columns}
          onRowClick={(row) => navigate(`/material/${row.id}`)}
          filterFields={[
            { key: "name", label: "Buscar por descripción" },
            { key: "client.nombre", label: "Buscar por cliente" },
          ]}
        />
      )}
      <span className="fixed bottom-0 w-full">
        <div className="flex justify-end w-full px-10 py-5 hover:bg-zinc-200 hover:dark:bg-zinc-900">
          <div className="w-42">
            <ButtonNavigate variant="yellow" route="/new-material">
              Nuevo Material
            </ButtonNavigate>
          </div>
        </div>
      </span>
    </>
  );
}
