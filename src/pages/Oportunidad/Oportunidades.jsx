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
import { NoDataComponent } from "../../components/DataField";
import { useClientes } from "../../context/ClientContext";

export function Oportunidades() {
  const { getClientes, clientes } = useClientes();
  const { getOportunidades, oportunidades } = useOportunidad();

  const columns = [
    {
      name: "Nombre de la oportunidad",
      selector: (row) => row.nombre,
    },
    {
      name: "Cliente",
      selector: (row) => row.cliente?.name,
    },

    {
      name: "Monto Contización",
      selector: (row) =>
        row.monto_cotizado?.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        }) || "$ 0.00",
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Creado por",
      selector: (row) => `${row.nombre_usuario} ${row.apellido_usuario}`,
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
    getClientes();
  }, []);
  useEffect(() => {
    if (clientes.length > 0) {
      oportunidades.forEach((oportunidad) => {
        oportunidad.cliente = clientes.find(
          (cliente) => cliente.id === oportunidad.id_cliente
        );
      });
      console.log(oportunidades);
      setDataFiltered(oportunidades);
    }
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
              <Input
                label="Filtro"
                no_label
                placeholder={"Filtrar"}
                {...register("clienteQuery")}
              />
            </div>
            <div className="inline-flex gap-2">
              <Button
                text={"Filtrar"}
                icon={<FunnelIcon className="w-4" />}
                variant={"yellow"}
                hidden_text
              />

              <Button
                text={"Agregar Oportunidad"}
                icon={<PlusIcon className="w-4" />}
                variant={"primary"}
                onClick={() => navigate(`/nueva-oportunidad`)}
              />
            </div>
          </form>
          <TableComponent
            data={dataFiltered}
            columns={columns}
            handleOnRowClick={openOportunidad}
            conditionalRowStyles={conditionalRowStyles}
            noDataComponent={
              <NoDataComponent
                title={"No hay Oportunidades."}
                text={
                  "Puede agregar Oportunidades haciendo clic en el botón de abajo"
                }
                buttonText={"Agregar Oportunidad"}
                buttonIcon={<PlusIcon className="w-4" />}
                buttonVariant={"primary"}
              />
            }
          />
        </BoxComponent>
    </>
  );
}
