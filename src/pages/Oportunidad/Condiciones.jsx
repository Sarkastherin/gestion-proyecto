import FormularioCondicion from "../../templates/Oportunidad/FormularioCondiciones";
import ButtonEdit from "../../components/Generals/ButtonEdit";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
export default function Condiciones() {
  const { oportunidadData } = useOutletContext();
  const [isEditable, setIsEditable] = useState(false);
  const onSubmit = ({ allValues, dirtyFields }) => {
    console.log(allValues);
  };
  const onError = (data) => console.log("Error:", data);
  return (
    <>
      <FormularioCondicion
        isEditable={isEditable}
        defaultValues={oportunidadData}
        onSubmit={onSubmit}
        onError={onError}
      />
      <div className="absolute bottom-[-70px] left-8">
        <ButtonEdit
          func={() => {
            setIsEditable(true);
          }}
        />
      </div>
    </>
  );
}
