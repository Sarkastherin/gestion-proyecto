import FormularioMargenesGanancias from "../../templates/Oportunidad/FormularioMargenesGanancias";
import ButtonEdit from "../../components/Generals/ButtonEdit";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
export default function MargenesGanancias() {
  const [isEditable, setIsEditable] = useState(false);
  const { oportunidadData } = useOutletContext();
  const onSubmit = ({ allValues, dirtyFields }) => {
    console.log(allValues);
  };
  const onError = (data) => console.log("Error:", data);
  return (
    <>
      <FormularioMargenesGanancias
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
