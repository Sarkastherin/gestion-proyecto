import { useFormContext, FormProvider, useForm } from "react-hook-form";
import { CurrencyTypeInput } from "./Generals/Inputs";
import { useModal } from "../context/ModalContext";
import { useMateriales } from "../context/Materiales/MaterialesContext";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ModalPrecios from "./Materiales/ModalPrecios";
import FormularioPrecios from "../templates/Materiales/FormularioPrecios";
export const PrecioMaterialInput = ({
  seccionIndex,
  index,
  handleCostoTotalItem,
}) => {
  const methods = useForm();
  const { activeMaterial } = useMateriales();
  const { materiales, setActiveMaterial } = useMateriales();
  const { handleModalShow, handleModalClose } = useModal();
  const { watch, setValue } = useFormContext();

  const handleShowPrices = () => {
    
    const descripcion = watch(
      `secciones.${seccionIndex}.items.${index}.material`
    );
    const material = materiales.find(
      (item) => item.descripcion === descripcion
    );
    /* borrar */
    handleModalShow(`modal-precio-${seccionIndex}-${index}`);

    setActiveMaterial(material);
    setShow(true);
  };
  const handleChangePrice = (value) => {
    if (value) {
      setValue(
        `secciones.${seccionIndex}.items.${index}.costo_unitario`,
        value.precio
      );
      setValue(
        `secciones.${seccionIndex}.items.${index}.id_proveedor`,
        value.id_proveedor
      );
      setValue(
        `secciones.${seccionIndex}.items.${index}.nombre_proveedor`,
        value.proveedor
      );
      handleCostoTotalItem(value.precio, index);
      handleModalClose();
    }
  };
  const [show, setShow] = useState(false);
  return (
    <>
      <span onClick={handleShowPrices}>
        <CurrencyTypeInput
          readOnly={true}
          value={
            watch(`secciones.${seccionIndex}.items.${index}.costo_unitario`) ||
            "0"
          }
        />
      </span>
      {/* <section
        className={`absolute top-0 left-0  shadow w-full h-1/4 bg-gray-50 ${
          !show && "hidden"
        }`}
      >
        <button
          title="close button"
          type="button"
          className={`text-gray-500 transition hover:text-red-600 cursor-pointer`}
          onClick={() => setShow(false)}
        >
          <XMarkIcon width={"24px"} onClick={handleModalClose} />
        </button>
        <FormProvider {...methods}>
          <FormularioPrecios
            onlyPrices={true}
            defaultValues={activeMaterial}
            handleChangePrice={handleChangePrice}
          />
        </FormProvider>
      </section> */}
      <ModalPrecios
        handleChangePrice={handleChangePrice}
        index={index}
        seccionIndex={seccionIndex}
      />
    </>
  );
};
