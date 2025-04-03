import { Input, TextInvalidate, Select } from "./Generals/Inputs";
import { Modal } from "./Modal";
import { UserGroupIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useFormContext } from "react-hook-form";
import { useMateriales } from "../context/Materiales/MaterialesContext";
export const Material = ({
  seccionIndex,
  index,
  selectMaterial,
  setSelectMaterial,
}) => {
  const { materiales, listaUnidades } = useMateriales();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { handleModalShow, handleModalClose } = useModal();
  const {
    register,
    formState: { errors },
    setValue,
    watch
  } = useFormContext();
  useEffect(() => {
    setFilteredData(materiales);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = materiales.filter((item) =>
        item.descripcion.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    }, 300); // Agrega un debounce de 300ms
    return () => clearTimeout(timeout);
  }, [search]);
  useEffect(() => {
    if (selectMaterial[index]?.descripcion) {
      setValue(
        `secciones.${seccionIndex}.items.${index}.material`,
        selectMaterial[index].descripcion,
        { shouldDirty: true }
      );
      setValue(
        `secciones.${seccionIndex}.items.${index}.unidad`,
        selectMaterial[index].unidad,
        { shouldDirty: true }
      );
        const indexDefaultPrecio = selectMaterial[index].precios.findIndex(
          (item) => item.default || 0
        );
        const precioDefault = selectMaterial[index].precios[indexDefaultPrecio]?.precio || 0;
        setValue(
          `secciones.${seccionIndex}.items.${index}.costo_unitario`,
          precioDefault,
          { shouldDirty: true }
        );
    }
  }, [selectMaterial[index], setValue]);

  const handleSelectMaterial = (material) => {
    setSelectMaterial((prev) => ({...prev, [index]: material}))
    handleModalClose();
  };
  return (
    <>
      <div className="flex gap-2">
        <Input
          label={"Material"}
          className="basis-3/4"
          no_label
          onClick={() => handleModalShow("modalMaterial")}
          {...register(
            `secciones.${seccionIndex}.items.${index}.material`
          )}
          placeholder="Seleccione un material"
        />
        <Select
          label="Unidad"
          no_label
          className="basis-1/4"
          placeholder="Unidad"
          disabled
          {...register(`secciones.${seccionIndex}.items.${index}.unidad`)}
        >
          {listaUnidades?.map((item) => (
            <option key={item.id} value={item.abreviatura}>
              {item.descripcion}
            </option>
          ))}
        </Select>
      </div>
      {errors.proveedor && (
        <TextInvalidate message={errors.proveedor.message} />
      )}
      <Modal
        modalId="modalMaterial"
        title={"Buscar Material"}
        variant="primary"
        icon={<UserGroupIcon width={"24px"} />}
      >
        <div className="mt-4">
          <p className="mt-1 text-sm text-gray-700">Seleccione un proveedor.</p>
          <Input
            className=""
            label="Buscar Material"
            no_label
            type="search"
            placeholder="Buscar Material"
            onInput={(e) => setSearch(e.target.value)}
            /* {...register("getMaterial", {})} */
          />
          <ul className="mt-2 max-h-[300px] overflow-y-auto">
            {filteredData.map((material) => (
              <li
                className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                key={material.id}
                onClick={() => handleSelectMaterial(material)}
              >
                <p>{material.descripcion}</p>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};
