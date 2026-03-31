import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
	return (
		<footer role="contentinfo">
			<Box
				sx={{
					background: "#1a1a1a",
					color: "#fff",
					py: 4,
					px: 2,
					borderTop: "1px",
					borderColor: "black",
				}}>
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item xs={12} md={4} sx={{ mb: { xs: 2, md: 0 } }}>
						<Box
							sx={{ textAlign: { xs: "center", md: "left" }, pl: { md: 4 } }}>
							<Typography variant="body2" sx={{ mb: 1 }}>
								MENDOZA -<br />
								ARGENTINA.
							</Typography>
							<Typography variant="body2" sx={{ mb: 1 }}>
								SHADOWCODERS ©
							</Typography>
							<Typography variant="body2">2025</Typography>
						</Box>
					</Grid>

					<Grid
						item
						xs={12}
						md={4}
						sx={{ textAlign: "center", mb: { xs: 2, md: 0 } }}>
						<img
							src="/public/assets/logo-dresscode.png"
							alt="DRESSCODE Logo"
							loading="lazy"
							style={{ height: 48, objectFit: "contain" }}
						/>
					</Grid>

					<Grid item xs={12} md={4}>
						<Box
							sx={{
								display: "flex",
								justifyContent: { xs: "center", md: "flex-end" },
								gap: 2,
								pr: { md: 4 },
							}}>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: "#fff" }}>
								<InstagramIcon sx={{ fontSize: 32 }} />
							</a>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: "#fff" }}>
								<FacebookIcon sx={{ fontSize: 32 }} />
							</a>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</footer>
	);
};

export default Footer;
