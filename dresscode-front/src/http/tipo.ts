const baseUrl = import.meta.env.VITE_API_URL;

export const getTipos = async () => {
  try {
    const response = await fetch(`${baseUrl}/tipos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tipos:", error);
    throw error;
  }
};

export const crearTipo = async (tipo: { nombre: string }) => {
  try {
    const response = await fetch(`${baseUrl}/tipos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipo),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating tipo:", error);
    throw error;
  }
};

export const eliminarTipo = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/tipos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting tipo:", error);
    throw error;
  }
};

export const actualizarTipo = async (id: string, tipo: { nombre: string }) => {
  try {
    const response = await fetch(`${baseUrl}/tipos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipo),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating tipo:", error);
    throw error;
  }
};
