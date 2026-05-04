import React, { useEffect } from "react";
import styles from "./AdminModal.module.css";
import { useScrollLock } from "../../../hooks/useScrollLock";

interface AdminModalProps {
	title: string;
	subtitle?: string;
	onClose: () => void;
	children: React.ReactNode;
	maxWidth?: number;
}

export const AdminModal: React.FC<AdminModalProps> = ({
	title,
	subtitle,
	onClose,
	children,
	maxWidth = 560,
}) => {
	useScrollLock();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div
				className={styles.modal}
				style={{ maxWidth }}
				onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					<div className={styles.headerText}>
						<h3 className={styles.title}>{title}</h3>
						{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
					</div>
					<button
						type="button"
						className={styles.closeBtn}
						onClick={onClose}
						aria-label="Cerrar">
						✕
					</button>
				</div>
				<div className={styles.body}>{children}</div>
			</div>
		</div>
	);
};
