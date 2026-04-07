import styles from "../../AgregarProducto/AgregarProducto.module.css";
import { useEffect, useState } from "react";
import type { Tipo } from "../../../../types/Tipo";
import type { Categoria } from "../../../../types/Categoria";
import { useCategoriaStore } from "../../../../store/categoriaStore";
import { tipoStore } from "../../../../store/tipoStore";
import { sileo } from "sileo";

export const AgregarTiposCategorias = () => {
	const [tipo, setTipo] = useState<Tipo>({
		nombre: "",
	});

	const { crearTipo, tipos, obtenerTiposActivos, tipoActual, setTipoActual } =
		tipoStore();

	const handleInputTipo = (field: string, value: string) => {
		setTipo({ ...tipo, [field]: value });
	};

	const handleAddTipo = (e: React.FormEvent) => {
		e.preventDefault();

		const nuevoTipo = {
			...tipo,
		};

		crearTipo(nuevoTipo);

		// Reseteo de formulario
		setTipo({
			nombre: "",
		});
	};

	const [categoria, setCategoria] = useState<Categoria>({
		nombreCategoria: "",
		activo: false,
	});

	const { addCategoria } = useCategoriaStore();

	useEffect(() => {
		obtenerTiposActivos();
	}, [obtenerTiposActivos]);

	const handleInputCategoria = (field: string, value: string) => {
		setCategoria({ ...categoria, [field]: value });
	};

	const handleAddCategoria = (e: React.FormEvent) => {
		e.preventDefault();

		if (!tipoActual || tipoActual.id === undefined) {
			sileo.error({
				title: "Tipo requerido",
				description: "Selecciona un tipo antes de agregar una categoría.",
			});
			return;
		}

		const nuevaCategoria = {
			...categoria,
		};

		addCategoria(nuevaCategoria, tipoActual.id);

		// Reseteo de formulario
		setCategoria({
			nombreCategoria: "",
			activo: false,
		});

		setTipoActual(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Agregar Tipo y Categoría</h1>
				<p>Creá nuevos tipos y categorías para clasificar los productos</p>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
				<form className={styles.form} onSubmit={handleAddTipo} noValidate>
					<h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 16 }}>
						Crear Tipo
					</h2>
					<div className={styles.fieldGroup}>
						<label className={styles.label}>
							Nombre <span className={styles.required}>*</span>
						</label>
						<input
							className={styles.input}
							type="text"
							value={tipo.nombre}
							onChange={(e) => handleInputTipo("nombre", e.target.value)}
							placeholder="Ej: Ropa, Calzado..."
						/>
					</div>
					<div className={styles.actions}>
						<button type="submit" className={styles.btnPrimary}>
							Agregar tipo
						</button>
					</div>
				</form>

				<form className={styles.form} onSubmit={handleAddCategoria} noValidate>
					<h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 16 }}>
						Crear Categoría
					</h2>
					<div className={styles.fieldGroup}>
						<label className={styles.label}>
							Nombre <span className={styles.required}>*</span>
						</label>
						<input
							className={styles.input}
							type="text"
							value={categoria.nombreCategoria}
							onChange={(e) =>
								handleInputCategoria("nombreCategoria", e.target.value)
							}
							placeholder="Ej: Remeras, Pantalones..."
						/>
					</div>
					<div className={styles.fieldGroup}>
						<label className={styles.label}>
							Tipo <span className={styles.required}>*</span>
						</label>
						<select
							className={styles.select}
							value={tipoActual?.id ?? ""}
							onChange={(e) => {
								const t = tipos.find((t) => t.id === Number(e.target.value));
								setTipoActual(t ?? null);
							}}>
							<option value="">Seleccioná un tipo</option>
							{tipos.map((t) => (
								<option key={t.id} value={t.id}>
									{t.nombre}
								</option>
							))}
						</select>
					</div>
					<div className={styles.actions}>
						<button type="submit" className={styles.btnPrimary}>
							Agregar categoría
						</button>
					</div>
				</form>
			</div>
		</div>
};
