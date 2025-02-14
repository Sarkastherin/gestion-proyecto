import Header from "../../components/Header";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import FormularioOportunidad from "../../templates/Oportunidad/FormularioOportunidad";

export default function CrearOportunidad() {
  //const [isEditable, setIsEditable] = useState(false);
  const onSubmit = ({ allValues, dirtyFields }) => {
    console.log(allValues);
  };
  const onError = (data) => console.log("Error:", data);
  return (
    <>
      <Header
        text={"Creando Oportunidad"}
        
      >
        <BoxComponentScrolling title="Creando Oportunidad">
          <FormularioOportunidad
            isEditable={true}
            defaultValues={{}}
            onSubmit={onSubmit}
            onError={onError}
          />
        </BoxComponentScrolling>
      </Header>
    </>
  );
}
