import { CardToggle } from "../Cards";
import { useFormContext } from "react-hook-form";
import { TrashIcon } from "@heroicons/react/16/solid";
import { Button } from "../Buttons";
import { Select, Textarea, Input } from "../Generals/Inputs";
function DatosPagos() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const formaPago = [
    { descripcion: "15 días fecha de factura por transferencia bancaria" },
    { descripcion: "15 días fecha de factura por e-cheq a 15 días" },
    { descripcion: "30 días fecha de factura por transferencia bancaria" },
    { descripcion: "30 días fecha de factura por e-cheq a 15 días" },
    { descripcion: "contra envio de factura por transferencia bancaria" },
    { descripcion: "contra envio de factura por e-cheq a 15 días" },
    { descripcion: "contra envio de factura por e-cheq a 30 días" },
    { descripcion: "Otro" },
  ];
  return (
    <CardToggle title={"Formas y metodos de pago"}>
      <div className="flex gap-2">
        <Select
          label="Forma de pago"
          {...register(`forma_pago`, {
            required: true,
          })}
        >
          <option value=''>
            Seleccione una formas de pago
          </option>
          {formaPago.map((item) => (
            <option key={item["descripcion"]} value={item["descripcion"]}>
              {item["descripcion"]}
            </option>
          ))}
        </Select>
        <Input label="Vigencia" type="date" {...register("vigencia")} />
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <Textarea
          placeholder="Tiempo de entrega"
          label="Tiempo de entrega"
          {...register("tiempo_entrega")}
        />
        <Textarea
          placeholder="Garantía"
          label="Garantía"
          {...register("garantía")}
        />
      </div>
    </CardToggle>
  );
}
export default DatosPagos;
