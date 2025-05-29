import Container from "../../components/Generals/Container";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import TableComponent from "../../components/TableComponent";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input, Select } from "../../components/Generals/Inputs";
import { Button } from "../../components/Buttons";
import { FunnelIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { NoDataComponent } from "../../components/DataField";
import { Footer } from "../../components/Footer";
import Badge from "../../components/Generals/Badge";
import { Modal } from "../../components/Modal";
import { useModal } from "../../context/ModalContext";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
export function Oportunidades() {
  const { getOportunidades, oportunidades, deleteOportunidad } =
    useOportunidad();
  const { handleModalClose, handleModalShow } = useModal();
  const { deleteDetalleByIdCot, deleteCotizacion, getDetalleCotizacion } = useCotizacion();
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => {
        const dateString = row.created_at;
        const date = new Date(dateString);
        const options = { year: "numeric", day: "numeric", month: "long" };
        return date.toLocaleString("es-AR", options);
      },
      width: "175px",
      sortable: true,
    },
    {
      name: "Nombre de la oportunidad",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.cliente?.nombre,
      width: "300px",
      sortable: true,
    },
    {
      name: "$ Contización",
      selector: (row) =>
        row.total_monto?.toLocaleString("es-AR", {
          style: "currency",
          currency: "USD",
        }) || "$ 0.00",
      width: "150px",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => <Badge variant={row.status}>{row.status}</Badge>,
      width: "150px",
    },
    {
      name: "Creado por",
      selector: (row) => row.usuario,
      width: "150px",
      sortable: true,
    },
    {
      name: <TrashIcon className="w-4" />,
      cell: (row) => (
        <Button
          variant={"danger_outline"}
          text="Eliminar Etapa"
          onClick={() => {
            handleConfirmed(row);
          }}
        >
          {<TrashIcon className="w-4" />}
        </Button>
      ),
      width: "70px",
      sortable: true,
    },
  ];
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });
  const [dataFiltered, setDataFiltered] = useState([]);
  const [deleteData, setDeleteData] = useState({
    oportunidad: null,
    cotizacion: null,
  });

  const handleFilter = (data) => {
    const filter = oportunidades.filter(
      (item) =>
        item.nombre.toLowerCase().includes(data.oportunidad.toLowerCase()) &&
        item.cliente?.nombre
          .toLowerCase()
          .includes(data.cliente.toLowerCase()) &&
        item.status.toLowerCase().includes(data.status.toLowerCase())
    );
    setDataFiltered(
      filter.length > 0 ? filter : [{ nombre: "No hay datos para mostrar" }]
    );
  };
  const openOportunidad = (data) => {
    navigate(`/oportunidad/${data.id}/resumen`);
  };
  const SubHeaderComponent = () => {
    return (
      <div className="flex justify-between items-center mt-8">
        <form onSubmit={handleSubmit(handleFilter)} className="w-full">
          <fieldset className="flex items-center justify-between gap-2 w-full">
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
                <option className="bg-blue-300/50" value={"Nuevo"}>
                  🆕 Nuevo{" "}
                </option>
                <option className="bg-gray-400/50" value={"Desestimada"}>
                  🗑️ Desestimada
                </option>
                <option className="bg-amber-300/50" value={"En proceso"}>
                  ⏳ En proceso
                </option>
                <option className="bg-indigo-300/50" value={"Enviada"}>
                  📧 Enviada
                </option>
                <option className="bg-orange-300/50" value={"Revisión"}>
                  ⚠️ Revisión
                </option>
                <option className="bg-green-300/50" value={"Ganada"}>
                  ✅ Ganada
                </option>
                <option className="bg-red-300/50" value={"Perdida"}>
                  ❌ Perdida
                </option>
              </Select>
            </div>
            <div>
              <Button
                className="flex-none"
                type="submit"
                title="Filtrar"
                variant={"yellow"}
                hidden_text
              >
                <FunnelIcon className="w-4" />
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  };
  useEffect(() => {
    getOportunidades();
  }, []);
  useEffect(() => {
    setDataFiltered(
      oportunidades.sort((a, b) => {
        return b.id - a.id;
      })
    );
  }, [oportunidades]);
  const handleConfirmed = ({ id, id_cotizacion }) => {
    setDeleteData({ oportunidad: id, cotizacion: id_cotizacion });
    handleModalShow("modal-confirm-delete");
  };
  const handleDeleteOportunidad = async () => {
    try {
      const res1 = await deleteDetalleByIdCot(deleteData.cotizacion);
      const res2 = await deleteCotizacion(deleteData.cotizacion);
      const res3 = await deleteOportunidad(deleteData.oportunidad);
    } catch (e) {
    } finally {
      getOportunidades();
    }
  };
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
              className="min-w-50"
              text={""}
              variant={"primary"}
              onClick={() => navigate(`/nueva-oportunidad`)}
            >
              Nueva Oportunidad
              <PlusIcon className="w-4" />
            </Button>
          </div>
        </Footer>
      </Container>
      <Modal
        modalId={"modal-confirm-delete"}
        title={"Atención"}
        variant={"warning"}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-700">
            Está por eliminar esta oportunidad.
          </p>
          <p className="font-medium text-gray-700">
            ¿Está seguro de continuar?
          </p>
          <div className="flex gap-2 mt-2 justify-center">
            <Button
              className="min-w-40"
              variant={"secondary"}
              onClick={handleModalClose}
            >
              Dejame pensarlo
            </Button>
            <Button
              className="min-w-40"
              variant={"yellow"}
              onClick={handleDeleteOportunidad}
            >
              Si, lo estoy
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
