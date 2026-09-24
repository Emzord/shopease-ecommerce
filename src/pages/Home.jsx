import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProducts,
  getCategories,
} from "../services/productApi";

import ProductGrid from "../components/ProductGrid";

import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function Home() {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        setError("");

        const productData = await getProducts(8, 0);
        const categoryData = await getCategories();

        setFeaturedProducts(productData.products);
        setCategories(categoryData.slice(0, 6));

      } catch (error) {
        setError(error.message);

      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);


  function handleSearch(event) {
    event.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(searchTerm)}`
    );
  }


  function handleCategoryClick(category) {
    navigate(`/products?category=${category.slug}`);
  }


  return (
    <main className="home-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-small-text">
            SHOP SMARTER
          </p>

          <h1>
            Find products you'll love.
          </h1>

          <p className="hero-description">
            Discover great products across different
            categories, all in one place.
          </p>


          <form
            className="hero-search"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <button type="submit">
              Search
            </button>
          </form>

        </div>

      </section>


      {/* CATEGORIES */}

      <section className="home-section">

        <div className="section-heading">
          <div>
            <p className="section-label">
              CATEGORIES
            </p>

            <h2>Shop by Category</h2>
          </div>
        </div>


        <div className="category-grid">

          {categories.map((category) => (
            <button
              key={category.slug}
              className="category-card"
              onClick={() =>
                handleCategoryClick(category)
              }
            >
              {category.name}
            </button>
          ))}

        </div>

      </section>


      {/* FEATURED PRODUCTS */}

      <section className="home-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              OUR COLLECTION
            </p>

            <h2>Featured Products</h2>
          </div>


          <button
            className="view-all-btn"
            onClick={() =>
              navigate("/products")
            }
          >
            View All Products
          </button>

        </div>


       {loading && (
  <LoadingState message="Loading featured products..." />
)}


        {error && (
  <ErrorState message={error} />
)}


        {!loading &&
          !error &&
          featuredProducts.length > 0 && (
            <ProductGrid
              products={featuredProducts}
            />
          )}

      </section>

    </main>
  );
}

export default Home;