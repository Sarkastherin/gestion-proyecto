const getActionsInArray = (actualsValues, defaultValues = []) => {
    const arr = { append: [], remove: [], update: [] };
    // Verificar si hay elementos nuevos para agregar
    if (actualsValues?.length) {
      const hasAppend = !actualsValues.every((item) => item.id);
      if (hasAppend) {
        arr.append = actualsValues.filter((item) => item.id === "");
      }
    }  
    // Si defaultValues está vacío, solo retornamos los agregados
    if (defaultValues.length === 0) return arr;  
    // Verificar elementos eliminados y modificados
    defaultValues.forEach((origin) => {
      const hasRemoved = !actualsValues.some((actual) => actual.id === origin.id);
      if (hasRemoved) arr.remove.push(origin);
  
      actualsValues.forEach((actual) => {
        if (actual.id === origin.id && JSON.stringify(actual) !== JSON.stringify(origin)) {
          arr.update.push(actual);
        }
      });
    });
    return arr;
  };
  export {getActionsInArray}