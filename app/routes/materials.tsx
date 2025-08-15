import type { Route } from "./+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ButtonNavigate } from "~/components/Specific/Buttons";
import { useNavigate } from "react-router";
import { useUI } from "~/context/UIContext";
import { useEffect, useState } from "react";
import { MaterialTable } from "~/templates/MaterialTable";
import type { HandleRowClicked } from "~/templates/MaterialTable";
import { Button } from "~/components/Forms/Buttons";
import { Modal } from "~/components/Generals/Modals";
import { ImportCsvInput } from "~/utils/import";
import { ButtonExport } from "~/components/Specific/Buttons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Materiales" },
    { name: "Materiales", content: "Materiales" },
  ];
}

export default function Materials() {
  const [hidden, setHidden] = useState(true);
  const {
    setSelectedMaterial,
    categorizations,
    getCategorizations,
    getMaterials,
    materials,
  } = useUI();
  const navigate = useNavigate();
  useEffect(() => {
    if (!categorizations) {
      getCategorizations();
    }
  }, []);
  const handleRowClicked: HandleRowClicked = (data) => {
    setSelectedMaterial(null);
    navigate(`/material/${data.id}`);
  };
  const handleUploadFile = () => {
    setHidden(false);
  };
  const headers = [
    { label: "ID", key: "id" },
    { label: "FAMILIA", key: "view_categorizations.description_family" },
    { label: "RUBRO", key: "view_categorizations.description_category" },
    { label: "SUBRUBRO", key: "view_categorizations.description_subcategory" },
    { label: "DESCRIPCION", key: "description" },
  ];
  return (
    <>
      <ContainerWithTitle title="Materiales" width="w-full">
        {categorizations ? (
          <MaterialTable
            handleRowClicked={handleRowClicked}
            paginationPerPage={30}
          />
        ) : (
          <p className="text-center font-medium text-2xl">Cargando Datos</p>
        )}
      </ContainerWithTitle>
      <span className="fixed bottom-0 w-full">
        <div className="flex justify-between w-full px-10 py-5 hover:bg-zinc-200 hover:dark:bg-zinc-900">
          <div className="flex gap-4">
            <div className="w-32">
              <Button variant="blue" type="button" onClick={handleUploadFile}>
                Importar
              </Button>
            </div>
            <ButtonExport
              data={materials ?? []}
              headers={headers}
              filename="Listado de materiales"
              type="materials"
            />
          </div>
          <div className="w-4/*  */2">
            <ButtonNavigate variant="yellow" route="/new-material">
              Nuevo Material
            </ButtonNavigate>
          </div>
        </div>
      </span>
      <Modal hidden={hidden} setHidden={setHidden} title="Seleccionar archivo">
        <div className="text-zinc-700 dark:text-zinc-300 mb-10 space-y-3">
          <p className="text-lg font-semibold">Herramienta de Importación</p>
          <p>
            Para ayudarte a preparar los materiales de forma correcta, puedes
            usar una hoja de Google Sheets que genera el formato compatible con
            esta importación.
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
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
            className="inline-block mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Ver hoja de Google Sheets para preparar archivo →
          </a>
        </div>

        <ImportCsvInput
          table="materials"
          className="block text-sm text-zinc-700 file:border-none file:bg-indigo-600 file:text-white file:rounded file:px-4 file:py-1 hover:file:bg-indigo-500"
          onSuccess={getMaterials}
        />
      </Modal>
    </>
  );
}
