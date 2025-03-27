import Container from "../../components/Generals/Container";
import {
  BoxComponent,
  BoxComponentScrolling,
} from "../../components/BoxComponent";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import TableComponent from "../../components/TableComponent";
import { NoDataComponent } from "../../components/DataField";
import { Input, Select } from "../../components/Inputs";
import { Button } from "../../components/Buttons";
import { FunnelIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import { Footer } from "../../components/Footer";

export default function Materiales() {
  const { materiales, listaEspesor, listaTipo, listaMaterial, listaMedida } =
    useMateriales();
  const [dataFiltered, setDataFiltered] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {},
  });

  const openMaterial = (data) => {
    navigate(`/material/${data.id}`, { state: { materialData: data } });
  };
  useEffect(() => {
    setDataFiltered(materiales);
  }, [materiales]);

  const columns = [
    {
      name: "Código",
      selector: (row) => row.codigo,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
      width: "40vw",
    },
    {
      name: "Tipo",
      selector: (row) => row.tipo,
      sortable: true,
    },
    {
      name: "Material",
      selector: (row) => row.material,
      sortable: true,
    },
    {
      name: "Medida",
      selector: (row) => row.medida,
      sortable: true,
    },
    {
      name: "Espesor",
      selector: (row) => row.espesor,
      sortable: true,
    },
  ];
  const handleFilter = (data) => {
    const filter = materiales.filter((item) =>
      Object.values(data).every((value) =>
        item.descripcion.toLowerCase().includes(value.toLowerCase()) 
      )
    ).filter((item) => item.codigo.includes(data.codigo));;
    
    setDataFiltered(
      filter.length > 0
        ? filter
        : [{ descripcion: "No hay datos para mostrar" }]
    );
  };
  const SubHeaderComponent = () => {
    return (
      <div className="flex justify-between items-center mt-8">
        <form
          onSubmit={handleSubmit(handleFilter)}
          className="flex items-center justify-between gap-2"
        >
          <div className="grid md:grid-cols-8 gap-2 grid-cols-4">
            <Input
              label="Código"
              no_label
              placeholder={"Código"}
              {...register("codigo")}
            />
            <Input
              className="col-span-3"
              label="Descripcion"
              no_label
              placeholder={"Descripcion"}
              {...register("descripcion")}
            />
            <Select
              label={"Tipo"}
              no_label
              placeholder={"Tipo"}
              {...register("tipo")}
            >
              {listaTipo.map((tipo) => (
                <option key={tipo.id} value={tipo.descripcion}>
                  {`[${tipo.cod}] ${tipo.descripcion}`}
                </option>
              ))}
            </Select>
            <Select
              label={"Material"}
              no_label
              placeholder={"Material"}
              {...register("material")}
            >
              {listaMaterial.map((material) => (
                <option key={material.id} value={material.descripcion}>
                  {`[${material.cod}] ${material.descripcion}`}
                </option>
              ))}
            </Select>
            <Select
              label={"Medida"}
              no_label
              placeholder={"Medida"}
              {...register("medida")}
            >
              {listaMedida.map((tipo) => (
                <option key={tipo.id} value={tipo.descripcion}>
                  {tipo.descripcion}
                </option>
              ))}
            </Select>
            <Select
              label={"Espesor"}
              no_label
              placeholder={"Espesor"}
              {...register("espesor")}
            >
              {listaEspesor.map((tipo) => (
                <option key={tipo.id} value={tipo.descripcion}>
                  {tipo.descripcion}
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

  return (
    <>
      <Container text={"Materiales"} to={"/"}>
        <BoxComponentScrolling
          title="Creando Oportunidad"
          height="calc(100vh - 10rem)"
          size="max-w-full"
        >
          <SubHeaderComponent />
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
        </BoxComponentScrolling>
        <Footer>
          <div className="flex gap-2 justify-end">
            <Button
              text={"Nuevo Material"}
              icon={<PlusIcon className="w-4" />}
              variant={"primary"}
              onClick={() => navigate(`/nuevo-material`)}
            />
          </div>
        </Footer>
      </Container>
    </>
  );
}
