export interface PagedResponse<T> {
	content: T[];
	totalPages: number;
	totalElements: number;
	size: number;
	number: number; // página actual (empieza en 0)
}
