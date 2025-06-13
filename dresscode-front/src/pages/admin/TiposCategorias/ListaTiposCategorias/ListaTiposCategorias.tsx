import styles from "./ListaTiposCategorias.module.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

    const {categoriasActivas, fetchCategoriasActivas, desactivateCategoria} = useCategoriaStore()

    const {tipos, obtenerTiposActivos, desactivarTipo}= tipoStore()

    const [tipoSeleccionado, setTipoSeleccionado] = useState<Tipo | null>(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria| null>(null)


    useEffect(()=>{
        fetchCategoriasActivas()
        obtenerTiposActivos()
    }, [])

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
            title: `¿Estás seguro de eliminar este tipo?`,
            text: `Tipo: ${tipo.nombre}, se desactivaran todas sus categorias y sus productos`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7f5af0",
            cancelButtonColor: "#d33",
            confirmButtonText: `Sí, eliminar`,
            cancelButtonText: "Cancelar",
            }).then((result) => {
            if (result.isConfirmed) {
                desactivarTipo(tipo.id!);
                obtenerTiposActivos()
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
            title: `¿Estás seguro de eliminar esta categoria?`,
            text: `Tipo: ${categ.nombreCategoria}, se desactivaran todos sus productos`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7f5af0",
            cancelButtonColor: "#d33",
            confirmButtonText: `Sí, ${categ.activo ? 'desactivar' : 'activar'}`,
            cancelButtonText: "Cancelar",
            }).then((result) => {
            if (result.isConfirmed) {
                desactivateCategoria(categ.id!);
                fetchCategoriasActivas()
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
                                <span className={styles.botonEditar} onClick={() => handleToggleStateTipo(tipo)}><DeleteIcon/></span>
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
                        {categoriasActivas.map((cat) => (
                        <li key={cat.id} className={styles.itemDescuento}>
                            <span className={styles.porcentaje}>{cat.nombreCategoria}</span>
                            <div className={styles.buttonObject}>
                                <span className={styles.botonEditar} onClick={()=> handleEditCategoria(cat)} ><EditIcon/></span>
                                <span className={styles.botonEditar} onClick={() => handleToggleStateCategoria(cat)}><DeleteIcon/></span>
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
