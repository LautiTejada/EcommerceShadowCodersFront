import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <div className={styles.logoContainer}>
          <Button color="inherit" component={Link} to="/">
            <img src="/src/assets/logo-dresscode.png" alt="" />
          </Button>
        </div>
        <div className={styles.buttonsContainer}>
          <Button color="inherit" component={Link} to="/catalog">
            Catálogo
          </Button>
          <div className={styles.searchContainer}>
            <input type="text" className={styles.searchInput} />
          </div>
          <Button color="inherit" component={Link} to="/cart">
            <ShoppingCartIcon />
          </Button>
          <div className={styles.acountButton}>
            <Button color="inherit" component={Link} to="/register">
              LOGIN / REGISTER
              <AccountCircleIcon />
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
