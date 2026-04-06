import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from "react-router-dom";
import ErrorBoundary from "./components/layouts/ErrorBoundary/ErrorBoundary";

// Wrapper interno al Router: remonta ErrorBoundary en cada cambio de ruta,
// reiniciando hasError y evitando que la pantalla quede en blanco.
function RouteErrorBoundary({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	return <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>;
}
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/Home/Home"));
const Catalog = React.lazy(() =>
	import("./pages/Catalog/Catalog").then((m) => ({ default: m.Catalog })),
);
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));

import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import { ProductDetails } from "./components/ui/ProductDetails/ProductDetails";
import Loader from "./components/ui/Loader/Loader";
import { useEffect } from "react";
import { Toaster } from "sileo";
import { useUsuarioStore } from "./store/userStore";
import PrivateRoute from "./components/layouts/PrivateRoute/PrivateRoute";
import { HelmetContextProvider } from "./components/layouts/HelmetContextProvider";
// NotFound eliminado: la ruta * ahora redirige a Home con ErrorBoundary

function App() {
	const inicializarUsuario = useUsuarioStore((s: any) => s.inicializarUsuario);

	useEffect(() => {
		inicializarUsuario();
	}, []);

	return (
		<HelmetContextProvider>
			<Toaster />
			<Router>
				<header role="banner">
					<Header />
				</header>
				<main role="main" tabIndex={-1} id="main-content">
					<RouteErrorBoundary>
						<Suspense fallback={<Loader />}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/product/:id" element={<ProductDetails />} />
								<Route path="/catalog" element={<Catalog />} />
								<Route
									path="/catalog/calzados"
									element={<Catalog filter="CALZADOS" />}
								/>
								<Route
									path="/catalog/ropa"
									element={<Catalog filter="ROPA" />}
								/>
								<Route
									path="/catalog/ofertas"
									element={<Catalog filter="OFERTAS" />}
								/>
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />

								<Route
									path="/cart"
									element={
										<PrivateRoute>
											<Cart />
										</PrivateRoute>
									}
								/>
								<Route
									path="/profile"
									element={
										<PrivateRoute>
											<Profile />
										</PrivateRoute>
									}
								/>

								<Route path="*" element={<Navigate to="/" replace />} />
							</Routes>
						</Suspense>
					</RouteErrorBoundary>
				</main>
				<footer role="contentinfo">
					<Footer />
				</footer>
			</Router>
		</HelmetContextProvider>
	);
}

export default App;
