import styles from "../../AgregarProducto/AgregarProducto.module.css";
import EditIcon from "@mui/icons-material/Edit";
import AppsIcon from "@mui/icons-material/Apps";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useDescuentoStore } from "../../../../store/descuentoStore";
import Swal from "sweetalert2";
import type { Descuento } from "../../../../types/Descuento";
import React, { Suspense } from "react";
const ModalEditarDescuento = React.lazy(() =>
	import("../../../../components/admin/ModalEditarDescuento/ModalEditarDescuento").then(
		(m) => ({ default: m.ModalEditarDescuento }),
	),
);
const ModalProductosDescuento = React.lazy(() =>
	import("../../../../components/admin/ModalProductosDescuento/ModalProductosDescuento").then(
		(m) => ({ default: m.ModalProductosDescuento }),
	),
);
const ModalAgregarProductDescuento = React.lazy(() =>
	import("../../../../components/admin/ModalAgregarProductDescuento/ModalAgregarProductDescuento").then(
		(m) => ({ default: m.ModalAgregarProductDescuento }),
	),
);

export const ListaDescuentos = () => {
	const { descuentos, fetchDescuentos, toggleDescuentoStatus } =
		useDescuentoStore();
	const [descuentoSeleccionado, setDescuentoSeleccionado] =
		useState<Descuento | null>(null);
	const [descuentoProductos, setDescuentoProductos] =
		useState<Descuento | null>(null);
	const [descuentoParaAgregarProductos, setDescuentoParaAgregarProductos] =
		useState<Descuento | null>(null);

	useEffect(() => {
		fetchDescuentos();
	}, [fetchDescuentos]);

	const handleToggleActivo = (desc: Descuento) => {
		Swal.fire({
			title: `¿${desc.activo ? "Desactivar" : "Activar"} este descuento?`,
			text: `${desc.porcentajeDescuento}% — ${desc.fechaInicio} al ${desc.fechaCierre}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#810000",
			cancelButtonColor: "#666",
			confirmButtonText: `Sí, ${desc.activo ? "desactivar" : "activar"}`,
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				toggleDescuentoStatus(desc.id!);
			}
		});
	};

	const handleEditClick = (desc: Descuento) => setDescuentoSeleccionado(desc);
	const handleProductsClick = (desc: Descuento) => setDescuentoProductos(desc);
	const handleAgregarProductoClick = (desc: Descuento) =>
		setDescuentoParaAgregarProductos(desc);
	const handleCloseModal = () => {
		setDescuentoSeleccionado(null);
		setDescuentoProductos(null);
		setDescuentoParaAgregarProductos(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Lista de Descuentos</h1>
				<p>Administrá los descuentos activos e inactivos</p>
			</div>

			<div className={styles.form}>
				{descuentos.length === 0 ? (
					<p style={{ color: "#888", fontSize: "0.875rem" }}>
						No hay descuentos registrados.
					</p>
				) : (
					<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
						<thead>
							<tr style={{ borderBottom: "2px solid #810000" }}>
								<th style={{ padding: "10px 12px", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#555", textTransform: "uppercase" }}>Desde</th>
								<th style={{ padding: "10px 12px", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#555", textTransform: "uppercase" }}>Hasta</th>
								<th style={{ padding: "10px 12px", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#555", textTransform: "uppercase" }}>%</th>
								<th style={{ padding: "10px 12px", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#555", textTransform: "uppercase" }}>Estado</th>
								<th style={{ padding: "10px 12px", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#555", textTransform: "uppercase" }}>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{descuentos.map((desc) => (
								<tr key={desc.id} style={{ borderBottom: "1px solid #f0eef6" }}>
									<td style={{ padding: "12px", color: "#1a1a1a" }}>{desc.fechaInicio}</td>
									<td style={{ padding: "12px", color: "#1a1a1a" }}>{desc.fechaCierre}</td>
									<td style={{ padding: "12px", color: "#1a1a1a" }}>{desc.porcentajeDescuento}%</td>
									<td style={{ padding: "12px" }}>
										<span
											style={{
												padding: "3px 8px",
												borderRadius: 4,
												fontSize: "0.75rem",
												fontWeight: 600,
												background: desc.activo ? "rgba(30,126,52,0.1)" : "rgba(129,0,0,0.1)",
												color: desc.activo ? "#1e7e34" : "#810000",
											}}>
											{desc.activo ? "Activo" : "Inactivo"}
										</span>
									</td>
									<td style={{ padding: "12px", display: "flex", gap: 6, alignItems: "center" }}>
										<button
											className={styles.btnSecondary}
											style={{ padding: "4px 8px", minWidth: 0 }}
											onClick={() => handleEditClick(desc)}
											title="Editar">
											<EditIcon style={{ fontSize: 16 }} />
										</button>
										<button
											className={styles.btnSecondary}
											style={{ padding: "4px 8px", minWidth: 0 }}
											onClick={() => handleProductsClick(desc)}
											title="Ver productos">
											<AppsIcon style={{ fontSize: 16 }} />
										</button>
										<button
											className={styles.btnSecondary}
											style={{ padding: "4px 8px", minWidth: 0 }}
											onClick={() => handleAgregarProductoClick(desc)}
											title="Agregar producto">
											<AddIcon style={{ fontSize: 16 }} />
										</button>
										<button
											className={desc.activo ? styles.btnSecondary : styles.btnPrimary}
											style={{ padding: "4px 10px", fontSize: "0.75rem" }}
											onClick={() => handleToggleActivo(desc)}>
											{desc.activo ? "Desactivar" : "Activar"}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			<Suspense fallback={null}>
				{descuentoSeleccionado && (
					<ModalEditarDescuento
						descuento={descuentoSeleccionado}
						onClose={handleCloseModal}
					/>
				)}
				{descuentoProductos && (
					<ModalProductosDescuento
						descuentoId={descuentoProductos.id!}
						onClose={handleCloseModal}
					/>
				)}
				{descuentoParaAgregarProductos && (
					<ModalAgregarProductDescuento
						descuentoId={descuentoParaAgregarProductos.id!}
						onClose={handleCloseModal}
					/>
				)}
			</Suspense>
		</div>
	);
};
