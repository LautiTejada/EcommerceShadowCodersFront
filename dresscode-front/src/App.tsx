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
const HomeAdmin = React.lazy(() =>
	import("./pages/admin/HomeAdmin/HomeAdmin").then((m) => ({
		default: m.HomeAdmin,
	})),
);
const AgregarProducto = React.lazy(() =>
	import("./pages/admin/Productos/AgregarProductos/AgregarProducto").then(
		(m) => ({ default: m.AgregarProducto }),
	),
);

const StockProducto = React.lazy(() =>
	import("./pages/admin/Productos/StockProducto/StockProducto").then((m) => ({
		default: m.StockProducto,
	})),
);
const AgregarDescuento = React.lazy(() =>
	import("./pages/admin/Descuentos/AgregarDescuento/AgregarDescuento").then(
		(m) => ({ default: m.AgregarDescuento }),
	),
);
const AgregarTiposCategorias = React.lazy(() =>
	import("./pages/admin/TiposCategorias/AgregarTiposCategorias/AgregarTiposCategorias").then(
		(m) => ({ default: m.AgregarTiposCategorias }),
	),
);
const ListaDescuentos = React.lazy(() =>
	import("./pages/admin/Descuentos/ListaDescuentos/ListaDescuentos").then(
		(m) => ({ default: m.ListaDescuentos }),
	),
);
const ListaTiposCategorias = React.lazy(() =>
	import("./pages/admin/TiposCategorias/ListaTiposCategorias/ListaTiposCategorias").then(
		(m) => ({ default: m.ListaTiposCategorias }),
	),
);

import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import { ProductDetails } from "./components/ui/ProductDetails/ProductDetails";
import Loader from "./components/ui/Loader/Loader";
import { useEffect } from "react";
import { Toaster } from "sileo";
import { useUsuarioStore } from "./store/userStore";
import AdminRoute from "./components/admin/AdminRoute/AdminRoute";
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
								<Route
									path="/register"
									element={
										<Register
											handleSubmit={() => {}}
											error={null}
											username={""}
											setUserName={() => {}}
											email={""}
											setEmail={() => {}}
											password={""}
											setPassword={() => {}}
											confirmPassword={""}
											setConfirmPassword={() => {}}
											errors={{}}
											loading={false}
										/>
									}
								/>

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

								<Route
									path="/admin"
									element={
										<AdminRoute>
											<HomeAdmin />
										</AdminRoute>
									}
								/>
								<Route
									path="/admin/add-product"
									element={
										<AdminRoute>
											<AgregarProducto />
										</AdminRoute>
									}
								/>

								<Route
									path="/admin/stock-product"
									element={
										<AdminRoute>
											<StockProducto />
										</AdminRoute>
									}
								/>
								<Route
									path="/admin/add-discount"
									element={
										<AdminRoute>
											<AgregarDescuento />
										</AdminRoute>
									}
								/>
								<Route
									path="/admin/list-discounts"
									element={
										<AdminRoute>
											<ListaDescuentos />
										</AdminRoute>
									}
								/>
								<Route
									path="/admin/add-type-cateogory"
									element={
										<AdminRoute>
											<AgregarTiposCategorias />
										</AdminRoute>
									}
								/>
								<Route
									path="/admin/list-type-cateogory"
									element={
										<AdminRoute>
											<ListaTiposCategorias />
										</AdminRoute>
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
