import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

import { FormOportunidad } from "../../templates/Oportunidad/FormOportunidad";
import { Button } from "../../components/Buttons";
import { useState } from "react";
export default function Informacion() {
  const [isDisabled, setIsDisabled] = useState(true);
  const { oportunidadData } = useOutletContext();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ defaultValues: oportunidadData });
  const onSubmit = (data) => console.log(data);
  const onError = (errors) => console.error("Error:", errors);
  console.log(oportunidadData);
  return (
    <>
    <Button
        className={"min-w-40"}
        type="button"
        variant="pink"
        title="Editar"
        name="Editar"
        onClick={() => {
          console.log('isDisabled');
          setIsDisabled(!isDisabled);
        }}
      />
      <FormOportunidad
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onError={onError}
        watch={watch}
        setValue={setValue}
        control={control}
        onSubmit={onSubmit}
        isDisabled={isDisabled}
      />
      
    </>
  );
}
