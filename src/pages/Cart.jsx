import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";



function Cart() {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [checkoutMessage, setCheckoutMessage] = useState("");


  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  const discount = cartItems.reduce(
    (total, item) => {
      const itemTotal =
        item.price * item.quantity;

      const itemDiscount =
        itemTotal *
        (item.discountPercentage / 100);

      return total + itemDiscount;
    },
    0
  );


  const total = subtotal - discount;


  if (cartItems.length === 0) {
    return (
      <main className="cart-page">

        <div className="empty-cart">
          <h1>Your cart is empty</h1>

          <p>
            Add some products to your cart to see them here.
          </p>

          <Link
            to="/products"
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>
        </div>

      </main>
    );
  }


  return (
    <main className="cart-page">

      <h1>Shopping Cart</h1>


      <div className="cart-container">

        <div className="cart-items">

          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}

        </div>


        <div className="cart-summary">

          <h2>Order Summary</h2>


          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ${subtotal.toFixed(2)}
            </span>
          </div>


          <div className="summary-row">
            <span>Discount</span>

            <span>
              -${discount.toFixed(2)}
            </span>
          </div>


          <div className="summary-row total-row">
            <span>Total</span>

            <span>
              ${total.toFixed(2)}
            </span>
          </div>


         <button
  className="checkout-btn"
  onClick={() =>
    setCheckoutMessage(
      user
        ? "Checkout is not available in this demo."
        : "Please login to proceed with checkout."
    )
  }
>
  Checkout
</button>

{checkoutMessage && (
  <>
    <p className="checkout-message">
      {checkoutMessage}
    </p>

    {!user && (
      <Link
        to="/login"
        state={{ from: "/cart" }}
        className="profile-login-btn"
      >
        Login
      </Link>
    )}
  </>
)}

        </div>

      </div>

    </main>
  );
}

export default Cart;