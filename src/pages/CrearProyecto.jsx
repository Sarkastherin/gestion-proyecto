import Header from "../components/Header";
import { Label, Input, Textarea, InputGroup } from "../components/Inputs";
import { useForm } from "react-hook-form";
import { ButtonIcons, Button } from "../components/Buttons";
import { BuildingOffice2Icon } from "@heroicons/react/16/solid";
function CrearProyecto() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const onError = (errors) => console.error("Error:", errors);
  return (
    <>
      <Header text={"Creando proyecto"} />

      <form className="" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="max-w-5xl mx-auto mt-10 px-4">
          <div className="md:columns-2">
            <div className="w-full">
              <Label label={"Nombre del proyecto"} htmlFor={"nombreProyecto"} />
              <Input
                className="mt-1"
                {...register("nombreProyecto")}
                placeholder="Nombre del proyecto"
              />
            </div>
            <div className="w-full">
              <Label label={"Cliente"} htmlFor={"cliente"} />
              <InputGroup {...register("cliente")} placeholder="Buscar CLiente">
                <ButtonIcons
                  variant="secondaryOutline"
                  icon={<BuildingOffice2Icon width={"16px"} />}
                />
              </InputGroup>
            </div>
          </div>
          <div className="w-full mt-3">
            <Label label={"Alcance"} htmlFor={"alcance"} />
            <Textarea
              className="mt-1"
              {...register("alcance")}
              placeholder="Alcance"
            />
          </div>
        </div>
        <div className="absolute bottom-0 bg-neutral-300 w-full">
          <div className="flex gap-4 py-4 justify-end pr-12">
            <Button type="button" variant="secondary" className="">
              Cerrar
            </Button>
            <Button type="submit" onSubmit={handleSubmit(onSubmit, onError)}>
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
export default CrearProyecto;
