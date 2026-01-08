# Fetch API + React Data Fetching

## 1) Fetch Basics (Plain JavaScript)

### What is fetch and when we use it?

Fetch is a built-in JavaScript function for making network requests to servers. We use it to get or send data from/to APIs.

### Request + Response

- **Request**: The object sent to the server.
- **Response**: The object received from the server after sending a request.

### JSON: response.json()

`response.json()` is used to parse the response body as JSON.

### Common Mistakes

- Forgetting `await`: Fetch returns a promise, so you need to use `await` or `.then()`.
- Not checking `response.ok`: Always check if the request was successful by verifying `response.ok`.

### Simple GET Example in Plain JS

```javascript
async function fetchData() {
  try {
    const response = await fetch("http://localhost:5000/api/products");

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data); // Array of products
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

fetchData();
```

### Simple POST Example in Plain JS

```javascript
async function postData() {
  try {
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New Product",
        price: 19.99,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data); // Created product
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

postData();
```

## 2) React: Fetching a List of Products (GET)

### Complete React Component Example

```javascript
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (products.length === 0) return <p>No products found</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
```

### Explanation

- **State**: `useState` for products, loading, and error.
- **Effect**: `useEffect` to fetch data when the component mounts.
- **Conditional Rendering**: Show different messages based on loading state, error, or empty product list.

## 3) React: POST Request to Create a Product

### Complete React Component Example

```javascript
import React, { useState } from "react";

const API_URL = "http://localhost:5000/api/products";

function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      setName("");
      setPrice("");
      setSuccessMessage("Product created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        required
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        step="0.01"
        min="0"
        required
      />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
```

### Explanation

- **State**: `useState` for form values, loading, error, and success message.
- **Form Handling**: Controlled inputs with state updates on change.
- **POST Request**: Uses fetch with method 'POST' and JSON headers.
- **Conditional Rendering**: Shows loading, error, or success messages accordingly.

## 4) Key Takeaways

- **GET vs POST**: GET retrieves data, while POST sends data to create/update resources.
- **State + Effect**: Use `useState` for managing component state and `useEffect` for side effects like fetching data.
- **Conditional Rendering**: Render different UI elements based on the current state (loading, error, success).
- **Loading & Empty States**: Improve user experience by showing loading indicators and handling empty states.
- **Side Effects in useEffect**: Place network requests and other side effects inside `useEffect` to keep them separate from rendering logic.

By understanding these concepts and practicing with the examples provided, you'll be able to fetch and manipulate data effectively in your React applications using Fetch API.
