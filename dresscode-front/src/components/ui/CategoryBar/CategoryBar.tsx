import { AppBar, Toolbar, Button, Box } from "@mui/material";
import styles from "./CategoryBar.module.css";

const categories = ["Ofertas", "Calzado", "Ropa", "Colecciones"];

const CategoryBar = () => {
  return (
    <AppBar
      className={styles.containerCategories}
      position="static"
      sx={{ backgroundColor: "#fff", boxShadow: "none" }}
    >
      <Toolbar className={styles.toolbar}>
        <Box className={styles.containerButtons}>
          {categories.map((category, index) => (
            <Button key={index} className={styles.buttons}>
              {category}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CategoryBar;
