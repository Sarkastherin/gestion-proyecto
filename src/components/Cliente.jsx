import { Input, TextInvalidate } from "./Inputs";
import { Modal } from "./Modal";
import { UserGroupIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useFormContext } from "react-hook-form";
import { useClientes } from "../context/ClientContext";
export const Cliente = () => {
  const {clientes} = useClientes();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectClient, setSelectClient] = useState({});
  const { handleModalShow, handleModalClose } = useModal();
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  useEffect(() => {
    setFilteredData(clientes);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = clientes.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    }, 300); // Agrega un debounce de 300ms
    return () => clearTimeout(timeout);
  }, [search]);
  useEffect(() => {
    if (selectClient?.name) {
      setValue("cliente", selectClient, { shouldDirty: true });
      setValue("cliente.name", selectClient.name, { shouldDirty: true });
    }
  }, [selectClient, setValue]);
  return (
    <>
      <Input
        label={"Cliente"}
        onClick={() => handleModalShow("modalCliente")}
        {...register("cliente.name", {
          required: {
            value: true,
            message: "Debe seleccionar un cliente",
          },
        })}
        placeholder="Seleccione un cliente"
      />
      {errors.cliente && <TextInvalidate message={errors.cliente.message} />}
      <Modal
        modalId="modalCliente"
        title={"Buscar Cliente"}
        variant="primary"
        icon={<UserGroupIcon width={"24px"} />}
      >
        <div className="mt-4">
          <p className="mt-1 text-sm text-gray-700">Seleccione un cliente.</p>
          <Input
            label="Buscar Cliente"
            no_label
            type="search"
            placeholder="Buscar Cliente"
            onInput={(e) => setSearch(e.target.value)}
          />
          <ul className="mt-2 max-h-[300px] overflow-y-auto">
            {filteredData.map((client) => (
              <li
                className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                key={client.id}
                onClick={() => {
                  setSelectClient(client);
                  handleModalClose();
                }}
              >
                <p>{client.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};
