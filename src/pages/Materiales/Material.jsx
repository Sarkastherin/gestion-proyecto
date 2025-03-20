import Header from "../../components/Generals/Header";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import { useModal } from "../../context/ModalContext";
import {
  ModalLoading,
  ModalSuccess,
} from "../../components/Generals/ModalsTypes";
import { Button } from "../../components/Buttons";
import { useLocation } from "react-router-dom";
import FormularioMateriales from "../../templates/Materiales/FormularioMaterial";
import { useEffect, useState } from "react";
import { useProveedores } from "../../context/ProveedoresContext";
export default function MaterialID() {
  const { proveedores, getProveedores } = useProveedores();
  const { handleModalShow, handleModalClose } = useModal();
  const location = useLocation();
  const { materialData } = location.state || {};
  const idsModal = { loading: "id-modal-loading", success: "id-modal-success" };
  const [dataComplete, setDataComplete] = useState(null);
  useEffect(() => {
    getProveedores();
  }, []);
  useEffect(() => {
    console.log(materialData)
    if (materialData && materialData.precios.length > 0) {
      materialData.precios.map((item) => {
        item.proveedor = proveedores.find(
          (proveedor) => proveedor.id === item.id_proveedor
        )?.name;
        return item;
      });
    }
    setDataComplete(materialData);
  }, [proveedores, materialData]);

  const onSubmit = ({ allValues }) => {
    console.log(allValues);
    handleModalShow(idsModal.loading);
    setTimeout(() => {
      handleModalClose();
      handleModalShow(idsModal.success);
    }, 2000);
  };
  const onError = (data) => console.log("Error:", data);
  return (
    <>
      <Header text={"Creando Material"}>
        <BoxComponentScrolling
          title="Creando Material"
          height="calc(100vh - 10rem)"
        >
          {dataComplete && (
            <FormularioMateriales
            defaultValues={dataComplete}
            isEditable={false}
            onSubmit={onSubmit}
            onError={onError}
          />
          )}
          
          <ModalLoading
            id={idsModal.loading}
            title={"Guardando nuevo material"}
          />
          <ModalSuccess
            id={idsModal.success}
            title={"Material creado exitosamente"}
          >
            <div className="mt-10 text-center">
              <Button
                className={"min-w-40"}
                type="button"
                variant="green"
                text="..."
              />
            </div>
          </ModalSuccess>
        </BoxComponentScrolling>
      </Header>
    </>
  );
}
