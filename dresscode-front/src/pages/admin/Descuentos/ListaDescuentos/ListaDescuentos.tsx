import styles from "./ListaDescuentos.module.css"
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react"
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin"
import { useDescuentoStore } from "../../../../store/descuentoStore"
import Swal from "sweetalert2";
import type { Descuento } from "../../../../types/Descuento";

export const ListaDescuentos = () => {

    const { descuentos, fetchDescuentos, toggleDescuentoStatus} = useDescuentoStore()

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
                        <span className={styles.botonEditar}><EditIcon/></span>
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
        
    </>
  )
}
