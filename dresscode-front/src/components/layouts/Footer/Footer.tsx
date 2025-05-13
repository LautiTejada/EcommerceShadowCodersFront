import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ p: 2, textAlign: "center", backgroundColor: "#f5f5f5", mt: 2 }}>
      <Typography variant="body2">
        © 2025 E-commerce - Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;
