import { useEffect, useState } from "react";
import { useBannerStore } from "../../../store/bannerStore";
import type { Banner, CreateBannerRequest } from "../../../types/Banner";
import type { MarcaItem } from "../../../types/MarcaItem";
import { getMarcasActivas } from "../../../http/marca";
import { BannerFormModal } from "./BannerFormModal";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import styles from "./BannerAdminPanel.module.css";

export const BannerAdminPanel = () => {
	const {
		banners,
		cargando,
		error,
		fetchBanners,
		createBanner,
		updateBanner,
		deleteBanner,
		toggleBannerActivo,
		uploadingImage,
		uploadImagen,
	} = useBannerStore();

	const [showModal, setShowModal] = useState(false);
	const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
	const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
	const [marcas, setMarcas] = useState<MarcaItem[]>([]);
	const [cargandoMarcas, setCargandoMarcas] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	// Cargar banners y marcas al montar
	useEffect(() => {
		fetchBanners();
		cargarMarcas();
	}, []);

	const cargarMarcas = async () => {
		try {
			setCargandoMarcas(true);
			const marcasData = await getMarcasActivas();
			setMarcas(marcasData);
		} catch {
			// silencio
		} finally {
			setCargandoMarcas(false);
		}
	};

	const showSuccessMessage = (message: string) => {
		setSuccessMessage(message);
		setTimeout(() => setSuccessMessage(""), 3000);
	};

	const handleOpenModal = () => {
		setEditingBanner(null);
		setShowModal(true);
	};

	const handleOpenEditModal = (banner: Banner) => {
		setEditingBanner(banner);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setEditingBanner(null);
	};

	const handleSave = async (data: CreateBannerRequest, file: File | null) => {
		let imagenNombre = data.imagenNombre;

		if (file) {
			imagenNombre = await uploadImagen(file);
		}

		const bannerData: CreateBannerRequest = {
			...data,
			imagenNombre,
		};

		if (editingBanner) {
			await updateBanner(editingBanner.id, bannerData);
			showSuccessMessage("Banner actualizado correctamente");
		} else {
			await createBanner(bannerData);
			showSuccessMessage("Banner creado correctamente");
		}

		handleCloseModal();
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteBanner(id);
			showSuccessMessage("Banner eliminado correctamente");
			setDeleteConfirm(null);
		} catch (err: any) {
			// Error ya está siendo logueado en bannerStore
		}
	};

	const handleToggle = async (id: number) => {
		try {
			await toggleBannerActivo(id);
		} catch (err: any) {
			// Error ya está siendo manejado en bannerStore
		}
	};

	const bannersOrdenados = [...banners].sort((a, b) => a.orden - b.orden);

	return (
		<div className={styles.panelContainer}>
			<div className={styles.header}>
				<h2>Gestionar Banners</h2>
				<button
					className={styles.btnCreate}
					onClick={handleOpenModal}
					disabled={cargando || uploadingImage}>
					+ Crear Banner
				</button>
			</div>

			{error && <div className={styles.errorMessage}>{error}</div>}
			{successMessage && (
				<div className={styles.successMessage}>{successMessage}</div>
			)}

			{cargando && banners.length === 0 ? (
				<div className={styles.loading}>Cargando banners...</div>
			) : banners.length === 0 ? (
				<div className={styles.empty}>
					<p>No hay banners creados</p>
					<button className={styles.btnCreate} onClick={handleOpenModal}>
						Crear el primer banner
					</button>
				</div>
			) : (
				<div className={styles.tableContainer}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>ID</th>
								<th>Título</th>
								<th>Marca</th>
								<th>Orden</th>
								<th>Activo</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{bannersOrdenados.map((banner) => (
								<tr key={banner.id}>
									<td>{banner.id}</td>
									<td className={styles.titleCell}>{banner.titulo}</td>
									<td className={styles.marcaCell}>
										{banner.marca.nombreMarca}
									</td>
									<td className={styles.ordenCell}>{banner.orden}</td>
									<td className={styles.activoCell}>
										<span
											className={
												banner.activo
													? styles.activeBadge
													: styles.inactiveBadge
											}>
											{banner.activo ? "Activo" : "Inactivo"}
										</span>
									</td>
									<td className={styles.actionsCell}>
										<button
											className={styles.btnAction}
											onClick={() => handleOpenEditModal(banner)}
											title="Editar">
											✏️
										</button>
										<button
											className={`${styles.btnAction} ${
												banner.activo
													? styles.toggleActive
													: styles.toggleInactive
											}`}
											onClick={() => handleToggle(banner.id)}
											title={`${banner.activo ? "Desactivar" : "Activar"}`}>
											{banner.activo ? "👁️" : "🚫"}
										</button>
										<button
											className={`${styles.btnAction} ${styles.btnDelete}`}
											onClick={() => setDeleteConfirm(banner.id)}
											title="Eliminar">
											🗑️
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			<BannerFormModal
				isOpen={showModal}
				isEditing={editingBanner !== null}
				marcas={marcas}
				cargandoMarcas={cargandoMarcas}
				cargando={cargando}
				uploadingImage={uploadingImage}
				onClose={handleCloseModal}
				onSave={handleSave}
				initialData={editingBanner || undefined}
			/>

			<DeleteConfirmDialog
				bannerId={deleteConfirm}
				isLoading={cargando}
				onConfirm={handleDelete}
				onCancel={() => setDeleteConfirm(null)}
			/>
		</div>
	);
};
