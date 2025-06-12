import { useState } from "react"
import type { Tipo } from "../../../types/Tipo"
import styles from "./ModalEditarTipo.module.css"
import Swal from "sweetalert2"
import { tipoStore } from "../../../store/tipoStore"

interface ModalEditarTipoProps {
  tipo: Tipo,
  onClose: () => void
}

export const ModalEditarTipo = ({ tipo, onClose }: ModalEditarTipoProps) => {

  const { actualizarTipo } = tipoStore()

  const [nuevoTipo, setNuevoTipo] = useState<Tipo>({ ...tipo })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nuevoTipo.nombre.trim()) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
        confirmButtonColor: "#7f5af0",
      });
      return;
    }

    Swal.fire({
      title: `¿Estás seguro de cambiar el nombre de este tipo a "${nuevoTipo.nombre}"?`,
      text: `Tipo: ${tipo.nombre}, cambiará a: ${nuevoTipo.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7f5af0",
      cancelButtonColor: "#d33",
      confirmButtonText: `Cambiar`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        actualizarTipo(tipo.id!, {
          ...tipo,
          nombre: nuevoTipo.nombre
        })

        Swal.fire({
          title: `Actualizado`,
          text: `El nombre se ha cambiado correctamente a ${nuevoTipo.nombre}.`,
          icon: "success",
          confirmButtonColor: "#7f5af0",
        });
      }
    });

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>EDITAR TIPO</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>NOMBRE</label>
          <input
            type="text"
            value={nuevoTipo.nombre}
            onChange={(e) =>
              setNuevoTipo({ ...nuevoTipo, nombre: e.target.value })
            }
            className={styles.input}
            placeholder="..."
          />
          <div className={styles.botones}>
            <button type="submit" className={styles.botonGuardar}>
              EDITAR TIPO
            </button>
            <button type="button" className={styles.botonCancelar} onClick={onClose}>
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
