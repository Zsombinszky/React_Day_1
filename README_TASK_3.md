# Task 3: Using an API Key, `.env`, and Fetch (Weather Page)

## Goal

In this task, you will learn how to:

- create a new page in a React app
- generate and use an API key
- store secrets in a `.env` file
- use `useState` and `useEffect`
- fetch data from an external API
- handle loading states
- display fetched data conditionally

We will use the **OpenWeatherMap API**.

---

## 1) Create a new Weather page

Inside the `src/pages` folder, create a new file:

```
src/pages/Weather.jsx
```

Add this initial content:

```jsx
function Weather() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Weather</h1>
      <p>This page will show weather data from an external API.</p>
    </>
  );
}

export default Weather;
```

---

## 2) Add the Weather page to the router

Open:

```
src/App.jsx
```

### Import the page:

```jsx
import Weather from "./pages/Weather";
```

### Add a new route inside the layout:

```jsx
<Route path="/weather" element={<Weather />} />
```

Your routes inside the layout should now look like this:

```jsx
<Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/editor" element={<Editor />} />
  <Route path="/weather" element={<Weather />} />
</Route>
```

---

## 3) Add Weather link to the Navbar

Open:

```
src/layout/MainLayout.jsx
```

Add a new link:

```jsx
<Link to="/weather" className="font-medium text-slate-800 hover:text-blue-600">
  Weather
</Link>
```

Now the Weather page is reachable from the navbar.

---

## 4) Create an OpenWeatherMap API key

1. Go to **[https://openweathermap.org](https://openweathermap.org)**
2. Create a free account
3. Go to **API Keys**
4. Generate a new API key

⚠️ Important:

> API keys are **secret** and must NOT be committed to GitHub.

---

## 5) Create a `.env` file

In the **root of the project** (same level as `package.json`), create a file called:

```
.env
```

Add:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

### Important rules (Vite):

- Environment variables **must start with `VITE_`**
- Restart the dev server after creating or changing `.env`

```bash
npm run dev
```

---

## 6) Create `.env.example`

To show other developers which variables are required, create:

```
.env.example
```

Add:

```env
VITE_WEATHER_API_KEY=
```

This file **can be committed**, but `.env` should NOT be.

---

## 7) Using the API key in React

Open:

```
src/pages/Weather.jsx
```

Import hooks at the top:

```jsx
import { useEffect, useState } from "react";
```

---

## 8) Add state and fetch logic

Replace the content of `Weather.jsx` with the following:

```jsx
import { useEffect, useState } from "react";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `${API_URL}?q=London&units=metric&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Weather</h1>

      {loading && <p>Loading weather data...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {weather && (
        <div className="bg-white rounded-xl shadow p-4 max-w-sm">
          <h2 className="text-xl font-semibold">{weather.name}</h2>

          <p className="text-slate-600">{weather.weather[0].description}</p>

          <p className="text-2xl font-bold mt-2">{weather.main.temp} °C</p>
        </div>
      )}
    </>
  );
}

export default Weather;
```

---

## 9) What is happening here?

- `useState` stores:

  - weather data
  - loading state
  - error state

- `useEffect` runs **once** when the page loads
- `fetch` calls the external API
- the API key is read from:

  ```js
  import.meta.env.VITE_WEATHER_API_KEY;
  ```

- conditional rendering shows:

  - loading message
  - error message
  - weather data

---

## 10) Test the Weather page

1. Restart the dev server
2. Open `/weather`
3. You should see weather data for **London**

If not:

- check the API key
- check `.env` name
- check that the server was restarted

---

## Key Takeaways

- API keys must be stored in `.env`
- `.env` files should not be committed
- `.env.example` documents required variables
- `useEffect` is used for data fetching
- loading and error states are part of real apps
- pages can fetch their own data

---

# 11) Fetch Weather Data Based on User Input (City Search)

In this step, we will allow users to:

- type a city name into an input
- click a button
- fetch weather data for that city
- see loading and error states

We will continue using the **OpenWeatherMap API**.

---

## 11.1 Add a city input (controlled input)

Open:

```
src/pages/Weather.jsx
```

We will add a new piece of state for the city name.

At the top of the component, add:

```jsx
const [city, setCity] = useState("");
```

Now the state section should look like this:

```jsx
const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

---

## 11.2 Create a function to fetch weather by city

Inside the `Weather` component, add this function:

```jsx
const fetchWeather = async () => {
  if (!city) return;

  setLoading(true);
  setError(null);
  setWeather(null);

  try {
    const response = await fetch(
      `${API_URL}?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    setWeather(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### Important notes:

- We reset `weather` before fetching new data
- We handle loading and error states manually
- If the city is empty, we do nothing

---

## 11.3 Add input and button to the UI

Now add this JSX **above** the weather result section:

```jsx
<div className="mb-6 flex gap-3">
  <input
    type="text"
    placeholder="Enter city name"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="border rounded px-3 py-2 w-full max-w-xs"
  />

  <button
    onClick={fetchWeather}
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    Search
  </button>
</div>
```

### What this teaches:

- `value` + `onChange` → controlled input
- React controls the input state
- Button click triggers logic

---

## 11.4 (Optional but recommended) Fetch on Enter key

You can also allow searching by pressing **Enter**.

Update the input like this:

```jsx
<input
  type="text"
  placeholder="Enter city name"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  }}
  className="border rounded px-3 py-2 w-full max-w-xs"
/>
```

---

## 11.5 Final Weather.jsx (complete example)

For clarity, here is the **complete component**:

```jsx
import { useState } from "react";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `${API_URL}?q=${city}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Weather</h1>

      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather();
            }
          }}
          className="border rounded px-3 py-2 w-full max-w-xs"
        />

        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading weather data...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {weather && (
        <div className="bg-white rounded-xl shadow p-4 max-w-sm">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p className="text-slate-600 capitalize">
            {weather.weather[0].description}
          </p>
          <p className="text-2xl font-bold mt-2">{weather.main.temp} °C</p>
        </div>
      )}
    </>
  );
}

export default Weather;
```

---

## 11.6 Disable the Search Button While Loading

When a request is in progress, we should prevent users from clicking the button again.

This avoids:

- duplicate API requests
- confusing UI behavior
- unnecessary API usage

---

## 11.6.1 Disable the button using state

We already have a `loading` state.
We can use it to disable the button.

Update the button in `Weather.jsx` like this:

```jsx
<button
  onClick={fetchWeather}
  disabled={loading}
  className={`px-4 py-2 rounded text-white transition-colors
    ${
      loading
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
>
  {loading ? "Loading..." : "Search"}
</button>
```

---

## 11.6.2 What is happening here?

Explain this clearly to students:

- `disabled={loading}`

  - when `loading === true`, the button cannot be clicked

- the button text changes:

  - `"Search"` → `"Loading..."`

- Tailwind classes change based on state:

  - disabled look
  - no hover effect
  - `cursor-not-allowed`

This is **conditional rendering + conditional styling**.

---

## 11.6.3 Why this is important

This teaches students that:

- UI should reflect application state
- state is not only for data, but also for UX
- small details make apps feel professional

---

## Final result (UX behavior)

- User types a city
- Clicks **Search**
- Button becomes disabled
- Button text changes to **Loading...**
- When data arrives:

  - button becomes active again
  - weather data appears

This is exactly how real-world apps behave.

---

## Key Takeaways

- Inputs in React are usually **controlled**
- State changes trigger UI updates
- Fetching data can depend on user interaction
- Loading and error states are essential
- This pattern appears in real-world React apps everywhere

---

# Task 3 Bonus: Products Fetch + Dynamic Route with `useParams`

## Goal

- Fetch product list from Fake Store API
- Render the list with `ProductGrid`
- Add a dynamic product details page: `/products/:id`
- Navigate from each ProductCard to its details page

We will use this API:

- List: `https://fakestoreapi.com/products`
- Single product: `https://fakestoreapi.com/products/:id`

---

## 1) Update `Products.jsx` to fetch products from the API

Open:

```
src/pages/Products.jsx
```

Replace it with:

```jsx
import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";

const API_URL = "https://fakestoreapi.com/products";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Products</h1>

      {loading && <p>Loading products...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      {!loading && !error && products.length > 0 && (
        <ProductGrid products={products} />
      )}
    </>
  );
}

export default Products;
```

✅ Now the Products page fetches real data and passes it to `ProductGrid`.

---

## 2) Create a Product Details page

Create a new file:

```
src/pages/ProductDetails.jsx
```

Add:

```jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://fakestoreapi.com/products";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="mb-6">
        <Link to="/products" className="text-blue-600 hover:underline">
          ← Back to products
        </Link>
      </div>

      {loading && <p>Loading product details...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {product && (
        <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
          <div className="grid gap-6 md:grid-cols-2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-h-80 object-contain bg-slate-50 rounded-lg p-4"
            />

            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {product.title}
              </h1>

              <p className="text-slate-600 mb-3">{product.category}</p>

              <p className="text-2xl font-bold text-blue-600 mb-4">
                ${product.price}
              </p>

              <p className="text-slate-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
```

✅ This page reads the `id` from the URL using `useParams()`, then fetches one product.

---

## 3) Add the dynamic route to `App.jsx`

Open:

```
src/App.jsx
```

Import the details page:

```jsx
import ProductDetails from "./pages/ProductDetails";
```

Then add this route **inside the layout routes**:

```jsx
<Route path="/products/:id" element={<ProductDetails />} />
```

Your layout route section should include:

```jsx
<Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetails />} />
  <Route path="/editor" element={<Editor />} />
  <Route path="/weather" element={<Weather />} />
</Route>
```

---

## 4) Add a “Check details” button to `ProductCard`

Open:

```
src/components/ProductCard.jsx
```

We will add navigation to the details page.

### Option A (recommended): Use `<Link>`

At the top:

```jsx
import { Link } from "react-router-dom";
```

Then update the component like this (full version example):

```jsx
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain bg-slate-50 rounded-lg mb-3 p-3"
      />

      <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
        {product.title}
      </h3>

      <p className="text-slate-600 text-sm mt-1">{product.category}</p>

      <div className="flex items-center justify-between mt-4">
        <p className="text-blue-600 font-bold">${product.price}</p>

        <Link
          to={`/products/${product.id}`}
          className="px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm"
        >
          Check details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
```

✅ Now each card can navigate to `/products/1`, `/products/2`, etc.

---

## 5) Test everything

1. Go to `/products`
2. Wait for products to load
3. Click **Check details**
4. You should land on `/products/:id`
5. You should see loading state, then product details
6. Click “Back to products”

---

## Key Takeaways

- `useParams()` reads dynamic values from the URL (like `id`)
- a dynamic route looks like: `/products/:id`
- we can fetch data based on URL params
- this pattern is used in real apps for:

  - product details
  - user profiles
  - blog posts
  - dashboards

---
