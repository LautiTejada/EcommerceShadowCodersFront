import styles from "./AgregarTiposCategorias.module.css"

import { useEffect, useState } from "react"
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin"
import type { Tipo } from "../../../../types/Tipo"
import type { Categoria } from "../../../../types/Categoria"
import { useCategoriaStore } from "../../../../store/categoriaStore"
import { tipoStore } from "../../../../store/tipoStore"

export const AgregarTiposCategorias = () => {

  const [tipo, setTipo] = useState<Tipo>({
    nombre: "",
  })

  const {crearTipo , tipos, obtenerTiposActivos, tipoActual, setTipoActual} = tipoStore();

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
  }

    const [categoria, setCategoria] = useState<Categoria>({
      nombreCategoria: "",
      activo: false,
    })

  
    const { addCategoria } = useCategoriaStore()

   useEffect(()=> {
    obtenerTiposActivos()
   },[obtenerTiposActivos])

   const [showCategory, setShowCategory] = useState(false);

   const handleInputCategoria = (field: string, value: string) => {
    setCategoria({ ...categoria, [field]: value });
  };

  const handleAddCategoria = (e: React.FormEvent) => {
    e.preventDefault(); 

    if(!tipoActual || tipoActual.id === undefined){
        alert("Selecciona un tipo");
      return
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

    setTipoActual(null)
  }
  

  return (
    <div className={styles.container}>
      <MenuAdmin />
      <div className={styles.containerForms}>
        <main className={styles.mainContent}>
            <form className={styles.form} onSubmit={handleAddCategoria}>
              <h3 className={styles.tituloCrear}>CREAR CATEGORIA</h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>NOMBRE</label>
                  <div className={styles.inputIcon}>
                    <input
                      className={styles.input}
                      type="text"
                      value={categoria.nombreCategoria}
                      onChange={e => handleInputCategoria("nombreCategoria", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                  <label className={styles.label}>CATEGORIA</label>
                  <div
                    className={styles.select}
                    onClick={() => setShowCategory(!showCategory)}
                    tabIndex={0}
                  >
                    {tipoActual?.nombre || "..."}
                    <span className={styles.arrow} />
                    {showCategory && (
                      <div className={styles.dropdown}>
                        {tipos.map(tipo => (
                          <div
                            key={tipo.id}
                            className={styles.dropdownItem}
                            onClick={() => setTipoActual(tipo)}
                          >
                            {tipo.nombre}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              <div className={styles.formRow}>
                <button className={styles.addButton} type="submit">
                  AGREGAR CATEGORIA
                </button>
              </div>
            </form>
          </main>
        <main className={styles.mainContent}>
          <form className={styles.form} onSubmit={handleAddTipo}>
            <h3 className={styles.tituloCrear}>CREAR TIPO</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>NOMBRE</label>
                <div className={styles.inputIcon}>
                  <input
                    className={styles.input}
                    type="text"
                    value={tipo.nombre}
                    onChange={e => handleInputTipo("nombre", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <button className={styles.addButton} type="submit">
                AGREGAR TIPO
              </button>
            </div>
          </form>
        </main>
          
      </div>
      
  </div>
)}
