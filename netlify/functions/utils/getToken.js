import dotenv from "dotenv";
dotenv.config();

export async function getToken() {
  const usuario = process.env.API_USER;
  const password = process.env.API_PASSWORD;

  try {
    const response = await fetch("https://imapx.com.ar/im-api/login", {
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

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "No se pudo obtener el token");
    }
    return data.access_token;
  } catch (error) {
    console.error("Error al obtener token:", error);
    throw error;
  }
}