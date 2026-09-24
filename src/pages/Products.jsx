import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getProducts,
  getCategories,
  searchProducts,
  getProductsByCategory,
} from "../services/productApi";

import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function Products() {

  const [searchParams] = useSearchParams();

const searchFromUrl =
  searchParams.get("search") || "";

const categoryFromUrl =
    searchParams.get("category") || "all";
  
  
  // =========================
  // STATES
  // =========================

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 const [searchTerm, setSearchTerm] =
  useState(searchFromUrl);

const [selectedCategory, setSelectedCategory] =
  useState(categoryFromUrl);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const productsPerPage = 12;


  // =========================
  // LOAD CATEGORIES
  // =========================

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch (error) {
        setError(error.message);
      }
    }

    loadCategories();
  }, []);


  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const skip = (currentPage - 1) * productsPerPage;

        let productData;

        if (searchTerm.trim() !== "") {
          productData = await searchProducts(
            searchTerm,
            productsPerPage,
            skip
          );
        } else if (selectedCategory !== "all") {
          productData = await getProductsByCategory(
            selectedCategory,
            productsPerPage,
            skip
          );
        } else {
          productData = await getProducts(
            productsPerPage,
            skip
          );
        }

        setProducts(productData.products);
        setTotalProducts(productData.total);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();

  }, [currentPage, searchTerm, selectedCategory]);


  // =========================
  // RESET PAGE
  // =========================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);


  // =========================
  // TOTAL PAGES
  // =========================

  const totalPages = Math.ceil(
    totalProducts / productsPerPage
  );


  // =========================
  // LOADING
  // =========================

  if (loading) {
  return <LoadingState message="Loading products..." />;
}


  // =========================
  // ERROR
  // =========================

  if (error) {
  return <ErrorState message={error} />;
}


  // =========================
  // PAGE
  // =========================

  return (
    <main className="products-page">

      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover products you'll love.</p>
      </div>


      <div className="product-controls">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

      </div>


      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState />
      )}


      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

    </main>
  );
}

export default Products;