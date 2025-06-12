import styles from "./ListaDescuentos.module.css"
import EditIcon from '@mui/icons-material/Edit';
import AppsIcon from '@mui/icons-material/Apps';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react"
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin"
import { useDescuentoStore } from "../../../../store/descuentoStore"
import Swal from "sweetalert2";
import type { Descuento } from "../../../../types/Descuento";
import { ModalEditarDescuento } from "../../../../components/admin/ModalEditarDescuento/ModalEditarDescuento";
import { ModalProductosDescuento } from "../../../../components/admin/ModalProductosDescuento/ModalProductosDescuento";
import { ModalAgregarProductDescuento } from "../../../../components/admin/ModalAgregarProductDescuento/ModalAgregarProductDescuento";

export const ListaDescuentos = () => {

    const { descuentos, fetchDescuentos, toggleDescuentoStatus, updateDescuento} = useDescuentoStore()

    const [descuentoSeleccionado, setDescuentoSeleccionado] = useState<Descuento | null>(null);
    const [descuentoProductos, setDescuentoProductos] = useState<Descuento | null>(null);
    const [descuentoParaAgregarProductos, setDescuentoParaAgregarProductos] = useState<Descuento | null>(null);

    useEffect(()=>{
        fetchDescuentos()
    }, [fetchDescuentos])

     const handleToggleActivo = (desc: Descuento) => {
        Swal.fire({
        title: `¿Estás seguro de ${desc.activo ? 'desactivar' : 'activar'} este descuento?`,
        text: `Porcentaje: ${desc.porcentajeDescuento}%\nFecha inicio: ${desc.fechaInicio}\nFecha cierre: ${desc.fechaCierre}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7f5af0",
        cancelButtonColor: "#d33",
        confirmButtonText: `Sí, ${desc.activo ? 'desactivar' : 'activar'}`,
        cancelButtonText: "Cancelar",
        }).then((result) => {
        if (result.isConfirmed) {
            toggleDescuentoStatus(desc.id!);
            Swal.fire({
            title: `${desc.activo ? 'Desactivado' : 'Activado'}`,
            text: `El descuento se ha ${desc.activo ? 'desactivado' : 'activado'} correctamente.`,
            icon: "success",
            confirmButtonColor: "#7f5af0",
            });
        }
        });
    };

    const handleEditClick = (desc: Descuento) => {
        setDescuentoSeleccionado(desc);
    };

    const handleProductsClick = (desc: Descuento) => {
        setDescuentoProductos(desc);
    };

    const handleAgregarProductoClick = (desc: Descuento) => {
    setDescuentoParaAgregarProductos(desc);
  };

    const handleCloseModal = () => {
        setDescuentoSeleccionado(null);
        setDescuentoProductos(null);
        setDescuentoParaAgregarProductos(null);
    };

    const handleSaveDescuento = (updatedDescuento: Descuento) => {
        console.log("Guardando descuento editado:", updatedDescuento);
        updateDescuento(  updatedDescuento.id!, updatedDescuento)
    };





  return (
    <>
        
        <div className={styles.container}>
            <MenuAdmin/>
            <div className={styles.containerDescuentos}>
                <div className={styles.titleDescuentos}>
                    <h3>Descuentos</h3>
                </div>
                <ul className={styles.lista}>
                    {descuentos.map((desc) => (
                    <li key={desc.id} className={styles.itemDescuento}>
                        <span className={styles.porcentaje}>{desc.porcentajeDescuento}%</span>
                        <span className={styles.fecha}>Fecha inicio: {desc.fechaInicio}</span>
                        <span className={styles.fecha}>Fecha cierre: {desc.fechaCierre}</span>
                        <span className={styles.botonEditar} onClick={() => handleEditClick(desc)}><EditIcon/></span>
                        <span className={styles.botonAgregar}onClick={() => handleAgregarProductoClick(desc)}><AddIcon/></span>
                        <span className={styles.buttonProducts} onClick={() => handleProductsClick(desc)}><AppsIcon/></span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={desc.activo}
                                onChange={() => handleToggleActivo(desc)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </li>
                    ))}
                </ul>
            </div>
            
            
        </div>
        {descuentoSeleccionado && (
        <ModalEditarDescuento
          descuento={descuentoSeleccionado}
          onClose={handleCloseModal}
          onSave={handleSaveDescuento}
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
        
        
    </>
  )
}
