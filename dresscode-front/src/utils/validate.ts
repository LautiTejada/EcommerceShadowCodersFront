// src/utils/validate.ts
// Utilidades de validación reutilizables para formularios

export function isEmail(email: string): boolean {
	return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export function isRequired(value: any): boolean {
	return value !== undefined && value !== null && String(value).trim() !== "";
}

export function minLength(value: string, min: number): boolean {
	return value.length >= min;
}

export function validateForm(
	fields: Record<string, any>,
	rules: Record<string, ((v: any) => boolean)[]>,
): Record<string, string> {
	const errors: Record<string, string> = {};
	for (const key in rules) {
		for (const rule of rules[key]) {
			if (!rule(fields[key])) {
				errors[key] = `Campo inválido: ${key}`;
				break;
			}
		}
	}
	return errors;
}
