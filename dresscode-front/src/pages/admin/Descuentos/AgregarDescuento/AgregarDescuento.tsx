import styles from "./AgregarDescuento.module.css"
import { useState } from "react"
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin"
import type { Descuento } from "../../../../types/Descuento"
import { useDescuentoStore } from "../../../../store/descuentoStore"



export const AgregarDescuento = () => {

  const [descuento, setDescuento] = useState<Descuento>({
    activo : false,
    fechaInicio : "",
    fechaCierre: "",
    porcentajeDescuento: 0,
    productos : []
  })

  const {addDescuento} = useDescuentoStore();

  const handleAddDiscount = (e: React.FormEvent) => {
   e.preventDefault(); 

   const nuevoDecuento = {
     ...descuento, 
   };

   addDescuento(nuevoDecuento);

   // Reseteo de formulario
   setDescuento({
     activo : false,
     fechaInicio : "",
     fechaCierre: "",
     porcentajeDescuento: 0,
     productos : []
  });
}





  const handleInput = (field: string, value: string) => {
    setDescuento({ ...descuento, [field]: value });
  };



  return (
    <div className={styles.container}>
  <MenuAdmin />
  <main className={styles.mainContent}>
    <form className={styles.form} onSubmit={handleAddDiscount}>
      <div className={styles.formRow}>
        {/* Fecha Inicio */}
        <div className={styles.formGroup}>
          <label className={styles.label}>FECHA INICIO</label>
          <div className={styles.inputIcon}>
            <input
              className={styles.input}
              type="date"
              value={descuento.fechaInicio}
              onChange={e => handleInput("fechaInicio", e.target.value)}
            />
          </div>
        </div>

        {/* Fecha Cierre */}
        <div className={styles.formGroup}>
          <label className={styles.label}>FECHA CIERRE</label>
          <div className={styles.inputIcon}>
            <input
              className={styles.input}
              type="date"
              value={descuento.fechaCierre}
              onChange={e => handleInput("fechaCierre", e.target.value)}
            />
          </div>
        </div>

        {/* Porcentaje */}
        <div className={styles.formGroup}>
          <label className={styles.label}>PORCENTAJE</label>
          <div className={styles.inputIcon}>
            <input
              className={styles.input}
              type="number"
              min="0"
              max="100"
              value={descuento.porcentajeDescuento}
              onChange={e => handleInput("porcentajeDescuento", e.target.value)}
              placeholder="%"
            />
          </div>
        </div>
      </div>

      <div className={styles.formRow}>
        <button className={styles.addButton} type="submit">
          AGREGAR PRODUCTO
        </button>
      </div>
    </form>
  </main>
</div>

  );
}

