import { Input, TextInvalidate } from "./Inputs";
import { Modal } from "./Modal";
import { UserGroupIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useFormContext } from "react-hook-form";
import { useProveedores } from "../context/ProveedoresContext";
import { useMateriales } from "../context/Materiales/MaterialesContext";
export const Material = ({seccionIndex,index}) => {
  const {materiales} = useMateriales();
  const {proveedores} = useProveedores();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectMaterial, setSelectMaterial] = useState({});
  const { handleModalShow, handleModalClose } = useModal();
  const {
    register,
    formState: { errors },
    setValue,
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
    console.log(selectMaterial)
    if (selectMaterial?.descripcion) {
      setValue(`secciones.${seccionIndex}.items.${index}.descripcion_material`, selectMaterial.descripcion, { shouldDirty: true });
      setValue(`secciones.${seccionIndex}.items.${index}.id_material`, selectMaterial.id, { shouldDirty: true });
    }
  }, [selectMaterial, setValue]);
  return (
    <>
      <Input
        label={"Material"}
        className="mb-1.5"
        no_label
        onClick={() => handleModalShow("modalMaterial")}
        {...register(`secciones.${seccionIndex}.items.${index}.descripcion_material`)}
        placeholder="Seleccione un material"
      />
      {errors.proveedor && <TextInvalidate message={errors.proveedor.message} />}
      <Modal
        modalId="modalMaterial"
        title={"Buscar Material"}
        variant="primary"
        icon={<UserGroupIcon width={"24px"} />}
      >
        <div className="mt-4">
          <p className="mt-1 text-sm text-gray-700">Seleccione un proveedor.</p>
          <Input
          className="mb-1.5"
            label="Buscar Material"
            no_label
            type="search"
            placeholder="Buscar Material"
            onInput={(e) => setSearch(e.target.value)}
            {...register("getMaterial", {})}
          />
          <ul className="mt-2 max-h-[300px] overflow-y-auto">
            {filteredData.map((proveedor) => (
              <li
                className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                key={proveedor.id}
                onClick={() => {
                  setSelectMaterial(proveedor);
                  handleModalClose();
                }}
              >
                <p>{proveedor.descripcion}</p>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};
