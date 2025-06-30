import { useUI } from "~/context/UIContext"
import { useEffect } from "react";
export function useFieldsChange({isSubmitSuccessful, isDirty}:{isSubmitSuccessful: boolean; isDirty: boolean}) {
     const {handleSetIsFieldsChanged} = useUI();
     useEffect(() => {
         handleSetIsFieldsChanged(isSubmitSuccessful, isDirty);
       }, [isSubmitSuccessful, isDirty]);
     
}