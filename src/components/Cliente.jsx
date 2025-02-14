import { Label, Input, TextInvalidate } from "./Inputs";
import { Modal } from "./Modal";
import { UserGroupIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useFormContext } from "react-hook-form";
export const Cliente = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectClient, setSelectClient] = useState({});
  const { handleModalShow, handleModalClose } = useModal();
  const {
      register,
      formState: { errors },
      setValue,
    } = useFormContext();
  const getClientes = async () => {
    try {
      const response = await fetch(
        "https://fakerapi.it/api/v2/companies?_quantity=20"
      );
      const { status, code, data } = await response.json();
      setClientes(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getClientes();
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
      setValue("cliente", selectClient.name, { shouldDirty: true });
    }
  }, [selectClient, setValue]);
  return (
    <>
      <Label label={"Cliente"} htmlFor={"cliente"} />
      <Input
        onClick={() => handleModalShow("modalCliente")}
        {...register("cliente", {
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
            type="search"
            placeholder="Buscar Cliente"
            onInput={(e) => setSearch(e.target.value)}
            {...register("getCliente", {})}
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
