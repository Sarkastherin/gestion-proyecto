import { Label, Input, TextInvalidate } from "./Inputs";
import { Modal } from "./Modal";
import { UserGroupIcon, CurrencyDollarIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useFormContext, useForm } from "react-hook-form";
export const ModalCotizaciones = () => {
  const [search, setSearch] = useState("");
  const [selectCotizacion, setSelectCotizacion] = useState({});
  const { handleModalShow, handleModalClose } = useModal();
  const [filteredData, setFilteredData] = useState([]);
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  /* ;
  
  const [clientes, setClientes] = useState([]);
  
  
  
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
    if (selectCotizacion?.name) {
      setValue("cliente", selectCotizacion.name, { shouldDirty: true });
    }
  }, [selectCotizacion, setValue]); */
  return (
    <>
      <Modal
        modalId="modalCotizaciones"
        title={"Buscar Cotización"}
        variant="primary"
        icon={<CurrencyDollarIcon className="w-6" />}
      >
        <div className="mt-4">
          <p className="my-1 text-sm text-gray-700">Seleccione un cotización.</p>
          <Input
          label="Buscar Cotización"
          no_label
            type="search"
            placeholder="Buscar Cotización"
            onInput={(e) => setSearch(e.target.value)}
            {...register("getCotizaciones", {})}
          />
          <ul className="mt-2 max-h-[300px] overflow-y-auto">
            {filteredData.map((client) => (
              <li
                className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                key={client.id}
                onClick={() => {
                  setSelectCotizacion(client);
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
