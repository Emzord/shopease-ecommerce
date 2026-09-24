import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";


function App() {
  return (
    <AuthProvider>

      <CartProvider>

        <BrowserRouter>

          <Navbar />

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

          </Routes>

        </BrowserRouter>

      </CartProvider>

    </AuthProvider>
  );
}

export default App;