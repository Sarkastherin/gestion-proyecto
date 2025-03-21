import Header from "../../components/Generals/Header";
import { BoxComponent } from "../../components/BoxComponent";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import TableComponent from "../../components/TableComponent";
import { NoDataComponent } from "../../components/DataField";
import { Input } from "../../components/Inputs";
import { Button } from "../../components/Buttons";
import { FunnelIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useMateriales } from "../../context/Materiales/MaterialesContext";

export default function Materiales() {
  const { materiales, listaMaterial, listaTipo } = useMateriales();
  const [dataFiltered, setDataFiltered] = useState([]);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });
  const handleFilter = (data) => {
    /* setDataFiltered(
      oportunidades.filter((item) => {
        return (
          item.trazabilidad.toString().includes(data.trazabilidadQuery) &&
          item.cliente
            .toLowerCase()
            .includes(data.clienteQuery.toLowerCase()) &&
          item.modelo.toLowerCase().includes(data.modeloQuery.toLowerCase())
        );
      })
    ); */
  };
  const openMaterial = (data) => {
    navigate(`/material/${data.id}`, { state: { materialData: data } });
  };
  useEffect(() => {
    if (listaTipo.length > 0 && materiales.length> 0) {
      materiales.forEach((material) => {
        material.tipo = listaTipo.find((tipo) => tipo.id === material.id_tipo).descripcion
        material.material = listaMaterial.find((mat) => mat.id === material.id_material).descripcion
      })
      setDataFiltered(materiales);
    }
  }, [materiales]);
  const columns = [
    {
      name: "Código",
      selector: (row) => row.codigo,
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      width: "480px",
    },
    {
      name: "Tipo",
      selector: (row) => row.tipo,
    },
    {
      name: "Material",
      selector: (row) => row.material,
    },
    {
      name: "Medida",
      selector: (row) => row.medida,
    },
    {
      name: "Espesor",
      selector: (row) => row.espesor,
    },
  ];
  return (
    <>
      <Header text={"Materiales"} />
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
              {...register("materialesQuery")}
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
              text={"Nuevo Material"}
              icon={<PlusIcon className="w-4" />}
              variant={"primary"}
              onClick={() => navigate(`/nuevo-material`)}
            />
          </div>
        </form>
        <TableComponent
          data={dataFiltered}
          columns={columns}
          handleOnRowClick={openMaterial}
          noDataComponent={
            <NoDataComponent
              title={"No hay Materiales."}
              text={
                "Puede agregar Materiales haciendo click en el botón de abajo"
              }
              buttonText={"Agregar Material"}
              buttonIcon={<PlusIcon className="w-4" />}
              buttonVariant={"primary"}
            />
          }
        />
      </BoxComponent>
    </>
  );
}
