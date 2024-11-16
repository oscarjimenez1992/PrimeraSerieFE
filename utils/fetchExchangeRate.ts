// utils/fetchExchangeRate.ts
export async function fetchExchangeRate() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_SOAP_SERVICE_URL as string, {
      method: "POST", // Cambiado a POST
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Error en la respuesta del servidor:", response.status, response.statusText);
      throw new Error("Error al obtener el tipo de cambio");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchExchangeRate:", error);
    throw error;
  }
}
