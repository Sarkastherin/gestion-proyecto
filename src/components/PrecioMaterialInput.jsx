import { useFormContext } from "react-hook-form";
import { CurrencyTypeInput } from "./Generals/Inputs";
import { useModal } from "../context/ModalContext";
import { useMateriales } from "../context/Materiales/MaterialesContext";
import { useEffect } from "react";
export const PrecioMaterialInput = ({
  seccionIndex,
  index,
  handleCostoTotalItem,
}) => {
  const { materiales, setActiveMaterial } = useMateriales();
  const { handleModalShow } = useModal();
  const { watch, setValue } = useFormContext();

  const handleShowPrices = () => {
    const descripcion = watch(
      `secciones.${seccionIndex}.items.${index}.material`
    );
    const material = materiales.find(
      (item) => item.descripcion === descripcion
    );
    handleModalShow("modal-precio");
    setActiveMaterial(material);
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
          onValueChange={(value) => handleCostoTotalItem(value, index)}
        />
      </span>
    </>
  );
};
