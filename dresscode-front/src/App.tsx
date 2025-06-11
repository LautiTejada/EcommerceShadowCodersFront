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
import { EstadoProducto } from "./pages/admin/Productos/EstadoProducto/EstadoProducto";
import { StockProducto } from "./pages/admin/Productos/StockProducto/StockProducto";


function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

      

        <Route path="/admin" element={<HomeAdmin />}/>
        <Route path="/admin/add-product" element= {<AgregarProducto/>}/>
        <Route path="/admin/edit-product" element={<EditarProducto/>}/>
        <Route path="/admin/stock-product" element={<StockProducto/>}/>
        <Route path="/admin/state-product" element={<EstadoProducto/>}/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
