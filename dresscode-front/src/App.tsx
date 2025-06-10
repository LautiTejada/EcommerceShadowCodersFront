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
import Profile from "./pages/Profile";
import HomeAdmin from "./pages/admin/HomeAdmin/HomeAdmin";

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
        <Route path="/admin" element={<HomeAdmin/>}></Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
