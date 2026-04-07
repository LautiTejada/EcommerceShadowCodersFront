import styles from "../../AgregarProducto/AgregarProducto.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useCategoriaStore } from "../../../../store/categoriaStore";
import { tipoStore } from "../../../../store/tipoStore";
import type { Tipo } from "../../../../types/Tipo";
import type { Categoria } from "../../../../types/Categoria";
import Swal from "sweetalert2";
import { ModalEditarTipo } from "../../../../components/admin/ModalEditarTipo/ModalEditarTipo";
import { ModalEditarCategoria } from "../../../../components/admin/ModalEditarCategoria/ModalEditarCategoria";

export const ListaTiposCategorias = () => {
	const { categoriasActivas, fetchCategoriasActivas, desactivateCategoria } =
		useCategoriaStore();

	const { tipos, obtenerTiposActivos, desactivarTipo } = tipoStore();

	const [tipoSeleccionado, setTipoSeleccionado] = useState<Tipo | null>(null);
	const [categoriaSeleccionada, setCategoriaSeleccionada] =
		useState<Categoria | null>(null);

	useEffect(() => {
		obtenerTiposActivos();
		fetchCategoriasActivas();
	}, [obtenerTiposActivos, fetchCategoriasActivas]);

	const handleEditTipo = (tipo: Tipo) => {
		setTipoSeleccionado(tipo);
	};

	const handleEditCategoria = (cat: Categoria) => {
		setCategoriaSeleccionada(cat);
	};

	const handleCloseModal = () => {
		setTipoSeleccionado(null);
		setCategoriaSeleccionada(null);
	};

	const handleToggleStateTipo = (tipo: Tipo) => {
		Swal.fire({
			title: "¿Desactivar este tipo?",
			text: `"${tipo.nombre}" y todas sus categorías y productos serán desactivados.`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#810000",
			cancelButtonColor: "#666",
			confirmButtonText: "Sí, desactivar",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				desactivarTipo(tipo.id!);
				obtenerTiposActivos();
			}
		});
	};

	const handleToggleStateCategoria = (categ: Categoria) => {
		Swal.fire({
			title: "¿Desactivar esta categoría?",
			text: `"${categ.nombreCategoria}" y sus productos serán desactivados.`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#810000",
			cancelButtonColor: "#666",
			confirmButtonText: "Sí, desactivar",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				desactivateCategoria(categ.id!);
				fetchCategoriasActivas();
			}
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Tipos y Categorías</h1>
				<p>Editá o desactivá los tipos y categorías existentes</p>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
				<div className={styles.form}>
					<h2
						style={{
							fontSize: "1rem",
							fontWeight: 700,
							color: "#1a1a1a",
							marginBottom: 16,
						}}>
						Tipos
					</h2>
					{tipos.length === 0 ? (
						<p style={{ color: "#888", fontSize: "0.875rem" }}>
							Sin tipos registrados.
						</p>
					) : (
						<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
							{tipos.map((tipo) => (
								<li
									key={tipo.id}
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										padding: "10px 0",
										borderBottom: "1px solid #f0eef6",
										fontSize: "0.875rem",
										color: "#1a1a1a",
									}}>
									<span>{tipo.nombre}</span>
									<div style={{ display: "flex", gap: 6 }}>
										<button
											className={styles.btnSecondary}
											style={{ padding: "4px 8px", minWidth: 0 }}
											onClick={() => handleEditTipo(tipo)}
											title="Editar">
											<EditIcon style={{ fontSize: 16 }} />
										</button>
										<button
											className={styles.btnSecondary}
											style={{
												padding: "4px 8px",
												minWidth: 0,
												borderColor: "#810000",
												color: "#810000",
											}}
											onClick={() => handleToggleStateTipo(tipo)}
											title="Desactivar">
											<DeleteIcon style={{ fontSize: 16 }} />
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>

				<div className={styles.form}>
					<h2
						style={{
							fontSize: "1rem",
							fontWeight: 700,
							color: "#1a1a1a",
							marginBottom: 16,
						}}>
						Categorías
					</h2>
					{categoriasActivas.length === 0 ? (
						<p style={{ color: "#888", fontSize: "0.875rem" }}>
							Sin categorías registradas.
						</p>
					) : (
						<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
							{categoriasActivas.map((cat) => (
								<li
									key={cat.id}
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										padding: "10px 0",
										borderBottom: "1px solid #f0eef6",
										fontSize: "0.875rem",
										color: "#1a1a1a",
									}}>
									<span>{cat.nombreCategoria}</span>
									<div style={{ display: "flex", gap: 6 }}>
										<button
											className={styles.btnSecondary}
											style={{ padding: "4px 8px", minWidth: 0 }}
											onClick={() => handleEditCategoria(cat)}
											title="Editar">
											<EditIcon style={{ fontSize: 16 }} />
										</button>
										<button
											className={styles.btnSecondary}
											style={{
												padding: "4px 8px",
												minWidth: 0,
												borderColor: "#810000",
												color: "#810000",
											}}
											onClick={() => handleToggleStateCategoria(cat)}
											title="Desactivar">
											<DeleteIcon style={{ fontSize: 16 }} />
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			{tipoSeleccionado && (
				<ModalEditarTipo tipo={tipoSeleccionado} onClose={handleCloseModal} />
			)}
			{categoriaSeleccionada && (
				<ModalEditarCategoria
					categoria={categoriaSeleccionada}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};
