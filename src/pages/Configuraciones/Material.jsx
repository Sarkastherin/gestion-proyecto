import { Input, TextInvalidate } from "../../components/Generals/Inputs";
import { useForm } from "react-hook-form";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import LayoutConfiguraciones from "../../templates/Configuraciones";
import { useState } from "react";
import { useModal } from "../../context/ModalContext";
export default function Material() {
  const { listaMaterial, postData, getListaMaterial } = useMateriales();
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
        <div>
          <Input
            label="Código"
            placeholder="3 caracteres máximo"
            {...register("cod", {
              required: { value: true, message: "Campo requerido" },
              maxLength: { value: 3, message: "3 caracteres máximo" },
              minLength: { value: 3, message: "3 caracteres mínimo" },
            })}
          />
          {errors.cod && <TextInvalidate message={errors.cod.message} />}
        </div>
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
        table: "material",
        values: [data],
      });
      if (error) {
        throw new Error(error.message);
      }
      setState((prev) => ({
        ...prev,
        response: {
          message: "¡Material Creado!",
          type: "success",
        },
      }));
      getListaMaterial();
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
      data={listaMaterial}
      title={"Crear nuevo tipo de material"}
      form={<Form />}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onError={onError}
      state={state}
      color={{color: "text-yellow-600", variant: "yellow"}}
    />
  );
}
