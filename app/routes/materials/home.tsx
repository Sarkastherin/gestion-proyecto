import type { Route } from "../+types/home";
import type { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useData } from "~/context/DataContext";
import { EntityTable } from "~/components/Generals/EntityTable";
import { Button } from "~/components/Forms/Buttons";
import type { MaterialsUI } from "~/types/materialsType";
import { ButtonExport } from "~/components/Specific/Buttons";
import { ImportCsvInput } from "~/utils/import";
import FooterUITables from "~/components/Generals/FooterUITable";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import ModalBase from "~/components/modals/ModalBase";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_MATERIALS } from "~/components/auth/allowedRoles";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
import { Box } from "lucide-react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Materiales" },
    { name: "description", content: "Materiales" },
  ];
}
export const columnsMaterials: TableColumn<MaterialsUI>[] = [
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
    wrap: true,
  },
  {
    name: "Sub-rubro",
    selector: (row) => row.view_categorizations.description_subcategory,
    width: "220px",
    sortable: true,
    grow: 1,
  },
  {
    name: "Rubro",
    selector: (row) => row.view_categorizations.description_category,
    width: "220px",
    sortable: true,
    grow: 1,
  },
  {
    name: "Familia",
    selector: (row) => row.view_categorizations.description_family,
    width: "220px",
    sortable: true,
    grow: 1,
  },
  {
    name: "Unidad",
    selector: (row) => row.units?.description || "",
    sortable: true,
    width: "120px",
  },
  {
    name: "Precio",
    selector: (row) =>
      row.prices?.find((price) => price.default)?.price
        ? `$${row.prices.find((price) => price.default)?.price?.toFixed(2)}`
        : "",
    sortable: true,
    width: "120px",
  },
];
export default function Materials() {
  const [open, setOpen] = useState(false);
  const { getMaterials, materials } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!materials) getMaterials();
  }, []);
  const [filtered, setFiltered] = useState(materials ?? []);
  useEffect(() => {
    setFiltered(materials ?? []);
  }, [materials]);
  const handleUploadFile = () => {
    setOpen(true);
  };
  const headers = [
    { label: "ID", key: "id" },
    { label: "DESCRIPCION", key: "description" },
    { label: "ID FAMILIA", key: "view_categorizations.id_family" },
    { label: "FAMILIA", key: "view_categorizations.description_family" },
    { label: "ID RUBRO", key: "view_categorizations.id_category" },
    { label: "RUBRO", key: "view_categorizations.description_category" },
    { label: "ID SUBRUBRO", key: "view_categorizations.id_subcategory" },
    { label: "SUBRUBRO", key: "view_categorizations.description_subcategory" },
    { label: "UNIDAD", key: "units.description" },
    { label: "ID UNIDAD", key: "id_unit" },
    { label: "PRECIO", key: "defaultPrice" },
    { label: "PESO", key: "weight" },
    { label: "APLICACION", key: "application" },
  ];
  if (!materials) return <LoaderComponent />;
  return (
    <ProtectedRoute allowed={ALLOWED_MATERIALS}>
      <ContainerWithTitle
        title={"Materiales"}
        width="w-full"
        back_path="/"
        IconComponent={{ component: Box, color: "text-yellow-500" }}
      >
        <EntityTable
          data={materials}
          columns={columnsMaterials}
          onRowClick={(row) => navigate(`/materials/${row.id}`)}
          filterFields={[
            {
              key: "description",
              label: "Buscar por descripción",
              autoFilter: true,
            },
          ]}
          buttonExport={{
            headers,
            filename: "Materiales",
            type: "materials",
          }}
          buttonNavigate={{
            route: "/materials/new-material",
            title: "+ Material",
            color: "yellow",
          }}
        />
      </ContainerWithTitle>

      {/* <FooterUITables
        justify="justify-between"
        buttonNavigate={{ title: "+ Material", route: "/materials/new-material", color: "yellow" }}
      >
        <div className="flex gap-4">
          <div className="w-fit">
            <Button variant="blue" type="button" onClick={handleUploadFile}>
              Importar
            </Button>
          </div>
          <ButtonExport
            data={filtered}
            headers={headers}
            filename="Listado de materiales"
            type="materials"
          />
        </div>
      </FooterUITables> */}
      <ModalBase
        open={open}
        onClose={() => setOpen(false)}
        zIndex={10}
        title="Seleccionar archivo"
      >
        <div className="text-zinc-700 dark:text-zinc-300 mb-10 space-y-3">
          <p className="text-md font-semibold">Herramienta de Importación</p>
          <p>
            Para ayudarte a preparar los materiales de forma correcta, puedes
            usar una hoja de Google Sheets que genera el formato compatible con
            esta importación.
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-700 dark:text-zinc-300 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
            <li>
              Seleccioná familia, rubro y subrubro desde listas predefinidas.
            </li>
            <li>
              El archivo calcula automáticamente el{" "}
              <code className="text-blue-600 dark:text-blue-400">
                id_subrubro
              </code>{" "}
              correspondiente.
            </li>
            <li>
              Si la combinación no es válida, te avisa y resalta la fila en
              naranja.
            </li>
            <li>
              También puedes elegir la unidad de medida sin errores de
              escritura.
            </li>
          </ul>
          <a
            href="https://docs.google.com/spreadsheets/d/1QuuoWQXr5BYu-sZQLGGJ7Z-HOqQxzNxp3nMIHO0M4Ys/edit?gid=1833383596#gid=1833383596"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-primary-text hover:underline"
          >
            Ver hoja de Google Sheets para preparar archivo →
          </a>
        </div>

        <ImportCsvInput table="materials" onSuccess={getMaterials} />
      </ModalBase>
    </ProtectedRoute>
  );
}
