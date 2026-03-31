export interface ApiFetchOptions extends RequestInit {
	auth?: boolean;
}

export async function apiFetch<T = any>(
	url: string,
	options: ApiFetchOptions = {},
): Promise<T> {
	const { auth, headers, ...rest } = options;
	const finalHeaders: Record<string, string> = {
		...((headers as Record<string, string>) || {}),
		"Content-Type": "application/json",
	};

	if (auth) {
		const token = localStorage.getItem("token");
		if (token) {
			finalHeaders["Authorization"] = `Bearer ${token}`;
		}
	}

	const response = await fetch(url, {
		...rest,
		headers: finalHeaders,
	});

	if (!response.ok) {
		let errorMsg = `HTTP error! status: ${response.status}`;
		try {
			const data = await response.json();
			errorMsg = data.message || errorMsg;
		} catch {}
		throw new Error(errorMsg);
	}

	if (response.status === 204) return null as T;

	return response.json();
}
