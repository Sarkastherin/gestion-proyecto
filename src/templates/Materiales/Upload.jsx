import Container from "../../components/Generals/Container";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import Papa from "papaparse";
export default function Upload() {
  const { materiales, postMaterial, refreshMateriales } = useMateriales();
  //const [data, setData] = useState([]);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        addCodigoAndDescripcion(results.data);
      },
    });
  };
  const addCodigoAndDescripcion =  (data) => {
     const newData = []
    data.forEach(async(elm) => {
      const hasSequenceCod = materiales.some(
        (item) =>
          item.material === elm.material &&
          item.tipo === elm.tipo &&
          item.espesor === elm.espesor
      );
      if (hasSequenceCod) {
        const sequences = materiales.filter(
          (item) =>
            item.material === elm.material &&
            item.tipo === elm.tipo &&
            item.espesor === elm.espesor
        );
        elm.sequence = Math.max(...sequences.map((item) => item.sequence)) + 1;
      } else {
        elm.sequence = 1;
      }
      const codigo = `${elm.cod_material}-${elm.cod_tipo}-${
        elm.espesor === null ? "" : elm.espesor
      }-${elm.sequence}`;
      const descripcion = `${elm.tipo}-${elm.material}-${
        elm.medida === null ? "" : elm.medida
      }-${elm.espesor === null ? "" : elm.espesor}-${
        elm.norma === null ? "" : elm.norma
      }-${elm.tipo_union === null ? "" : elm.tipo_union}-${
        elm.caracteristica === null ? "" : elm.caracteristica
      }`;
      const isDescription = materiales.some(
        (item) => item.descripcion === descripcion
      );
      if (!isDescription) {
        elm.codigo = codigo;
        elm.descripcion = descripcion;
        try {
          
          const { error } = await postMaterial(elm);
          refreshMateriales()
          if (error) {
            throw new Error(error.message);
          } 
        } catch (e) {
          console.error(e);
        }
      }
    });
  };
  return (
    <Container text={"Importar Materiales"} to={"/materiales"}>
      <BoxComponentScrolling
        title="Importar Materiales"
        height="calc(100vh - 10rem)"
      >
        <label
          htmlFor="File"
          className="flex flex-col items-center rounded border border-gray-300 p-4 text-gray-900 shadow-sm sm:p-6"
        >
          <ArrowUpOnSquareStackIcon className="w-7" />

          <span className="mt-4 font-medium"> Upload your file(s) </span>

          <span className="mt-2 inline-block rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-center text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100">
            Browse files
          </span>

          <input
            type="file"
            id="File"
            className="sr-only"
            onChange={handleFileUpload}
          />
        </label>
      </BoxComponentScrolling>
    </Container>
  );
}
