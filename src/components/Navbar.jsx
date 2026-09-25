import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { cartCount } = useCart();
  const { user } = useAuth();

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
        {user ? (
  <>
    <span className="logged-in-user">
      Hi, {user.firstName}
    </span>
    <Link to="/profile">Profile</Link>
  </>
) : (
  <Link to="/login">Login</Link>
)}
       <Link to="/cart">
  Cart ({cartCount})
</Link>
      </div>
    </nav>
  );
}

export default Navbar;