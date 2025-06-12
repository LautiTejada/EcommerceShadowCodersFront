import styles from "./ListaTiposCategorias.module.css"
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react"
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin"
import { useCategoriaStore } from "../../../../store/categoriaStore"
import { tipoStore } from "../../../../store/tipoStore";
import type { Tipo } from "../../../../types/Tipo";
import type { Categoria } from "../../../../types/Categoria";
import Swal from "sweetalert2";
import { ModalEditarTipo } from "../../../../components/admin/ModalEditarTipo/ModalEditarTipo";
import { ModalEditarCategoria } from "../../../../components/admin/ModalEditarCategoria/ModalEditarCategoria";

export const ListaTiposCategorias = () => {

    const {categorias, fetchCategorias, toggleCategoriaStatus} = useCategoriaStore()

    const {tipos, obtenerTipos, cambiarEstadoTipo}= tipoStore()

    const [tipoSeleccionado, setTipoSeleccionado] = useState<Tipo | null>(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria| null>(null)


    useEffect(()=>{
        fetchCategorias()
        obtenerTipos()
    }, [fetchCategorias, obtenerTipos])

    const handleEditTipo = (tipo: Tipo) => {
            setTipoSeleccionado(tipo);
        };

    const handleEditCategoria = (cat: Categoria) => {
        setCategoriaSeleccionada(cat);
        };
    
    const handleCloseModal = () => {
        setTipoSeleccionado(null)
        setCategoriaSeleccionada(null)
    };

    const handleToggleStateTipo = (tipo: Tipo ) => {
            Swal.fire({
            title: `¿Estás seguro de ${tipo.activo ? 'desactivar' : 'activar'} este descuento?`,
            text: `Tipo: ${tipo.nombre}, se desactivaran todas sus categorias y sus productos`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7f5af0",
            cancelButtonColor: "#d33",
            confirmButtonText: `Sí, ${tipo.activo ? 'desactivar' : 'activar'}`,
            cancelButtonText: "Cancelar",
            }).then((result) => {
            if (result.isConfirmed) {
                cambiarEstadoTipo(tipo.id!);
                Swal.fire({
                title: `${tipo.activo ? 'Desactivado' : 'Activado'}`,
                text: `El descuento se ha ${tipo.activo ? 'desactivado' : 'activado'} correctamente.`,
                icon: "success",
                confirmButtonColor: "#7f5af0",
                });
            }
            });
        };

        const handleToggleStateCategoria = (categ: Categoria ) => {
            Swal.fire({
            title: `¿Estás seguro de ${categ.activo ? 'desactivar' : 'activar'} este descuento?`,
            text: `Tipo: ${categ.nombreCategoria}, se desactivaran todos sus productos`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7f5af0",
            cancelButtonColor: "#d33",
            confirmButtonText: `Sí, ${categ.activo ? 'desactivar' : 'activar'}`,
            cancelButtonText: "Cancelar",
            }).then((result) => {
            if (result.isConfirmed) {
                toggleCategoriaStatus(categ.id!);
                Swal.fire({
                title: `${categ.activo ? 'Desactivado' : 'Activado'}`,
                text: `El descuento se ha ${categ.activo ? 'desactivado' : 'activado'} correctamente.`,
                icon: "success",
                confirmButtonColor: "#7f5af0",
                });
            }
            });
        };

  return (
    <div>
        <div className={styles.container}>
            <MenuAdmin/>
            <div className={styles.containerLists}>
                <div className={styles.containerTipos}>
                    <div className={styles.titleTipos}>
                        <h3>TIPOS</h3>
                    </div>
                    <ul className={styles.listaTipos}>
                        {tipos.map((tipo) => (
                        <li key={tipo.id} className={styles.itemDescuento}>
                            <span className={styles.porcentaje}>{tipo.nombre}</span>
                            <div className={styles.buttonObject}>
                                <span className={styles.botonEditar} onClick={() => handleEditTipo(tipo)} ><EditIcon/></span>
                                <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={tipo.activo}
                                    onChange={() => handleToggleStateTipo(tipo)}
                                />
                                <span className={styles.slider}></span>
                            </label>
                            </div>
                            
                        </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.containerDescuentos}>
                    <div className={styles.titleDescuentos}>
                        <h3>CATEOGRIAS</h3>
                    </div>
                    <ul className={styles.lista}>
                        {categorias.map((cat) => (
                        <li key={cat.id} className={styles.itemDescuento}>
                            <span className={styles.porcentaje}>{cat.nombreCategoria}</span>
                            <div className={styles.buttonObject}>
                                <span className={styles.botonEditar} onClick={()=> handleEditCategoria(cat)} ><EditIcon/></span>
                                <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={cat.activo}
                                    onChange={() => handleToggleStateCategoria(cat)}
                                />
                                <span className={styles.slider}></span>
                            </label>
                            </div>
                            
                        </li>
                        ))}
                    </ul>
                </div>

            </div>
            
        </div>
        {tipoSeleccionado && (
                <ModalEditarTipo
                tipo={tipoSeleccionado}
                onClose={handleCloseModal}
                />
            )}
        {categoriaSeleccionada && (
            <ModalEditarCategoria
            categoria={categoriaSeleccionada}
            onClose={handleCloseModal}
            />
        )}
    </div>
  )
}
