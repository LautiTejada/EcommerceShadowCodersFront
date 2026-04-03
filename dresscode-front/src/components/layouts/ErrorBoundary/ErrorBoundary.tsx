import React from "react";
import { Navigate } from "react-router-dom";

interface State {
	hasError: boolean;
}

/**
 * Captura errores de render/lazy en cualquier componente hijo.
 * Ante un error redirige automáticamente a "/" para evitar pantalla en blanco.
 */
class ErrorBoundary extends React.Component<
	{ children: React.ReactNode },
	State
> {
	state: State = { hasError: false };

	static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.error("[ErrorBoundary] Error capturado:", error, info);
	}

	render() {
		if (this.state.hasError) {
			return <Navigate to="/" replace />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
