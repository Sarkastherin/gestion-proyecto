import { useOutletContext } from "react-router-dom";
import { Button } from "../../components/Buttons";
import { useEffect, useState } from "react";
import FormularioOportunidad from "../../templates/Oportunidad/FormularioOportunidad";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import ButtonEdit from "../../components/Generals/ButtonEdit";
export default function Informacion() {
  const updates = {}
  const [isEditable, setIsEditable] = useState(false);
  const { oportunidadData } = useOutletContext();
  const onSubmit = ({allValues, dirtyFields}) => {
    const actionsEtapas = getEtapas(
      allValues.etapas,
      oportunidadData.etapas
    );
    updates['etapas'] = actionsEtapas.update
    delete dirtyFields.etapas;

    for (let item in dirtyFields) {
      if (dirtyFields[item]) {
        updates[item] = allValues[item]
      };
    }
    setIsEditable(false);
  };
  const onError = (data) => console.log("Error:", data);
  const getEtapas = (actualsValues, defaultValues) => {
    const arr = { append: [], remove: [], update: [] };
    const hasAppend = !actualsValues.every((item) => item.id_etapa);
    if (hasAppend) {
      arr.append = actualsValues.filter((item) => item.id_etapa === "");
    }
    defaultValues.map((origin) => {
      const hasRemoved = !actualsValues.some(
        (actual) => actual.id_etapa === origin.id_etapa
      );
      if (hasRemoved) {
        arr.remove.push(origin);
      }
      actualsValues.filter((actual) => {
        if (
          actual.id_etapa === origin.id_etapa &&
          actual.etapa != origin.etapa
        ) {
          arr.update.push(actual);
        }
      });
    });
    return arr;
  };
  return (
    <>
      <FormularioOportunidad
        isEditable={isEditable}
        defaultValues={oportunidadData}
        onSubmit={onSubmit}
        onError={onError}
      />
      <div className="absolute bottom-[-70px] left-8">
        <ButtonEdit
          func={() => setIsEditable(true)}
        />
      </div>
    </>
  );
}
