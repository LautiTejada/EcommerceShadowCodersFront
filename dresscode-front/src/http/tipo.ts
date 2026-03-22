
import type { Tipo } from "../types/Tipo";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

  return apiFetch(`${baseUrl}/tipos`);
};

  return apiFetch(`${baseUrl}/tipos/active`);
};

  try {
    return await apiFetch(`${baseUrl}/tipos/${id}`);
  } catch (error: any) {
    if (error.message && error.message.includes('404')) return null;
    throw error;
  }
}

  return apiFetch(`${baseUrl}/tipos`, {
    method: "POST",
    body: JSON.stringify(tipo),
  });
};

  return apiFetch(`${baseUrl}/tipos/${id}`, {
    method: "PUT",
    body: JSON.stringify(tipo),
  });
};

  return apiFetch(`${baseUrl}/tipos/${id}/status`, {
    method: "PUT",
  });
};

  return apiFetch(`${baseUrl}/tipos/${id}/activate`, {
    method: "PUT",
  });
}

  return apiFetch(`${baseUrl}/tipos/${id}/deactivate`, {
    method: "PUT",
  });
}

  try {
    return await apiFetch(`${baseUrl}/tipos/${tipoId}/categorias`);
  } catch (error: any) {
    if (error.message && error.message.includes('404')) return [];
    throw error;
  }
}

