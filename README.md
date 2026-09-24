# ShopEase - E-Commerce Frontend

ShopEase is a responsive e-commerce frontend application built with React and JavaScript.

The application uses the DummyJSON REST API to allow users to browse products, search for products, filter products by category, view product details, manage a shopping cart, log in, and view an authenticated user profile.

## Features

- Browse products
- Search for products
- Filter products by category
- Product pagination
- View detailed product information
- View multiple product images
- Select product quantity
- Add products to cart
- Update cart quantities
- Remove products from cart
- View cart subtotal, discount, and total
- User login and authentication
- Authenticated user profile
- Authentication persistence using localStorage
- Loading, error, and empty states
- Responsive design for desktop, tablet, and mobile devices

## Technologies Used

- React
- JavaScript
- Vite
- React Router
- CSS
- Fetch API
- DummyJSON REST API
- Git and GitHub

## API

This project uses the DummyJSON API.

Base URL:

```text
https://dummyjson.com
```

### Product Endpoints

```text
GET /products
GET /products/{id}
GET /products/search?q={query}
GET /products/categories
GET /products/category/{category}
GET /products?limit={number}&skip={number}
```

### Authentication Endpoints

```text
POST /auth/login
GET /auth/me
```

Test login credentials:

```text
Username: emilys
Password: emilyspass
```

### Cart Endpoints

```text
GET /carts/{id}
POST /carts/add
PUT /carts/{id}
DELETE /carts/{id}
```

## Pages

The application contains the following pages:

- Home
- Products
- Product Details
- Login
- Cart
- Profile

## Installation and Setup

To run the project locally:

1. Clone the repository.

```bash
git clone https://github.com/Emzord/shopease-ecommerce.git
```

2. Enter the project folder.

```bash
cd shopease-ecommerce
```

3. Install the dependencies.

```bash
npm install
```

4. Start the development server.

```bash
npm run dev
```

5. Open the local URL displayed by Vite in your browser.

## Production Build

To create a production build:

```bash
npm run build
```

The production files will be generated inside the `dist` folder.

## Assumptions

- DummyJSON is used as the backend API for this frontend project.
- The provided DummyJSON test account is used to demonstrate authentication.
- Authentication tokens are stored in localStorage so the authenticated session can be restored after a page refresh.
- Cart operations use the DummyJSON cart endpoints while the visible cart is managed in React state for the frontend experience.

## Known Limitations

- DummyJSON is a mock REST API, so cart changes are simulated and are not permanently stored on a real backend.
- Cart contents are not persisted after a full page refresh.
- A real payment or checkout API is not provided, so the Checkout button only displays a demo message.
- This project focuses on frontend functionality and API integration rather than a production e-commerce backend.

## Author

Vincent
