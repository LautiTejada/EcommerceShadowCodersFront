import { useEffect, useState } from "react"
import { useCategoriaStore } from "../../../store/categoriaStore"
import { tipoStore } from "../../../store/tipoStore"
import type { Categoria } from "../../../types/Categoria"
import styles from "./ModalEditarCategoria.module.css"
import Swal from "sweetalert2"

interface ModalEditarCategoriaProps {
  categoria: Categoria
  onClose: () => void

}

export const ModalEditarCategoria = ({ categoria, onClose}: ModalEditarCategoriaProps) => {

  const [showCategory, setShowCategory] = useState(false)
  const [nuevaCategoria, setNuevaCategoria] = useState<Categoria>({ ...categoria })

  const [nuevoTipoId, setNuevoTipoId] = useState<number>(categoria.tipo!.id)

  const { tipos, obtenerTipos } = tipoStore()
  const { updateCategoria } = useCategoriaStore()

  useEffect(() => {
    obtenerTipos()
  }, [obtenerTipos])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nuevaCategoria.nombreCategoria.trim()) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
        confirmButtonColor: "#7f5af0",
      })
      return
    }

    Swal.fire({
      title: `¿Estás seguro de cambiar la categoría a "${nuevaCategoria.nombreCategoria}"?`,
      text: `Categoría: ${categoria.nombreCategoria}, cambiará a: ${nuevaCategoria.nombreCategoria}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7f5af0",
      cancelButtonColor: "#d33",
      confirmButtonText: `Cambiar`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {

        updateCategoria(categoria.id!, nuevaCategoria, nuevoTipoId)

        Swal.fire({
          title: `Actualizado`,
          text: `La categoría se ha actualizado correctamente.`,
          icon: "success",
          confirmButtonColor: "#7f5af0",
        })
      }
      onClose()
    })
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>EDITAR CATEGORÍA</h2>
        <form onSubmit={handleSubmit} className={styles.form}>

          <label className={styles.label}>TIPO</label>
          <div
            className={styles.select}
            onClick={() => setShowCategory(!showCategory)}
            tabIndex={0}
          >
            {tipos.find(tipo => tipo.id === nuevoTipoId)?.nombre || "Seleccionar tipo"}
            <span className={styles.arrow} />
            {showCategory && (
              <div className={styles.dropdown}>
                {tipos.map(tipo => (
                  <div
                    key={tipo.id}
                    className={styles.dropdownItem}
                    onClick={() => {
                      setNuevoTipoId(tipo.id!)
                      setShowCategory(false)
                    }}
                  >
                    {tipo.nombre}
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className={styles.label}>NOMBRE</label>
          <input
            type="text"
            value={nuevaCategoria.nombreCategoria}
            onChange={(e) =>
              setNuevaCategoria({ ...nuevaCategoria, nombreCategoria: e.target.value })
            }
            className={styles.input}
            placeholder="..."
          />

          <div className={styles.botones}>
            {/* ✅ Cambiado a type="submit" */}
            <button type="submit" className={styles.botonGuardar}>
              EDITAR CATEGORÍA
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
