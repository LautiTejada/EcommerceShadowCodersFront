export interface ApiFetchOptions extends RequestInit {
	auth?: boolean;
}

export async function apiFetch<T = any>(
	url: string,
	options: ApiFetchOptions = {},
): Promise<T> {
	const { auth, headers, ...rest } = options;
	const hasBody = rest.body !== undefined && rest.body !== null;
	const finalHeaders: Record<string, string> = {
		...((headers as Record<string, string>) || {}),
		...(hasBody ? { "Content-Type": "application/json" } : {}),
	};

	if (auth) {
		const token = localStorage.getItem("token");
		if (token) {
			finalHeaders["Authorization"] = `Bearer ${token}`;
		}
	}

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 8000);

	try {
		const response = await fetch(url, {
			...rest,
			headers: finalHeaders,
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			let errorMsg = `HTTP error! status: ${response.status}`;
			try {
				// Leer el body una sola vez
				const text = await response.text();

				// Intentar parsear como JSON
				try {
					const data = JSON.parse(text);
					// If message is an object (validation errors), format it nicely
					if (typeof data.message === "object" && data.message !== null) {
						const validationErrors = Object.entries(data.message)
							.map(([field, error]) => `${field}: ${error}`)
							.join(", ");
						errorMsg = validationErrors || errorMsg;
					} else {
						errorMsg =
							data.message || data.error || JSON.stringify(data) || errorMsg;
					}
				} catch {
					// Si no es JSON válido, usar el texto directo
					errorMsg = text || errorMsg;
				}
			} catch (readError) {
				errorMsg = `HTTP error! status: ${response.status}`;
			}
			throw new Error(errorMsg);
		}

		if (response.status === 204) return null as T;

		// Handle empty responses (e.g., DELETE without body)
		const text = await response.text();
		if (!text) return null as T;

		try {
			return JSON.parse(text);
		} catch {
			return null as T;
		}
	} catch (error) {
		clearTimeout(timeoutId);
		throw error;
	}
}
