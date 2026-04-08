import React, { useEffect, useState } from "react";
import styles from "../AgregarProducto/AgregarProducto.module.css";
import { useOrdenCompraStore } from "../../../store/ordenCompraStore";
import type { OrdenDeCompra } from "../../../types/OrdenDeCompra";
import type { EstadoOrden } from "../../../types/enums/EstadoOrden";
import Swal from "sweetalert2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ESTADOS: EstadoOrden[] = ["PEDIDO", "EN_PROCESO", "EN_CAMINO", "ENTREGADO"];

const ESTADO_LABEL: Record<EstadoOrden, string> = {
	PEDIDO: "Pedido",
	EN_PROCESO: "En proceso",
	EN_CAMINO: "En camino",
	ENTREGADO: "Entregado",
};

const ESTADO_COLOR: Record<EstadoOrden, { bg: string; color: string }> = {
	PEDIDO: { bg: "rgba(129,0,0,0.08)", color: "#810000" },
	EN_PROCESO: { bg: "rgba(230,126,34,0.1)", color: "#c0710a" },
	EN_CAMINO: { bg: "rgba(41,128,185,0.1)", color: "#1a6da3" },
	ENTREGADO: { bg: "rgba(30,126,52,0.1)", color: "#1e7e34" },
};

export const ListaOrdenes: React.FC = () => {
	const { ordenesCompra, fetchOrdenesDeCompra, updateEstadoOrdenDeCompra } =
		useOrdenCompraStore();

	const [loading, setLoading] = useState(true);
	const [filtroEstado, setFiltroEstado] = useState<EstadoOrden | "TODOS">("TODOS");
	const [expandedId, setExpandedId] = useState<number | null>(null);
	const [updatingId, setUpdatingId] = useState<number | null>(null);

	useEffect(() => {
		fetchOrdenesDeCompra().finally(() => setLoading(false));
	}, [fetchOrdenesDeCompra]);

	const ordenesFiltradas: OrdenDeCompra[] =
		filtroEstado === "TODOS"
			? ordenesCompra
			: ordenesCompra.filter((o) => o.estadoOrden === filtroEstado);

	const handleCambiarEstado = (orden: OrdenDeCompra, nuevoEstado: EstadoOrden) => {
		if (orden.estadoOrden === nuevoEstado) return;
		Swal.fire({
			title: "¿Cambiar estado?",
			text: `Orden #${orden.id} → ${ESTADO_LABEL[nuevoEstado]}`,
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#810000",
			cancelButtonColor: "#666",
			confirmButtonText: "Sí, cambiar",
			cancelButtonText: "Cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setUpdatingId(orden.id!);
				try {
					await updateEstadoOrdenDeCompra(orden.id!, nuevoEstado);
				} finally {
					setUpdatingId(null);
				}
			}
		});
	};

	const toggleExpand = (id: number) => {
		setExpandedId((prev) => (prev === id ? null : id));
	};

	const formatFecha = (fecha?: string) => {
		if (!fecha) return "—";
		return new Date(fecha).toLocaleDateString("es-AR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Órdenes de compra</h1>
				<p>Gestioná y actualizá el estado de todos los pedidos</p>
			</div>

			{/* Filtros */}
			<div
				style={{
					display: "flex",
					gap: 8,
					flexWrap: "wrap",
					flexShrink: 0,
				}}>
				{(["TODOS", ...ESTADOS] as (EstadoOrden | "TODOS")[]).map((e) => {
					const active = filtroEstado === e;
					return (
						<button
							key={e}
							onClick={() => setFiltroEstado(e)}
							style={{
								padding: "6px 14px",
								borderRadius: 20,
								fontSize: "0.78rem",
								fontWeight: 600,
								cursor: "pointer",
								border: active ? "none" : "1.5px solid #ddd9e8",
								background: active ? "#810000" : "#fff",
								color: active ? "#fff" : "#555",
								transition: "all 0.15s",
							}}>
							{e === "TODOS" ? "Todos" : ESTADO_LABEL[e as EstadoOrden]}
						</button>
					);
				})}
			</div>

			{/* Tabla */}
			<div className={styles.form} style={{ padding: 0, overflow: "hidden" }}>
				{loading ? (
					<p style={{ padding: 24, color: "#888", fontSize: "0.875rem" }}>
						Cargando órdenes...
					</p>
				) : ordenesFiltradas.length === 0 ? (
					<p style={{ padding: 24, color: "#888", fontSize: "0.875rem" }}>
						No hay órdenes {filtroEstado !== "TODOS" ? `con estado "${ESTADO_LABEL[filtroEstado as EstadoOrden]}"` : ""}.
					</p>
				) : (
					<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
						<thead>
							<tr style={{ borderBottom: "2px solid #810000" }}>
								{["#", "Fecha", "Cliente", "Total", "Pago", "Estado", "Acciones", ""].map(
									(h) => (
										<th
											key={h}
											style={{
												padding: "10px 14px",
												textAlign: "left",
												fontSize: "0.72rem",
												fontWeight: 700,
												color: "#555",
												textTransform: "uppercase",
												letterSpacing: "0.05em",
												whiteSpace: "nowrap",
											}}>
											{h}
										</th>
									),
								)}
							</tr>
						</thead>
						<tbody>
							{ordenesFiltradas.map((orden) => {
								const isExpanded = expandedId === orden.id;
								const isUpdating = updatingId === orden.id;
								const estadoStyle = ESTADO_COLOR[orden.estadoOrden as EstadoOrden] ?? {
									bg: "#eee",
									color: "#555",
								};
								return (
									<React.Fragment key={orden.id}>
										<tr
											style={{
												borderBottom: "1px solid #f0eef6",
												background: isExpanded ? "rgba(129,0,0,0.02)" : "transparent",
											}}>
											<td style={{ padding: "12px 14px", color: "#810000", fontWeight: 700 }}>
												#{orden.id}
											</td>
											<td style={{ padding: "12px 14px", color: "#555" }}>
												{formatFecha(orden.fecha)}
											</td>
											<td style={{ padding: "12px 14px", color: "#1a1a1a" }}>
												<div style={{ fontWeight: 600 }}>{orden.usuario?.username ?? "—"}</div>
												<div style={{ fontSize: "0.75rem", color: "#888" }}>
													{orden.usuario?.email ?? ""}
												</div>
											</td>
											<td style={{ padding: "12px 14px", color: "#1a1a1a", fontWeight: 600 }}>
												${orden.precioTotal?.toLocaleString("es-AR")}
											</td>
											<td style={{ padding: "12px 14px", color: "#555", fontSize: "0.8rem" }}>
												{orden.metodoPago?.replace("_", " ") ?? "—"}
											</td>
											<td style={{ padding: "12px 14px" }}>
												<span
													style={{
														...estadoStyle,
														padding: "3px 9px",
														borderRadius: 4,
														fontSize: "0.75rem",
														fontWeight: 700,
													}}>
													{ESTADO_LABEL[orden.estadoOrden as EstadoOrden] ?? orden.estadoOrden}
												</span>
											</td>
											<td style={{ padding: "12px 14px" }}>
												<select
													className={styles.select}
													style={{ fontSize: "0.78rem", padding: "5px 28px 5px 8px" }}
													value={orden.estadoOrden}
													disabled={isUpdating}
													onChange={(e) =>
														handleCambiarEstado(orden, e.target.value as EstadoOrden)
													}>
													{ESTADOS.map((est) => (
														<option key={est} value={est}>
															{ESTADO_LABEL[est]}
														</option>
													))}
												</select>
											</td>
											<td style={{ padding: "12px 14px" }}>
												<button
													onClick={() => toggleExpand(orden.id!)}
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
														color: "#810000",
														display: "flex",
														alignItems: "center",
													}}
													title={isExpanded ? "Contraer" : "Ver detalles"}>
													{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
												</button>
											</td>
										</tr>

										{/* Detalles expandidos */}
										{isExpanded && (
											<tr>
												<td
													colSpan={8}
													style={{
														padding: "0 14px 14px 14px",
														background: "rgba(129,0,0,0.02)",
														borderBottom: "1px solid #f0eef6",
													}}>
													<div
														style={{
															marginTop: 10,
															display: "grid",
															gridTemplateColumns: "1fr 1fr",
															gap: 16,
														}}>
														{/* Dirección */}
														<div
															style={{
																background: "#fff",
																border: "1px solid #ddd9e8",
																borderRadius: 6,
																padding: 14,
															}}>
															<p
																style={{
																	fontSize: "0.72rem",
																	fontWeight: 700,
																	color: "#810000",
																	textTransform: "uppercase",
																	marginBottom: 8,
																}}>
																Dirección de entrega
															</p>
															{orden.direccion ? (
																<>
																	<p style={{ fontSize: "0.82rem", color: "#1a1a1a", margin: "2px 0" }}>
																		{orden.direccion.calle} {orden.direccion.numero}
																	</p>
																	<p style={{ fontSize: "0.82rem", color: "#555", margin: "2px 0" }}>
																		{orden.direccion.localidad}, {orden.direccion.provincia}
																	</p>
																	{orden.direccion.codigoPostal && (
																		<p style={{ fontSize: "0.82rem", color: "#555", margin: "2px 0" }}>
																			CP: {orden.direccion.codigoPostal}
																		</p>
																	)}
																</>
															) : (
																<p style={{ fontSize: "0.82rem", color: "#888" }}>Sin dirección</p>
															)}
														</div>

														{/* Productos */}
														<div
															style={{
																background: "#fff",
																border: "1px solid #ddd9e8",
																borderRadius: 6,
																padding: 14,
															}}>
															<p
																style={{
																	fontSize: "0.72rem",
																	fontWeight: 700,
																	color: "#810000",
																	textTransform: "uppercase",
																	marginBottom: 8,
																}}>
																Productos
															</p>
															{orden.detalles && orden.detalles.length > 0 ? (
																<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
																	{orden.detalles.map((det) => (
																		<li
																			key={det.id}
																			style={{
																				display: "flex",
																				justifyContent: "space-between",
																				fontSize: "0.82rem",
																				color: "#1a1a1a",
																				padding: "4px 0",
																				borderBottom: "1px solid #f0eef6",
																			}}>
																			<span>
																				Talle {det.productoTalle?.talle?.tipoTalle ?? "?"} × {det.cantidad}
																			</span>
																			<span style={{ fontWeight: 600 }}>
																				${det.precioUnitario?.toLocaleString("es-AR")}
																			</span>
																		</li>
																	))}
																</ul>
															) : (
																<p style={{ fontSize: "0.82rem", color: "#888" }}>Sin detalles</p>
															)}
														</div>
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};
