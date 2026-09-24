const BASE_URL = "https://dummyjson.com";


export async function getCart(cartId) {
  const response = await fetch(
    `${BASE_URL}/carts/${cartId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
}


export async function addCart(userId, products) {
  const response = await fetch(
    `${BASE_URL}/carts/add`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId,
        products,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add cart");
  }

  return response.json();
}


export async function updateCart(cartId, products) {
  const response = await fetch(
    `${BASE_URL}/carts/${cartId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        merge: true,
        products,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update cart");
  }

  return response.json();
}


export async function deleteCart(cartId) {
  const response = await fetch(
    `${BASE_URL}/carts/${cartId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete cart");
  }

  return response.json();
}