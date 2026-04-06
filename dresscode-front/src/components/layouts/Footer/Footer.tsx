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
					py: 1,
					px: 2,
					borderTop: "1px",
					borderColor: "black",
				}}>
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item xs={12} md={4} sx={{ mb: { xs: 0.5, md: 0 } }}>
						<Box
							sx={{ textAlign: { xs: "center", md: "left" }, pl: { md: 2 } }}>
							<Typography
								variant="caption"
								sx={{ mb: 0.25, display: "block", fontSize: "0.65rem" }}>
								MENDOZA - ARGENTINA.
							</Typography>
							<Typography
								variant="caption"
								sx={{ mb: 0.25, display: "block", fontSize: "0.65rem" }}>
								SHADOWCODERS ©
							</Typography>
							<Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
								2025
							</Typography>
						</Box>
					</Grid>

					<Grid
						item
						xs={12}
						md={4}
						sx={{ textAlign: "center", mb: { xs: 0.5, md: 0 } }}>
						<img
							src="/public/assets/logo-dresscode.png"
							alt="DRESSCODE Logo"
							loading="lazy"
							style={{ height: 28, objectFit: "contain" }}
						/>
					</Grid>

					<Grid item xs={12} md={4}>
						<Box
							sx={{
								display: "flex",
								justifyContent: { xs: "center", md: "flex-end" },
								gap: 1,
								pr: { md: 2 },
							}}>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									color: "#fff",
									display: "flex",
									alignItems: "center",
								}}>
								<InstagramIcon sx={{ fontSize: 18 }} />
							</a>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									color: "#fff",
									display: "flex",
									alignItems: "center",
								}}>
								<FacebookIcon sx={{ fontSize: 18 }} />
							</a>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</footer>
	);
};

export default Footer;
