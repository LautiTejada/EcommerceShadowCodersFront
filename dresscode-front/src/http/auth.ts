import { apiFetch } from "./apiFetch";

const baseUrl = import.meta.env.VITE_API_URL;

export interface AuthResponse {
	token: string;
	username: string;
	id: number;
	email: string;
	rol: string;
	direcciones?: any[];
}

export const forgotPassword = async (email: string): Promise<void> => {
	await apiFetch(`${baseUrl}/auth/forgot-password`, {
		method: "POST",
		body: JSON.stringify({ email }),
	});
};

export const resetPassword = async (token: string, nuevaPassword: string): Promise<void> => {
	await apiFetch(`${baseUrl}/auth/reset-password`, {
		method: "POST",
		body: JSON.stringify({ token, nuevaPassword }),
	});
};

export const loginConGoogle = async (credential: string): Promise<AuthResponse> => {
	return apiFetch(`${baseUrl}/auth/google`, {
		method: "POST",
		body: JSON.stringify({ credential }),
	});
};
