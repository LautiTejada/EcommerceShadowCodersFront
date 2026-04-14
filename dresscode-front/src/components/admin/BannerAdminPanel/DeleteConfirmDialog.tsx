import styles from "./BannerAdminPanel.module.css";

interface DeleteConfirmDialogProps {
	bannerId: number | null;
	isLoading: boolean;
	onConfirm: (id: number) => Promise<void>;
	onCancel: () => void;
}

export const DeleteConfirmDialog = ({
	bannerId,
	isLoading,
	onConfirm,
	onCancel,
}: DeleteConfirmDialogProps) => {
	if (bannerId === null) return null;

	return (
		<div className={styles.modal} onClick={onCancel}>
			<div
				className={styles.confirmDialog}
				onClick={(e) => e.stopPropagation()}>
				<h3>¿Eliminar banner?</h3>
				<p>Esta acción no se puede deshacer.</p>
				<div className={styles.confirmActions}>
					<button
						className={styles.btnCancel}
						onClick={onCancel}
						disabled={isLoading}>
						Cancelar
					</button>
					<button
						className={styles.btnDelete}
						onClick={() => onConfirm(bannerId)}
						disabled={isLoading}>
						{isLoading ? "Eliminando..." : "Eliminar"}
					</button>
				</div>
			</div>
		</div>
	);
};
