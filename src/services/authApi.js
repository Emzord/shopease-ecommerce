const BASE_URL = "https://dummyjson.com";


export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      password,
    }),
  });


  if (!response.ok) {
    throw new Error("Invalid username or password");
  }


  const data = await response.json();

  return data;
}


export async function getCurrentUser(accessToken) {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });


  if (!response.ok) {
    throw new Error("Failed to get user profile");
  }


  const data = await response.json();

  return data;
}