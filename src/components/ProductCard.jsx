import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
      </Link>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <Link
          to={`/products/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        <div className="product-bottom">
          <p className="product-price">${product.price}</p>
          <p className="product-rating">⭐ {product.rating}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;