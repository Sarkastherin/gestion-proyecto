import Container from "../../components/Generals/Container";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import TableComponent from "../../components/TableComponent";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input, Select } from "../../components/Generals/Inputs";
import { Button } from "../../components/Buttons";
import { FunnelIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { NoDataComponent } from "../../components/DataField";
import { useClientes } from "../../context/ClientContext";
import { Footer } from "../../components/Footer";

export function Oportunidades() {
  const { getOportunidades, oportunidades } = useOportunidad();

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: "Nombre de la oportunidad",
      selector: (row) => row.nombre,
    },
    {
      name: "Cliente",
      selector: (row) => row.cliente?.name,
      width: "200px"
    },
    {
      name: "$ Contización",
      selector: (row) =>
        row.total_monto?.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        }) || "$ 0.00",
        width: "150px"
    },
    {
      name: "Status",
      selector: (row) => row.status,
       width: "120px"
    },
    {
      name: "Creado por",
      selector: (row) => row.usuario,
      width: "120px"
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
    navigate(`/oportunidad/${data.id}/resumen`);
  };
  const SubHeaderComponent = () => {
    return (
      <div className="flex justify-between items-center mt-8">
        <form
          onSubmit={handleSubmit(handleFilter)}
          className="flex items-center justify-between gap-2 w-full"
        >
          <div className="grid md:grid-cols-6 gap-2 grid-cols-3">
            <Input
             className="col-span-3"
              label="Oportunidad"
              no_label
              placeholder={"Oportunidad"}
              {...register("oportunidad")}
            />
            <Input
              className="col-span-2"
              label="Cliente"
              no_label
              placeholder={"Cliente"}
              {...register("cliente")}
            />
            <Select
              label={"Status"}
              no_label
              placeholder={"Status"}
              {...register("status")}
            >
              {[].map((tipo) => (
                <option key={tipo.id} value={tipo.descripcion}>
                  {`[${tipo.cod}] ${tipo.descripcion}`}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Button
              className="flex-none"
              type="submit"
              text={"Filtrar"}
              icon={<FunnelIcon className="w-4" />}
              variant={"yellow"}
              hidden_text
            />
          </div>
        </form>
      </div>
    );
  };
  useEffect(() => {
    getOportunidades();
  }, []);
  useEffect(() => {setDataFiltered(oportunidades);
  }, [oportunidades]);
  return (
    <>
      <Container text={"Oportunidades"} to={"/"}>
        <BoxComponentScrolling
          title="Creando Oportunidad"
          height="calc(100vh - 10rem)"
          size="max-w-full"
        >
          <SubHeaderComponent />
          <TableComponent
            data={dataFiltered}
            columns={columns}
            handleOnRowClick={openOportunidad}
            conditionalRowStyles={conditionalRowStyles}
            onRowMouseEnter={(data, e)=>{document.getElementById(e.target.id).setAttribute("title",data.nombre)}}
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
        </BoxComponentScrolling>
        <Footer>
          <div className="flex gap-2 justify-end">
            <Button
              text={"Nueva Oportunidad"}
              icon={<PlusIcon className="w-4" />}
              variant={"primary"}
              onClick={() => navigate(`/nueva-oportunidad`)}
            />
          </div>
        </Footer>
      </Container>
    </>
  );
}
