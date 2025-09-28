import ModalBase from "../ModalBase";
import { columnsMaterials } from "~/routes/materials";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useState, useEffect } from "react";
import type { MaterialsUI } from "~/types/materialsType";
import { useData } from "~/context/DataContext";
export default function MaterialsModal({
  open,
  onClose,
  activeIndex,
  onSelectMaterial,
}: {
  open: boolean;
  onClose: () => void;
  activeIndex: number | null;
  onSelectMaterial: (index: number, material: MaterialsUI) => void;
}) {
  const [filterData, setFilterData] = useState<MaterialsUI[]>([]);
  const { getMaterials, materials } = useData();
  const handleRowClicked = (data: MaterialsUI) => {
    if (activeIndex !== null) {
      onSelectMaterial(activeIndex, data);
      onClose();
    }
  };
  useEffect(() => {
    if (!materials) {
      getMaterials();
    }
  }, []);
  useEffect(() => {
    if (materials) {
      setFilterData(materials);
    }
  }, [materials]);
  return (
    <ModalBase
      title="Listado de Materiales"
      open={open}
      zIndex={40}
      onClose={onClose}
      width="max-w-4xl"
      footer={{
        btnSecondary: {
          label: "Cancelar",
          handleOnClick: onClose,
        },
      }}
    >
      <div
        className="px-6 pt-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 270px)" }}
      >
        <EntityTable
          columns={columnsMaterials}
          data={filterData}
          onRowClick={handleRowClicked}
          filterFields={[
            { key: "description", label: "Buscar por descripción" },
          ]}
        />
      </div>
    </ModalBase>
  );
}
