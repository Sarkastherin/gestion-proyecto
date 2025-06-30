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
        <div className="flex justify-between w-full px-10 py-5 hover:bg-zinc-900">
          <div className="flex gap-4">
            <Button variant="green" type="button" onClick={handleUploadFile}>
              Importar
            </Button>
            <Button type="button">Exportar</Button>
          </div>
          <ButtonNavigate variant="yellow" route="/new-material">
            Nuevo Material
          </ButtonNavigate>
        </div>
      </span>
      <Modal hidden={hidden} setHidden={setHidden} title="Seleccionar archivo">
        <div className="text-zinc-700 dark:text-zinc-300 mb-10">
          <p className="text-lg font-semibold">Recomendaciones</p>
          <ul className="list-disc ps-10">
            <li>
              Asegurate de guardar tu hoja de Excel como CSV delimitado por
              comas.
            </li>
            <li>La primera fila debe contener los nombres de las columnas.</li>
            <li>No uses celdas combinadas ni fórmulas sin resolver.</li>
          </ul>
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
