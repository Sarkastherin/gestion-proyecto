import Container from "../../components/Generals/Container";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import { useModal } from "../../context/ModalContext";
import {
  ModalLoading,
} from "../../components/Generals/ModalsTypes";
import { Button } from "../../components/Buttons";
import { useLocation } from "react-router-dom";
import FormularioMateriales from "../../templates/Materiales/FormularioMaterial";
import { useEffect, useState } from "react";
import { useProveedores } from "../../context/ProveedoresContext";
import ButtonEdit from "../../components/Generals/ButtonTypes";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import { Modal } from "../../components/Modal";
import { useNavigate } from "react-router-dom";
export default function MaterialID() {
  
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const { proveedores, getProveedores } = useProveedores();
  const { handleModalShow, handleModalClose } = useModal();
  const location = useLocation();
  const { materialData } = location.state || {};
  const [dataComplete, setDataComplete] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const { updateMaterial,refreshMateriales } = useMateriales();
  useEffect(() => {
    getProveedores();
  }, []);
  useEffect(() => {
    setDataComplete(materialData);
  }, [proveedores, materialData]);

  const onSubmit = async ({ values, dirtyFields }) => {
    handleModalShow("modal-loading");
    const updates = {};
    for (let item in dirtyFields) {
      if (dirtyFields[item]) {
        updates[item] = values[item];
      }
    }
    try {
      const { success, error } = await updateMaterial(updates, materialData.id);
      if (success) {
        setResponse({
          message: "Material actualizado correctamente",
          type: "success",
        });
        refreshMateriales();
        setIsEditable(false)
      } else {
        setResponse({
          message: "No se pudo actualizar el material",
          type: "danger",
        });
        console.error(error);
      }
    } catch (error) {
      setResponse({
        message: `Error al actualizar el material: ${error}`,
        type: "danger",
      });
    } finally {
      handleModalShow("modal-response");
    }
  };
  const onError = (data) => console.log("Error:", data);
 
  return (
    <>
      <Container text={"Creando Material"} to={"/materiales"}>
        <BoxComponentScrolling
          title="Creando Material"
          height="calc(100vh - 10rem)"
        >
          {dataComplete && (
            <FormularioMateriales
              defaultValues={dataComplete}
              isEditable={isEditable}
              onSubmit={onSubmit}
              onError={onError}
            />
          )}

          <ModalLoading
            id={"modal-loading"}
            title={"Guardando nuevo material"}
          />
        </BoxComponentScrolling>
        <div className="absolute bottom-[-90px] left-8">
          <ButtonEdit
            func={() => {
              setIsEditable(true);
            }}
          />
        </div>
      </Container>
      {response && (
        <Modal
          modalId={"modal-response"}
          title={
            response.type === "success" ? "¡Todo marcha bien!" : "Algo anda mal"
          }
          variant={response.type}
        >
          <div className="flex flex-col gap-4">
            {response.message}
            <Button
              className="max-w-50 mx-auto"
              variant={"primary"}
              onClick={() => navigate(`/materiales`)}
            >Ir al Materiales</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
