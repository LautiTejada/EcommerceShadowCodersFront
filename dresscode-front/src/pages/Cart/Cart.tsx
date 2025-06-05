import { useState } from "react";
import styles from "./cart.module.css";

const initialCart = [
  {
    id: 1,
    name: "Nike Dunk Low",
    brand: "Nike",
    category: "Zapatillas",
    image: "/public/assets/ImagesProducts/image 8.png",
    price: 399999,
    quantity: 1,
  },
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);

  const handleQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartBg}>
      {/* Título */}
      <header className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>CARRITO</h1>
      </header>
      {/* Contenido principal */}
      <div className={styles.cartContent}>
        {/* Tabla de productos */}
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
                <tr key={item.id} className={styles.productRow}>
                  <td className={styles.productInfoCell}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.productImg}
                    />
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>{item.name}</div>
                      <div className={styles.productCategory}>
                        {item.category}
                      </div>
                      <div className={styles.productBrand}>{item.brand}</div>
                    </div>
                  </td>
                  <td className={styles.productPrice}>
                    ${item.price.toLocaleString("es-AR")}
                  </td>
                  <td className={styles.productQtyCell}>
                    <button
                      onClick={() => handleQuantity(item.id, -1)}
                      className={styles.qtyBtn}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity(item.id, 1)}
                      className={styles.qtyBtn}
                    >
                      +
                    </button>
                  </td>
                  <td className={styles.productSubtotal}>
                    ${(item.price * item.quantity).toLocaleString("es-AR")}
                  </td>
                  <td className={styles.productRemoveCell}>
                    <button
                      onClick={() => handleRemove(item.id)}
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
          <button className={styles.checkoutBtn}>
            <span style={{ fontSize: 18 }}>🛒</span> FINALIZAR COMPRA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
