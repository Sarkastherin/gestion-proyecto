import { Button } from "../components/Buttons";
import TableComponent from "../components/TableComponent";
import { Modal } from "../components/Modal";
import { ModalLoading } from "../components/Generals/ModalsTypes";
import { useModal } from "../context/ModalContext";
export default function LayoutConfiguraciones({
  columns,
  data,
  title,
  form,
  onSubmit,
  onError,
  handleSubmit,
  state,
  color = { color: "text-pink-500", variant: "pink" },
}) {
  const { handleModalClose } = useModal();

  return (
    <>
      <div className="flex h-full gap-10 pt-8">
        <form
          className="max-w-100 w-full border border-neutral-300 shadow p-5 rounded-lg bg-white "
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h2
                className={`font-medium ${color.color} text-lg text-center mb-2 bg-neutral-200/50 py-2 rounded`}
              >
                {title}
              </h2>
              {form}
            </div>
            <Button
              type="submit"
              variant={color.variant}
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              Guardar
            </Button>
          </div>
        </form>
        <div className="w-full">
          <TableComponent columns={columns} data={data} />
        </div>
      </div>
      <ModalLoading id={"modal-loading"} title={"Guardando..."} />
      {state.response && (
        <Modal
          modalId={"modal-response"}
          title={
            state.response.type === "success"
              ? "¡Todo marcha bien!"
              : "Algo anda mal"
          }
          variant={state.response.type}
        >
          <div className="flex flex-col gap-4">
            <p>Resultado:</p>
            {state.response.type === "success" ? (
              <p>{state.response.message}</p>
            ) : (
              <code className="text-center text-red-600 bg-neutral-200/60 px-2">
                {state.response.message}
              </code>
            )}

            <div className="flex gap-2 mt-2 justify-center">
              <Button
                className="min-w-40"
                variant={"secondary"}
                onClick={handleModalClose}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
