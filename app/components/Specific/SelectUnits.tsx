import { Select } from "../Forms/Inputs";
import { useUI } from "~/context/UIContext";
import { useEffect } from "react";
import type { UnitsType } from "~/backend/dataBase";
import type { SelectProps } from "../Forms/Inputs";

export type Props = {} & SelectProps;

export const SelectUnits = ({ ...selectProps }) => {
  const { units, getUnits } = useUI();
  useEffect(() => {
    if (!units) getUnits();
  }, []);
  return (
    <>
      {units && (
        <Select selectText="Selecciona unidad" {...selectProps}>
          {units?.map((unit: UnitsType) => (
            <option key={unit.id} value={unit.id}>
              {unit.description}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};
