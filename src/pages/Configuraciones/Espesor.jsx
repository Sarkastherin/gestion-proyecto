import { Input, TextInvalidate } from "../../components/Generals/Inputs";
import { useForm } from "react-hook-form";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import LayoutConfiguraciones from "../../templates/Configuraciones";
import { useState } from "react";
import { useModal } from "../../context/ModalContext";
export default function Espesor() {
  const { listaEspesor, postData, getListaEspesor } = useMateriales();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState({ response: null });
  const { handleModalShow } = useModal();
  const columns = [
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
    },
  ];
  const Form = () => {
    return (
      <>
        <div>
          <Input
            label="Descripción"
            {...register("descripcion", {required:{ value: true, message: "Campo requerido" }})}
          />
          {errors.cod && <TextInvalidate message={errors.cod.message} />}
        </div>
      </>
    );
  };
  const onSubmit = async (data) => {
    handleModalShow("modal-loading");
    try {
      const { success, error } = await postData({
        table: "espesores",
        values: [data],
      });
      if (error) {
        throw new Error(error.message);
      }
      setState((prev) => ({
        ...prev,
        response: {
          message: "Espesor Creado!",
          type: "success",
        },
      }));
      getListaEspesor();
      reset();
    } catch (e) {
      console.log(e);
      setState((prev) => ({
        ...prev,
        response: {
          message: e.message,
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
      data={listaEspesor}
      title={"Crear nuevo Espesor"}
      form={<Form />}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onError={onError}
      state={state}
    />
  );
}
