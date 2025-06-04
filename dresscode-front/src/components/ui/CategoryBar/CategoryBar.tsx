import { AppBar, Toolbar, Button, Box } from "@mui/material";
import styles from "./CategoryBar.module.css";
import { Link } from "react-router-dom";

export const CategoryBar = () => {
  return (
    <AppBar
      className={styles.containerCategories}
      position="static"
      sx={{ backgroundColor: "#fff", boxShadow: "none" }}
    >
      <Toolbar className={styles.toolbar}>
        <Box className={styles.containerButtons}>
          <Link to="/catalog" style={{ textDecoration: "none" }}> 
            <Button className={styles.buttons}>
              CATALOGO
            </Button>
          </Link>
          <Button className={styles.buttons}>
            OFERTAS
          </Button>
          <Button className={styles.buttons}>
            CALZADO
          </Button>
          <Button className={styles.buttons}>
            ROPA
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
