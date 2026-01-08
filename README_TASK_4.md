# Task 4: Product Create Form (POST request from the Editor page)

## Goal

- build a form on the **Editor** page
- use controlled inputs (`useState`)
- send a **POST** request with `fetch`
- handle **loading**, **error**, and **success** UI states
- disable the submit button while loading

We will NOT build the backend yet. The goal is to practice the frontend workflow.

---

## 1) Decide the endpoint

### Option A (fake endpoint, later your Express app will use this)

```js
const API_URL = "http://localhost:5000/api/products";
```

⚠️ This will fail unless a backend is running.

### Option B (recommended for practice today: real test endpoint)

```js
const API_URL = "https://jsonplaceholder.typicode.com/posts";
```

✅ This returns a successful response you can see the full workflow.

> Start with Option B.
> Later, when you learn Express/MongoDB, switch to Option A.

---

## 2) Update the Editor page

Open:

```
src/pages/Editor.jsx
```

Replace its content with this complete version:

```jsx
import { useState } from "react";

// Option B: working practice endpoint (recommended for today)
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Later (when you have a real backend), you can switch to:
// const API_URL = "http://localhost:5000/api/products";

function Editor() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation (beginner-friendly)
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!price || Number(price) <= 0) {
      setError("Price must be a number greater than 0.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const newProduct = {
      title: title.trim(),
      price: Number(price),
      image: image.trim() || "https://picsum.photos/seed/new-product/600/400",
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to create product.");
      }

      const data = await res.json();

      setSuccess(`Product created! (server id: ${data.id ?? "N/A"})`);

      // clear form
      setTitle("");
      setPrice("");
      setImage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Editor</h1>
      <p className="text-slate-600 mb-6">
        Later, this page will upload products to our own backend. For now, we
        practice sending a POST request.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 max-w-lg"
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Create a Product
        </h2>

        {/* Title */}
        <label className="block mb-2 font-medium text-slate-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Blue Hoodie"
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        {/* Price */}
        <label className="block mb-2 font-medium text-slate-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. 39.99"
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        {/* Image URL */}
        <label className="block mb-2 font-medium text-slate-700">
          Image URL (optional)
        </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        {/* Messages */}
        {error && <p className="text-red-600 mb-3">{error}</p>}

        {success && <p className="text-green-600 mb-3">{success}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-lg text-white transition-colors
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </>
  );
}

export default Editor;
```

---

## 3) Test the form

1. Go to the **Editor** page: `/editor`
2. Fill in:

   - Title: `Test Product`
   - Price: `10`
   - Image: leave empty

3. Click **Create Product**
4. You should see:

   - button becomes disabled + “Creating…”
   - success message appears

✅ Students now practiced the full POST flow.

---

## 4.1 Redirect to Products page after successful POST

After a product is successfully created, it makes sense to:

- take the user back to the **Products** page
- show them where products are listed

We will use **programmatic navigation** with `useNavigate`.

---

## 4.1.1 Import `useNavigate`

Open:

```
src/pages/Editor.jsx
```

At the top, update the imports:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
```

---

## 4.1.2 Initialize the navigator

Inside the `Editor` component, add:

```jsx
const navigate = useNavigate();
```

Place it near your `useState` declarations.

---

## 4.1.3 Navigate after successful POST

Inside `handleSubmit`, **after the successful response**, add navigation.

Find this part:

```js
const data = await res.json();

setSuccess(`Product created! (server id: ${data.id ?? "N/A"})`);

// clear form
setTitle("");
setPrice("");
setImage("");
```

Replace it with:

```js
const data = await res.json();

// optional: short success feedback
setSuccess("Product created successfully!");

// navigate to products page after success
setTimeout(() => {
  navigate("/products");
}, 1000);
```

### Why `setTimeout`?

- Gives the user a short moment to see the success message
- Makes the UX feel smoother

(You can remove it later if you want instant navigation.)

---

## 4.1.4 Final behavior

1. User fills the form
2. Clicks **Create Product**
3. Button becomes disabled → “Creating…”
4. Success message appears briefly
5. App navigates to `/products`

This matches **real-world app behavior**.

---

## Key Takeaways

- `useNavigate()` lets us navigate from code
- Navigation can happen after async operations
- UX flows often continue after successful actions
- Routing and data logic work together

---
