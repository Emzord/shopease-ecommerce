import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/productApi";
import QuantitySelector from "../components/QuantitySelector";
import { useCart } from "../context/CartContext";

function ProductDetails() { 
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();


  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const productData = await getProductById(id);

        setProduct(productData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);


  if (loading) {
    return <p>Loading product...</p>;
  }


  if (error) {
    return <p>{error}</p>;
  }


  if (!product) {
    return <p>Product not found.</p>;
  }


  return (
    <main className="product-details-page">

      <div className="product-details-container">

        {/* PRODUCT IMAGE */}

        <div className="product-details-image">
          <img
            src={product.images[0]}
            alt={product.title}
          />
        </div>


        {/* PRODUCT INFORMATION */}

        <div className="product-details-info">

          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.title}</h1>

          <p className="details-description">
            {product.description}
          </p>


          <div className="details-rating">
            ⭐ {product.rating}
          </div>


          <div className="details-price">
            ${product.price}
          </div>


          <p className="details-discount">
            Discount: {product.discountPercentage}%
          </p>


          <p className="details-stock">
            {product.stock > 0
              ? `${product.stock} items in stock`
              : "Out of stock"}
          </p>


          <div className="quantity-section">

            <p>Quantity:</p>

            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              stock={product.stock}
            />

          </div>


          <button
  className="add-to-cart-btn"
  onClick={() => addToCart(product, quantity)}
  disabled={product.stock === 0}
>
  Add to Cart
</button>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;