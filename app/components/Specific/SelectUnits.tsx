import { Select } from "../Forms/Inputs";
import { useEffect } from "react";
import type { SelectProps } from "../Forms/Inputs";
import { useData } from "~/context/DataContext";
import type { UnitsDB } from "~/types/materialsType";

export type Props = {} & SelectProps;

export const SelectUnits = ({ ...selectProps }) => {
  const { units, getUnits } = useData();
  useEffect(() => {
    if (!units) getUnits();
  }, []);
  return (
    <>
      {units && (
        <Select selectText="Selecciona unidad" {...selectProps}>
          {units?.map((unit: UnitsDB) => (
            <option key={unit.id} value={unit.id}>
              {unit.description}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};
