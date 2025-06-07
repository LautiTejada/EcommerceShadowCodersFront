import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  const [username, setUsername] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [location]); // <-- se actualiza cada vez que cambia la ruta

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <div className={styles.logoContainer}>
          <Button color="inherit" component={Link} to="/">
            <img src="/public/assets/logo-dresscode.png" alt="" />
          </Button>
        </div>
        <div className={styles.buttonsContainer}>
          <Button color="inherit" component={Link} to="/cart">
            <ShoppingCartIcon />
          </Button>
          {username ? (
            <Button color="inherit" component={Link} to="/profile">
              <span>{username}</span>
              <AccountCircleIcon />
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              LOGIN / REGISTER
              <AccountCircleIcon />
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
