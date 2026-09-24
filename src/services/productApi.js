const BASE_URL = "https://dummyjson.com";

export async function getProducts(limit = 12, skip = 0) {
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return data;
}


export async function searchProducts(query, limit = 12, skip = 0) {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  const data = await response.json();

  return data;
}


export async function getProductsByCategory(
  category,
  limit = 12,
  skip = 0
) {
  const response = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  const data = await response.json();

  return data;
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  const data = await response.json();

  return data;
}