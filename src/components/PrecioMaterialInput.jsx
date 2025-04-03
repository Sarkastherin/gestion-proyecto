import { TextInvalidate, Input } from "./Generals/Inputs";
import { Modal } from "./Modal";
import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CurrencyTypeInput } from "./Generals/Inputs";
import { Button } from "./Buttons";
import { useModal } from "../context/ModalContext";
import { useMateriales } from "../context/Materiales/MaterialesContext";
import Table from "./Generals/Table";
import { Proveedor } from "./Proveedor";
export const PrecioMaterialInput = ({
  seccionIndex,
  index,
  selectMaterial,
  handleCostoTotalItem,
}) => {
  const { materiales, setActiveMaterial, material } = useMateriales();
  const { handleModalClose, handleModalShow } = useModal();
  //const [descripcionMaterial, setDescripcionMaterial] = useState(null);
  
  //const [material, setMaterial] = useState(null);
  const [hiddePrices, setHiddePrices] = useState(true);
  const {
    formState: { errors },
    setValue,
    watch,
    register
  } = useFormContext();

  const handleSetPrecio = (e, item) => {
    setValue(
      `secciones.${seccionIndex}.items.${index}.costo_unitario`,
      item.precio
    );
    setHiddePrices(true);
    handleCostoTotalItem(item.precio, index);
  };
  const handleShowPrices = () => {
    const descripcion = watch(
      `secciones.${seccionIndex}.items.${index}.material`
    );
    const material = materiales.find(
      (item) => item.descripcion === descripcion
    );
    setActiveMaterial(material);
    setShow(true);
    console.log(material);
  };
  const cells = [
    { element: "#", w: "w-10" },
    { element: "Fecha", w: "w-50" },
    { element: "Proveedor", w: "w-full", flex: "flex-1" },
    { element: "Precio", w: "w-50" },
    { element: "Predeterminado", w: "w-30" },
    { element: <TrashIcon className="w-4" />, w: "w-10" },
  ];
  return (
    <>
      <span onClick={handleShowPrices}>
        <CurrencyTypeInput
          readOnly={true}
          value={
            watch(`secciones.${seccionIndex}.items.${index}.costo_unitario`) ||
            "0"
          }
          onValueChange={(value) => handleCostoTotalItem(value, index)}
        />
      </span>
      
    </>
  );
};
