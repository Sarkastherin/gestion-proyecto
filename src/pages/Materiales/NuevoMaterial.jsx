import Header from "../../components/Generals/Header";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import { useModal } from "../../context/ModalContext";
import {
  ModalLoading,
  ModalSuccess,
  ModalError,
} from "../../components/Generals/ModalsTypes";
import { Button } from "../../components/Buttons";
import FormularioMateriales from "../../templates/Materiales/FormularioMaterial";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
export default function NuevoMaterial() {
  const { postMaterial } = useMateriales();
  const { handleModalShow, handleModalClose } = useModal();

  const onSubmit = async ({ data }) => {
    delete data.cod_material;
    delete data.desc_material;
    delete data.cod_tipo;
    delete data.desc_tipo;
    /* handleModalShow(idsModal.loading);
    try {
      const { data, error } = await postMaterial(data);
      if (error) {
        handleModalShow(idsModal.danger);
      }
      else {handleModalShow(idsModal.success);}
    } catch (error) {
      console.error("Error al crear el material:", error);
    } */
    console.log(data)
  };
  const onError = (data) => console.log("Error:", data);
  const idsModal = { loading: "id-modal-loading", success: "id-modal-success", danger: "id-modal-danger"};
  return (
    <>
      <Header text={"Creando Material"}>
        <BoxComponentScrolling
          title="Creando Material"
          height="calc(100vh - 10rem)"
        >
          <FormularioMateriales
            isEditable={true}
            onSubmit={onSubmit}
            onError={onError}
          />
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
                text="Ir a Materiales"
              />
            </div>
          </ModalSuccess>
          <ModalError
            id={idsModal.danger}
            title={"Algo salió mal"}
          >
            <div className="mt-10 text-center">
              <Button
                className={"min-w-40"}
                type="button"
                variant="red"
                text="..."
              />
            </div>
          </ModalError>
        </BoxComponentScrolling>
      </Header>
    </>
  );
}
