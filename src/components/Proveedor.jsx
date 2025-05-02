import { Input, InputXS } from "./Generals/Inputs";
import { Modal } from "./Modal";
import { UserGroupIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useFormContext } from "react-hook-form";
import { useProveedores } from "../context/ProveedoresContext";
export const Proveedor = ({index, disabled}) => {
  const {proveedores} = useProveedores();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectProveedor, setSelectProveedor] = useState({});
  const { handleModalShow, handleModalClose } = useModal();
  const {
    register,
    formState: { errors },
    setValue,
    watch
  } = useFormContext();
  useEffect(() => {
    setFilteredData(proveedores);
  }, [proveedores]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = proveedores.filter((item) =>
        item.nombre.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    }, 300); // Agrega un debounce de 300ms
    return () => clearTimeout(timeout);
  }, [search]);
  useEffect(() => {
    if (selectProveedor?.nombre) {
      setValue(`precios.${index}.proveedor`, selectProveedor.nombre, { shouldDirty: true });
      setValue(`precios.${index}.id_proveedor`, selectProveedor.id, { shouldDirty: true });
    }
  }, [selectProveedor, setValue]);
  return (
    <>
    <div className="flex gap-1">
    <InputXS
    className="basis-[60px]"
        label={"Id"}
        no_label
        disabled={disabled}
        readOnly
        {...register(`precios.${index}.id_proveedor`, {
          required: {
            value: true,
            message: "Debe seleccionar un proveedor",
          },
        })}
        placeholder="Seleccione un proveedor"
      />
      <InputXS
        label={"Proveedor"}
        no_label
        disabled={disabled}
        readOnly
        onClick={() => handleModalShow(`modal-proveedor-${index}`)}
        {...register(`precios.${index}.proveedor`, {
          required: {
            value: true,
            message: "Debe seleccionar un proveedor",
          },
        })}
        placeholder="Seleccione un proveedor"
      />
      </div>
      <Modal
        modalId={`modal-proveedor-${index}`}
        title={"Buscar Proveedor"}
        variant="primary"
        icon={<UserGroupIcon width={"24px"} />}
      >
        <div className="mt-4">
          <p className="mt-1 text-sm text-gray-700">Seleccione un proveedor.</p>
          <Input
            label="Buscar Proveedor"
            no_label
            type="search"
            placeholder="Buscar Proveedor"
            onInput={(e) => setSearch(e.target.value)}
          />
          <ul className="mt-2 max-h-[300px] overflow-y-auto">
            {filteredData.map((proveedor) => (
              <li
                className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                key={proveedor.id}
                onClick={() => {
                  setSelectProveedor(proveedor);
                  handleModalClose();
                }}
              >
                <p>{proveedor.nombre}</p>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};
