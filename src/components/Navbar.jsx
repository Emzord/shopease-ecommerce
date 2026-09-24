import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


function Navbar() {

  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ShopEase
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>

      <div className="nav-actions">
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
       <Link to="/cart">
  Cart ({cartCount})
</Link>
      </div>
    </nav>
  );
}

export default Navbar;