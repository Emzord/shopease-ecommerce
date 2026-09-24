function QuantitySelector({ quantity, setQuantity, stock }) {
  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function increaseQuantity() {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  }

  return (
    <div className="quantity-selector">
      <button onClick={decreaseQuantity}>-</button>

      <span>{quantity}</span>

      <button onClick={increaseQuantity}>+</button>
    </div>
  );
}

export default QuantitySelector;