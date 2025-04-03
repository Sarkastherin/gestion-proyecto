import { CardToggle } from "../Cards";
import FormularioPrecios from "../../templates/Materiales/FormularioPrecios";
export default function DatosPrecios({defaultValues}) {
  return (
    <>
      <CardToggle title={"Precios"}>
        <FormularioPrecios defaultValues={defaultValues}/>
      </CardToggle>
    </>
  );
}
