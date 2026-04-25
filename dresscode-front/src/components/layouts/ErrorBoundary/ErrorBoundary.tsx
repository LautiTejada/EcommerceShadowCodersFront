import React from "react";

interface State {
	hasError: boolean;
	errorMessage: string;
}

/**
 * Captura errores de render/lazy en cualquier componente hijo.
 * Muestra el error en consola. Si el error ocurre dentro del panel admin
 * (dentro de Profile) no redirige — solo si ocurre en rutas de nivel superior.
 */
class ErrorBoundary extends React.Component<
	{ children: React.ReactNode },
	State
> {
	state: State = { hasError: false, errorMessage: "" };

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			errorMessage: error?.message ?? "Error desconocido",
		};
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.error("[ErrorBoundary] Error capturado:", error);
		console.error("[ErrorBoundary] Component stack:", info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={{ padding: 40, color: "#810000", textAlign: "center" }}>
					<h2>Algo salió mal</h2>
					<p style={{ fontSize: "0.9rem", color: "#555", marginTop: 8 }}>
						{this.state.errorMessage}
					</p>
					<button
						style={{ marginTop: 20, padding: "8px 20px", cursor: "pointer" }}
						onClick={() => {
							this.setState({ hasError: false, errorMessage: "" });
							window.location.href = "/";
						}}>
						Volver al inicio
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
