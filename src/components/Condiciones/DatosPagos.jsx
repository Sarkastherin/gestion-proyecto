import { CardToggle } from "../Cards";
import { useFormContext } from "react-hook-form";
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
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Select
            label="Forma de pago"
            {...register(`forma_pago`, {
              required: true,
            })}
          >
            <option value="">Seleccione una formas de pago</option>
            {formaPago.map((item) => (
              <option key={item["descripcion"]} value={item["descripcion"]}>
                {item["descripcion"]}
              </option>
            ))}
          </Select>
          <Textarea
            placeholder="Plazo de ejecución"
            label="Plazo de ejecución"
            {...register("tiempo_entrega")}
          />
        </div>
        <Textarea
          placeholder="Garantía"
          label="Garantía"
          {...register("garantia")}
        />
        <div className="flex gap-2">
          <Input label="Vigencia" type="date" {...register("vigencia")} />
          <Input
            label="Fecha probable de inicio"
            type="date"
            {...register("fecha_inicio_estimada")}
          />
          <Select
          className="basis-1/3"
          label="Status"
          disabled
          {...register("status_cotizacion", {
            required: {
              value: true,
              message: "Seleccione un status",
            }
          })}
        >
          <option className="bg-green-300/50" value={"Abierta"}>
          🔓 Abierta
          </option>
          <option className="bg-red-300/50" value={"Cerrada"}>
          🔒 Cerrada
          </option>
        </Select>
        </div>
        <Textarea
            placeholder="Notas de Cotización"
            label="Notas de Cotización"
            {...register("notas")}
          />
      </div>
    </CardToggle>
  );
}
export default DatosPagos;
