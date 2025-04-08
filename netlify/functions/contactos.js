// netlify/functions/contactos.js

export async function handler(event, context) {
  const usuario = process.env.VITE_API_USER;
  const password = process.env.VITE_API_PASSWORD;

  try {
    // Obtener token
    const tokenResponse = await fetch("https://imapx.com.ar/im-api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: usuario,
        password: password,
        scope: "",
        client_id: "string",
        client_secret: "string",
      }),
    });

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;
    // Obtener contactos
    const contactosResponse = await fetch(
      "https://imapx.com.ar/im-api/contactos",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          include_archived: false,
          include_cliente: true,
          include_proveedor: false,
          page: 1,
          page_size: 100,
        }),
      }
    );

    const contactosData = await contactosResponse.json();
    return {
      statusCode: 200,
      body: JSON.stringify(contactosData),
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
/* export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ mensaje: "Función funcionando desde Netlify" }),
  };
}
 */
