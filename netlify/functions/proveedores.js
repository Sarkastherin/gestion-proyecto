import { getToken } from "./utils/getToken.js";

export async function handler(event, context) {
  try {
    const access_token = await getToken();

    const proveedoresResponse = await fetch("https://imapx.com.ar/im-api/contactos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        include_archived: false,
        include_cliente: false,
        include_proveedor: true,
        page: 1,
        page_size: 100,
        
      }),
    });

    const proveedoresData = await proveedoresResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(proveedoresData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error en la función",
        error: error.message,
      }),
    };
  }
}
