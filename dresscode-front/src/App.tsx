import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import { ProductDetails } from "./components/ui/ProductDetails/ProductDetails";
import { Catalog } from "./pages/Catalog/Catalog";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import { HomeAdmin } from "./pages/admin/HomeAdmin/HomeAdmin";
import { AgregarProducto } from "./pages/admin/Productos/AgregarProductos/AgregarProducto";
import { EditarProducto } from "./pages/admin/Productos/EditarProductos/EditarProducto";
import { StockProducto } from "./pages/admin/Productos/StockProducto/StockProducto";
import { AgregarDescuento } from "./pages/admin/Descuentos/AgregarDescuento/AgregarDescuento";
import { AgregarTiposCategorias } from "./pages/admin/TiposCategorias/AgregarTiposCategorias/AgregarTiposCategorias";
import { ListaDescuentos } from "./pages/admin/Descuentos/ListaDescuentos/ListaDescuentos";
import { ListaTiposCategorias } from "./pages/admin/TiposCategorias/ListaTiposCategorias/ListaTiposCategorias";
import { useEffect } from "react";
import { useUsuarioStore } from "./store/userStore";

function App() {
	const inicializarUsuario = useUsuarioStore((s: any) => s.inicializarUsuario);

	useEffect(() => {
		inicializarUsuario();
	}, []);

	return (
		<Router>
			<Header />
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
				<Route path="/catalog/ofertas" element={<Catalog filter="OFERTAS" />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/profile" element={<Profile />} />

				{/* Rutas de administración (futuro: proteger con AdminRoute) */}
				<Route path="/admin" element={<HomeAdmin />} />
				<Route path="/admin/add-product" element={<AgregarProducto />} />
				<Route path="/admin/edit-product" element={<EditarProducto />} />
				<Route path="/admin/stock-product" element={<StockProducto />} />
				<Route path="/admin/add-discount" element={<AgregarDescuento />} />
				<Route path="/admin/list-discounts" element={<ListaDescuentos />} />
				<Route
					path="/admin/add-type-cateogory"
					element={<AgregarTiposCategorias />}
				/>
				<Route
					path="/admin/list-type-cateogory"
					element={<ListaTiposCategorias />}
				/>

				{/* Futuro: rutas anidadas, lazy loading, rutas protegidas por rol, manejo de 404 */}
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
