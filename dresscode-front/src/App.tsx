import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
const EditarProducto = React.lazy(() =>
	import("./pages/admin/Productos/EditarProductos/EditarProducto").then(
		(m) => ({ default: m.EditarProducto }),
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
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

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
					<Suspense fallback={<Loader />}>
						<Routes>
							{/* Rutas públicas principales */}
							<Route path="/" element={<Home />} />
							<Route path="/product/:id" element={<ProductDetails />} />
							<Route path="/catalog" element={<Catalog />} />
							<Route
								path="/catalog/calzados"
								element={<Catalog filter="CALZADOS" />}
							/>
							<Route path="/catalog/ropa" element={<Catalog filter="ROPA" />} />
							<Route
								path="/catalog/ofertas"
								element={<Catalog filter="OFERTAS" />}
							/>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							{/* Rutas privadas para usuarios logueados */}
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

							{/* Rutas de administración protegidas */}
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
								path="/admin/edit-product"
								element={
									<AdminRoute>
										<EditarProducto />
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

							{/* Ruta 404 Not Found */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>
				<footer role="contentinfo">
					<Footer />
				</footer>
			</Router>
		</HelmetContextProvider>
	);
}

export default App;
