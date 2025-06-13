import styles from "./cart.module.css";
import { useCartStore } from "../../store/cartStore";
import { useOrdenCompraStore } from "../../store/ordenCompraStore";
import { useDetalleOrdenStore } from "../../store/detalleOrdenStore";
import { useUsuarioStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import type { MetodoPago } from "../../types/enums/MetodoPago";
import type { EstadoOrden } from "../../types/enums/EstadoOrden";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const { createOrdenDeCompra } = useOrdenCompraStore();
  const { addDetalleOrden } = useDetalleOrdenStore();
  const { usuarioActual } = useUsuarioStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const handleCheckout = async () => {
    if (!usuarioActual) {
      alert("Debes iniciar sesión para finalizar la compra.");
      return;
    }
    const direccionSeleccionada = usuarioActual.direcciones?.[0];
    if (!direccionSeleccionada) {
      alert(
        "Debes tener al menos una dirección cargada para finalizar la compra."
      );
      return;
    }
    try {
      const orden = {
        usuario: {
          id: usuarioActual.id,
          username: usuarioActual.username, // Asegúrate de que esta propiedad exista
          email: usuarioActual.email,
          rol: usuarioActual.rol,
        },
        direccion: direccionSeleccionada,
        fecha: new Date().toISOString(),
        precioTotal: subtotal,
        metodoPago: "MERCADO_PAGO" as MetodoPago,
        estadoOrden: "PEDIDO" as EstadoOrden,
        detalles: cart.map((item) => ({
          productoTalle: {
            productoId: item.productoId,
            talle: {
              id: item.talleId!,
              activo: true,
              tipoTalle: item.tipoTalle || "", // Asegúrate de que `tipoTalle` esté definido
            },
            activo: true,
            cantidad: item.cantidad,
          },
          cantidad: item.cantidad,
          precioUnitario: item.precio,
        })),
      };

      const ordenCreada = await createOrdenDeCompra(orden);

      const response = await fetch(
        "http://localhost:8080/api/mercado-pago/mp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: ordenCreada.id,
            items: cart.map((item) => ({
              title: item.nombre,
              quantity: item.cantidad,
              unit_price: item.precio,
              urlImagen: item.imagen,
            })),
          }),
        }
      );
      const data = await response.json();

      // Verificar si la URL de pago está presente
      if (data.init_point) {
        clearCart(); // Limpiar el carrito
        window.open(data.init_point, "_blank"); // Abrir la URL en una nueva pestaña
      } else {
        alert("Error al redirigir a Mercado Pago");
      }
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert("Error al finalizar la compra");
    }
  };

  return (
    <div className={styles.cartBg}>
      <header className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>CARRITO</h1>
      </header>
      <div className={styles.cartContent}>
        <div className={styles.productsTableWrapper}>
          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th className={styles.thProduct}>PRODUCTO</th>
                <th className={styles.th}>PRECIO</th>
                <th className={styles.th}>CANTIDAD</th>
                <th className={styles.th}>SUBTOTAL</th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={
                    String(item.productoId) + "-" + String(item.talleId ?? "")
                  }
                >
                  <td className={styles.productInfoCell}>
                    <img
                      src={`http://localhost:8080${encodeURI(
                        item.imagen[0].startsWith("/")
                          ? item.imagen
                          : `/${item.imagen}`
                      )}`}
                      alt={item.nombre}
                      className={styles.productImg}
                    />
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>{item.nombre}</div>
                      {item.talleId && (
                        <div className={styles.productBrand}>
                          Talle: {item.talleId}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className={styles.productPrice}>
                    ${item.precio.toLocaleString("es-AR")}
                  </td>
                  <td className={styles.productQtyCell}>
                    <button
                      onClick={() =>
                        updateQuantity(item.productoId, -1, item.talleId)
                      }
                      className={styles.qtyBtn}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{item.cantidad}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productoId, 1, item.talleId)
                      }
                      className={styles.qtyBtn}
                    >
                      +
                    </button>
                  </td>
                  <td className={styles.productSubtotal}>
                    ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                  </td>
                  <td className={styles.productRemoveCell}>
                    <button
                      onClick={() =>
                        removeFromCart(item.productoId, item.talleId)
                      }
                      className={styles.removeBtn}
                      title="Eliminar"
                    >
                      &#10005;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen de compra */}
        <div className={styles.summaryBox}>
          <div className={styles.summaryHeader}>RESUMEN DE COMPRA</div>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString("es-AR")}</span>
          </div>
          <hr className={styles.summaryDivider} />
          <div className={styles.summaryTotalRow}>
            <span>Total</span>
            <span>${subtotal.toLocaleString("es-AR")}</span>
          </div>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            <span style={{ fontSize: 18 }}>🛒</span> FINALIZAR COMPRA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
