import { useCartStore } from "../../../store/cartStore";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./CartIcon.module.css";

export const CartIcon = () => {
  const { cart } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <Link to="/cart" className={styles.cartIconLink}>
      <ShoppingCartIcon style={{ fontSize: 28 }} />
      {totalItems > 0 && (
        <span className={styles.badge}>{totalItems}</span>
      )}
    </Link>
  );
};