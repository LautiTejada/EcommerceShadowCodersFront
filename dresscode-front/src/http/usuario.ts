const baseUrl = import.meta.env.VITE_API_URL;

export const getUsuarios = async () => {
  try {
    const response = await fetch(`${baseUrl}/usuarios`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    throw error;
  }
};

export const crearUsuario = async (usuario: {
  nombre: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${baseUrl}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating usuario:", error);
    throw error;
  }
};

export const eliminarUsuario = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/usuarios/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting usuario:", error);
    throw error;
  }
};

export const actualizarUsuario = async (
  id: string,
  usuario: { nombre: string; email: string; password: string }
) => {
  try {
    const response = await fetch(`${baseUrl}/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating usuario:", error);
    throw error;
  }
};
