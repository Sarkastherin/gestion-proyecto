import Header from "../../components/Header";
import { BoxComponent } from "../../components/BoxComponent";
import TableComponent from "../../components/TableComponent";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "../../components/Inputs";
import { Button } from "../../components/Buttons";
import { FunnelIcon } from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";

export function Oportunidades() {
  const { getOportunidades, oportunidades } = useOportunidad();

  const columns = [
    {
      name: "Nombre de la oportunidad",
      selector: (row) => row.nombre_oportunidad,
    },
    {
      name: "Nombre del cliente",
      selector: (row) => row.cliente,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Monto Contización",
      selector: (row) =>
        row.monto_cotizado.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        }),
    },
    {
      name: "Creado por",
      selector: (row) => row.creador,
    },
  ];
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });
  const [dataFiltered, setDataFiltered] = useState([]);

  const conditionalRowStyles = [
    {
      when: (row) => row.status === "Aceptado", //lime-100
      style: {
        backgroundColor: "#ecfccb",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "Rechazado",
      style: {
        backgroundColor: "#fee2e2", //Red-100
        color: "#b91c1c",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  const handleFilter = (data) => {
    data.trazabilidadQuery = data.trazabilidadQuery
      .replace(".", "")
      .replace("-", "");
    setDataFiltered(
      oportunidades.filter((item) => {
        return (
          item.trazabilidad.toString().includes(data.trazabilidadQuery) &&
          item.cliente
            .toLowerCase()
            .includes(data.clienteQuery.toLowerCase()) &&
          item.modelo.toLowerCase().includes(data.modeloQuery.toLowerCase())
        );
      })
    );
  };
  const openOportunidad = (data) => {
    localStorage.setItem("oportunidadData", JSON.stringify(data)); // Guardar en localStorage
    navigate(`/oportunidad/${data.id}/resumen`);
    //navigate(`/oportunidad/${data.id}/resumen`, { state: { oportunidadData: data } });
  };

  useEffect(() => {
    getOportunidades();
  }, []);
  useEffect(() => {
    setDataFiltered(oportunidades);
  }, [oportunidades]);
  return (
    <>
      <Header text={"Oportunidades"} />
      <BoxComponent title="Creando Oportunidad" size="full">
        <form
          onSubmit={handleSubmit(handleFilter)}
          className="flex gap-2 mb-4 justify-between"
        >
          <div className="inline-flex gap-2">
            <Input placeholder={"Cliente"} {...register("clienteQuery")} />
            <Input placeholder={"Cliente"} {...register("clienteQuery")} />
            <Input placeholder={"Cliente"} {...register("clienteQuery")} />
            <Input placeholder={"Cliente"} {...register("clienteQuery")} />
          </div>
          <div className="inline-flex gap-2">
            <Button
              name={"Filtrar"}
              icon={<FunnelIcon className="w-4" />}
              variant={"yellow"}
              hidden_name
            />

            <Button
              name={"Agregar Oportunidad"}
              icon={<PlusIcon className="w-4" />}
              variant={"primary"}
            />
          </div>
        </form>
        <TableComponent
          data={dataFiltered}
          columns={columns}
          handleOnRowClick={openOportunidad}
          conditionalRowStyles={conditionalRowStyles}
        />
      </BoxComponent>
    </>
  );
}
