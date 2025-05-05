import { Input } from "../../components/Generals/Inputs";
import { useForm } from "react-hook-form";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import LayoutConfiguraciones from "../../templates/Configuraciones";
import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { cleanValue } from "react-currency-input-field";
export default function Material() {
  const { listaMaterial, postData, getMateriales } = useMateriales();
  const { register, handleSubmit } = useForm();
  const [state, setState] = useState({ response: null });
  const { handleModalClose, handleModalShow } = useModal();
  const columns = [
    {
      name: "Código",
      selector: (row) => row.cod,
      width: "170px",
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
    },
  ];
  const Form = () => {
    return (
      <>
        <Input
          label="Código"
          placeholder="3 caracteres maximo"
          {...register("cod", { required: true })}
        />
        <Input
          label="Descripción"
          {...register("descripcion", { required: true })}
        />
      </>
    );
  };
  const onSubmit = async (data) => {
    handleModalShow("modal-loading");
    try {
      const { success, error } = await postData({
        table: "material",
        values: [data],
      });
      if (error) {
        throw new Error(error);
      }
      setState((prev) => ({
        ...prev,
        response: {
          message: "¡Material Creado!",
          type: "success",
        },
      }));
      getMateriales();
    } catch (e) {
      console.log(e);
      setState((prev) => ({
        ...prev,
        response: {
          message:
            `Hubo algunos problemas, no se pudo crear el tipo de material ${e}`,
          type: "danger",
        },
      }));
    } finally {
      handleModalShow("modal-response");
    }
  };
  const onError = (data) => console.log(data);
  return (
    <LayoutConfiguraciones
      columns={columns}
      data={listaMaterial}
      title={"Crear nuevo tipo de material"}
      form={<Form />}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onError={onError}
      state={state}
    />
  );
}
