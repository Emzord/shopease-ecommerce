import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const {
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="cart-item">

      <Link to={`/products/${item.id}`}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="cart-item-image"
        />
      </Link>


      <div className="cart-item-info">

        <Link
          to={`/products/${item.id}`}
          className="cart-item-title"
        >
          {item.title}
        </Link>

        <p>${item.price}</p>


        <div className="cart-quantity">

          <button
            onClick={() =>
              updateQuantity(
                item.id,
                item.quantity - 1
              )
            }
            disabled={item.quantity === 1}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              updateQuantity(
                item.id,
                item.quantity + 1
              )
            }
            disabled={item.quantity >= item.stock}
          >
            +
          </button>

        </div>


        <button
          className="remove-item-btn"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>

      </div>


      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

    </div>
  );
}

export default CartItem;