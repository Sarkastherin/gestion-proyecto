import { useFormContext } from "react-hook-form";
import { CurrencyTypeInput } from "./Generals/Inputs";
import { useModal } from "../context/ModalContext";
import { useMateriales } from "../context/Materiales/MaterialesContext";
import ModalPrecios from "./Materiales/ModalPrecios";
export const PrecioMaterialInput = ({
  seccionIndex,
  index,
  handleCostoTotalItem,
}) => {
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
    handleModalShow(`modal-precio-${seccionIndex}-${index}`);

    setActiveMaterial(material);
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
      <ModalPrecios
        handleChangePrice={handleChangePrice}
        index={index}
        seccionIndex={seccionIndex}
      />
    </>
  );
};
