import React from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => (
	<>
		<Helmet>
			<title>Página no encontrada | DressCode</title>
			<meta name="robots" content="noindex, follow" />
		</Helmet>
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "60vh",
				color: "#b00",
			}}>
			<h1 style={{ fontSize: 48, marginBottom: 16 }}>404</h1>
			<h2 style={{ fontWeight: 700, marginBottom: 8 }}>Página no encontrada</h2>
			<p>La ruta que buscas no existe o fue movida.</p>
			<a
				href="/"
				style={{
					color: "#810000",
					marginTop: 24,
					textDecoration: "underline",
				}}>
				Volver al inicio
			</a>
		</div>
	</>
);

export default NotFound;
