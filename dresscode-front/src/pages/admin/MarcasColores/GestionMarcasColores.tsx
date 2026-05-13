import React, { useEffect, useState } from "react";
import styles from "../../admin/AgregarProducto/AgregarProducto.module.css";
import { useMarcaStore } from "../../../store/marcaStore";
import { useColorStore } from "../../../store/colorStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

type Entidad = "marca" | "color";

interface Item {
	id: number;
	nombre: string;
	activo: boolean;
}

const GestionMarcasColores: React.FC = () => {
	const [tab, setTab] = useState<Entidad>("marca");
	const [nuevoNombre, setNuevoNombre] = useState("");
	const [editandoId, setEditandoId] = useState<number | null>(null);
	const [editNombre, setEditNombre] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		marcas, fetchMarcas, addMarca, updateMarca, deleteMarca, toggleMarcaStatus,
	} = useMarcaStore();

	const {
		colores, fetchColores, addColor, updateColor, deleteColor, toggleColorStatus,
	} = useColorStore();

	useEffect(() => {
		fetchMarcas();
		fetchColores();
	}, [fetchMarcas, fetchColores]);

	const items: Item[] = tab === "marca"
		? marcas.map((m) => ({ id: m.id!, nombre: m.nombreMarca, activo: m.activo ?? true }))
		: colores.map((c) => ({ id: c.id!, nombre: c.nombreColor, activo: c.activo ?? true }));

	const handleAgregar = async (e: React.FormEvent) => {
		e.preventDefault();
		const nombre = nuevoNombre.trim();
		if (!nombre) return;
		setLoading(true);
		setError(null);
		try {
			if (tab === "marca") await addMarca(nombre);
			else await addColor(nombre);
			setNuevoNombre("");
		} catch {
			setError("No se pudo agregar. Intentá de nuevo.");
		} finally {
			setLoading(false);
		}
	};

	const handleEditar = async (id: number) => {
		const nombre = editNombre.trim();
		if (!nombre) return;
		setLoading(true);
		try {
			if (tab === "marca") await updateMarca(id, nombre);
			else await updateColor(id, nombre);
			setEditandoId(null);
			setEditNombre("");
		} catch {
			setError("No se pudo actualizar.");
		} finally {
			setLoading(false);
		}
	};

	const handleEliminar = (item: Item) => {
		Swal.fire({
			title: `¿Eliminar ${tab}?`,
			text: `"${item.nombre}" será eliminado permanentemente.`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#810000",
			cancelButtonColor: "#666",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					if (tab === "marca") await deleteMarca(item.id);
					else await deleteColor(item.id);
				} catch {
					setError("No se pudo eliminar.");
				}
			}
		});
	};

	const handleToggle = async (id: number) => {
		try {
			if (tab === "marca") await toggleMarcaStatus(id);
			else await toggleColorStatus(id);
		} catch {
			setError("No se pudo cambiar el estado.");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Marcas y Colores</h1>
				<p>Gestioná las marcas y colores disponibles para los productos</p>
			</div>

			{/* Tabs */}
			<div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
				{(["marca", "color"] as Entidad[]).map((t) => (
					<button
						key={t}
						onClick={() => { setTab(t); setEditandoId(null); setError(null); }}
						style={{
							padding: "8px 24px",
							borderRadius: 20,
							border: "none",
							background: tab === t ? "#810000" : "#f0eef6",
							color: tab === t ? "#fff" : "#555",
							fontWeight: 700,
							fontSize: "0.9rem",
							cursor: "pointer",
							textTransform: "capitalize",
						}}>
						{t === "marca" ? "Marcas" : "Colores"}
					</button>
				))}
			</div>

			{error && <div className={styles.errorMsg}>{error}</div>}

			{/* Formulario agregar */}
			<form onSubmit={handleAgregar} style={{ display: "flex", gap: 8, marginBottom: 24 }}>
				<input
					className={styles.input}
					type="text"
					placeholder={`Nuevo nombre de ${tab}...`}
					value={nuevoNombre}
					onChange={(e) => setNuevoNombre(e.target.value)}
					maxLength={60}
					style={{ flex: 1 }}
				/>
				<button
					type="submit"
					className={styles.btnPrimary}
					disabled={loading || !nuevoNombre.trim()}>
					{loading ? "Guardando..." : "Agregar"}
				</button>
			</form>

			{/* Lista */}
			<div className={styles.form} style={{ padding: 0, overflow: "hidden" }}>
				{items.length === 0 ? (
					<p style={{ padding: 24, color: "#888", fontSize: "0.9rem" }}>
						No hay {tab === "marca" ? "marcas" : "colores"} registrados.
					</p>
				) : (
					<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
						<thead>
							<tr style={{ borderBottom: "2px solid #810000" }}>
								{["Nombre", "Estado", "Acciones"].map((h) => (
									<th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700, color: "#555", textTransform: "uppercase" }}>
										{h}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr key={item.id} style={{ borderBottom: "1px solid #f0eef6" }}>
									<td style={{ padding: "12px 14px" }}>
										{editandoId === item.id ? (
											<input
												className={styles.input}
												value={editNombre}
												onChange={(e) => setEditNombre(e.target.value)}
												onKeyDown={(e) => {
													if (e.key === "Enter") handleEditar(item.id);
													if (e.key === "Escape") { setEditandoId(null); setEditNombre(""); }
												}}
												autoFocus
												style={{ margin: 0 }}
											/>
										) : (
											<span style={{ fontWeight: 600 }}>{item.nombre}</span>
										)}
									</td>
									<td style={{ padding: "12px 14px" }}>
										<button
											onClick={() => handleToggle(item.id)}
											style={{
												padding: "3px 10px",
												borderRadius: 4,
												border: "none",
												cursor: "pointer",
												fontWeight: 700,
												fontSize: "0.75rem",
												background: item.activo ? "rgba(30,126,52,0.1)" : "rgba(129,0,0,0.08)",
												color: item.activo ? "#1e7e34" : "#810000",
											}}>
											{item.activo ? "Activo" : "Inactivo"}
										</button>
									</td>
									<td style={{ padding: "12px 14px" }}>
										{editandoId === item.id ? (
											<div style={{ display: "flex", gap: 8 }}>
												<button className={styles.btnPrimary} style={{ padding: "6px 14px", fontSize: "0.8rem" }} onClick={() => handleEditar(item.id)} disabled={loading}>
													Guardar
												</button>
												<button className={styles.btnSecondary} style={{ padding: "6px 14px", fontSize: "0.8rem" }} onClick={() => { setEditandoId(null); setEditNombre(""); }}>
													Cancelar
												</button>
											</div>
										) : (
											<div style={{ display: "flex", gap: 8 }}>
												<button
													onClick={() => { setEditandoId(item.id); setEditNombre(item.nombre); }}
													style={{ background: "none", border: "none", cursor: "pointer", color: "#810000" }}
													title="Editar">
													<EditIcon fontSize="small" />
												</button>
												<button
													onClick={() => handleEliminar(item)}
													style={{ background: "none", border: "none", cursor: "pointer", color: "#810000" }}
													title="Eliminar">
													<DeleteIcon fontSize="small" />
												</button>
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default GestionMarcasColores;
