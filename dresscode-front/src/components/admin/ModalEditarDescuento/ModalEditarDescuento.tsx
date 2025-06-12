
import styles from "./ModalEditarDescuento.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDescuentoStore } from "../../../store/descuentoStore";
import type { Descuento } from "../../../types/Descuento";


interface ModalEditarDescuentoProps{
  descuento: Descuento,
  onClose: () => void
}


export const ModalEditarDescuento = ({ descuento, onClose }: ModalEditarDescuentoProps) => {

  const {updateDescuento} = useDescuentoStore()

  const [porcentaje, setPorcentaje] = useState(descuento.porcentajeDescuento);
  const [fechaInicio, setFechaInicio] = useState(descuento.fechaInicio);
  const [fechaCierre, setFechaCierre] = useState(descuento.fechaCierre);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!porcentaje || !fechaInicio || !fechaCierre) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
        confirmButtonColor: "#7f5af0",
      });
      return;
    }

    updateDescuento(descuento.id! , {
      ...descuento,
      porcentajeDescuento: porcentaje,
      fechaInicio: fechaInicio,
      fechaCierre: fechaCierre,
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Editar Descuento</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>PORCENTAJE DESCUENTO</label>
          <input
            type="number"
            value={porcentaje}
            onChange={(e) => setPorcentaje(parseInt(e.target.value))}
            className={styles.input}
          />

          <label className={styles.label}>FECHA INICIO</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>FECHA CIERRE</label>
          <input
            type="date"
            value={fechaCierre}
            onChange={(e) => setFechaCierre(e.target.value)}
            className={styles.input}
          />

          <div className={styles.botones}>
          
          <button className={styles.botonGuardar} onClick={handleSubmit}>
            EDITAR DESCUENTO
          </button>
          <button className={styles.botonCancelar} onClick={onClose}>
            CANCELAR
          </button>
        </div>
          
        </form>
      </div>
    </div>
  );
};
