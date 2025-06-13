import { AppBar, Toolbar, Button, Box } from "@mui/material";
import styles from "./CategoryBar.module.css";
import { Link, useNavigate } from "react-router-dom";

export const CategoryBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      className={styles.containerCategories}
      position="static"
      sx={{ backgroundColor: "#fff", boxShadow: "none" }}
    >
      <Toolbar className={styles.toolbar}>
        <Box className={styles.containerButtons}>
          <Link to="/catalog" style={{ textDecoration: "none" }}>
            <Button className={styles.buttons}>CATALOGO</Button>
          </Link>
          <Button
            className={styles.buttons}
            onClick={() => navigate("/catalog/ofertas")}
          >
            OFERTAS
          </Button>
          <Button
            className={styles.buttons}
            onClick={() => navigate("/catalog/calzados")}
          >
            CALZADO
          </Button>
          <Button
            className={styles.buttons}
            onClick={() => navigate("/catalog/ropa")}
          >
            ROPA
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
