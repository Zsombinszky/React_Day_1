# Task 2: Adding Pages with React Router DOM (Beginner Guide)

## Goal

We will add simple “pages” to our React app using **React Router DOM**.

By the end, the app will have 3 routes:

- `/` → **Home**
- `/products` → **Products**
- `/editor` → **Editor**

---

## 1) Install React Router DOM

Open the terminal in your project folder and run:

```bash
npm install react-router-dom
```

When it finishes, do not start a new project — we are adding routing to the existing one.

---

## 2) Create a `pages` folder

Inside `src/`, create a new folder:

```
src/pages
```

This is where we will store our page components.

---

## 3) Create 3 page components

### A) `Home.jsx`

Create this file:

```
src/pages/Home.jsx
```

Add:

```jsx
function Home() {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>This is the Home page.</p>
    </div>
  );
}

export default Home;
```

---

### B) `Products.jsx`

Create this file:

```
src/pages/Products.jsx
```

Add:

```jsx
function Products() {
  return (
    <div>
      <h1>Products</h1>
      <p>Later, the ProductGrid will be displayed here.</p>
    </div>
  );
}

export default Products;
```

---

### C) `Editor.jsx`

Create this file:

```
src/pages/Editor.jsx
```

Add:

```jsx
function Editor() {
  return (
    <div>
      <h1>Editor</h1>
      <p>Later here you can edit and upload products.</p>
    </div>
  );
}

export default Editor;
```

---

## 4) Update `App.jsx` to use routing

Now open:

```
src/App.jsx
```

### A) Import Router components

At the top of `App.jsx`, add:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Editor from "./pages/Editor";
```

### B) Replace your return with Routes

Replace the `return (...)` part of `App.jsx` with this:

```jsx
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  </BrowserRouter>
);
```

✅ Important: your example used `/about` and `<About />`, but in this task we are creating an **Editor** page, so we use `/editor` and `<Editor />`.

---

## 5) Run the app and test routes in the browser

Start the dev server:

```bash
npm run dev
```

Now test these URLs in the browser:

- `http://localhost:5173/` → Home page
- `http://localhost:5173/products` → Products page
- `http://localhost:5173/editor` → Editor page

You should see different text on each page.

---

## 6) (Optional but recommended) Add quick navigation links

This makes it easier to move between pages without typing URLs.

In `App.jsx`, import `Link`:

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
```

Then add a simple navbar above `<Routes>`:

```jsx
return (
  <BrowserRouter>
    <nav style={{ display: "flex", gap: "12px", padding: "12px" }}>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/editor">Editor</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  </BrowserRouter>
);
```

(We can style this with Tailwind later.)

---

# Key Takeaways

- A “page” in React is just a **component**
- React Router DOM connects **URLs** to **components**
- `<BrowserRouter>` wraps the app
- `<Routes>` contains `<Route>` elements
- Each `<Route>` defines `path` → `element`

---

## 7) Adding a 404 – Not Found Page

When users visit a URL that does not exist, we should show a **Not Found (404)** page instead of a blank screen.

In React Router DOM, this is very easy to set up.

---

## 7.1 Create a NotFound page

Inside the `src/pages` folder, create a new file:

```
src/pages/NotFound.jsx
```

Add the following code:

```jsx
function NotFound() {
  return (
    <div>
      <h1>404 – Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
```

This component will be shown when no route matches the URL.

---

## 7.2 Add the 404 route in App.jsx

Open `src/App.jsx`.

First, import the new page:

```jsx
import NotFound from "./pages/NotFound";
```

Then, add a **catch-all route** at the **bottom** of your `<Routes>`:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/editor" element={<Editor />} />

  <Route path="*" element={<NotFound />} />
</Routes>
```

### Important rule:

> The `path="*"` route must always be **last**.

React Router checks routes from top to bottom.
The `*` route matches **anything that was not matched before**.

---

## 7.3 Test the 404 page

Start (or refresh) the dev server:

```bash
npm run dev
```

Now open a URL that does not exist, for example:

```
http://localhost:5173/this-page-does-not-exist
```

You should see the **404 – Page Not Found** message.

---

## 7.4 (Optional) Add a link back to Home

You can improve the user experience by adding a link back to the Home page.

Update `NotFound.jsx`:

```jsx
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404 – Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
```

(We can style this with Tailwind later.)

---

## Key Takeaways

- A 404 page is just another React component
- `path="*"` is used to catch all unknown routes
- The 404 route should always be the **last** route
- Good apps handle invalid URLs gracefully

---

## 8) Creating a Shared Layout (Same padding and background on every page)

In real applications, pages usually share a common layout:

- the same background color
- the same padding
- the same navigation bar
- the same page width

Instead of repeating styles on every page, we use a **Layout component**.

---

## 8.1 What is a Layout in React?

A **layout** is just a normal React component that:

- wraps all pages
- defines shared structure and styles
- renders the current page inside it

In React Router, we use the `<Outlet />` component to show the active page.

> Think of a layout as a “frame” around your pages.

---

## 8.2 Create a Layout component

Create a new folder inside `src` (optional but recommended):

```
src/layout
```

Then create this file:

```
src/layout/MainLayout.jsx
```

Add the following code:

```jsx
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
```

### What this layout does:

- `min-h-screen` → full screen height
- `bg-slate-100` → same background on every page
- `max-w-6xl` → centered content
- `p-6` → same padding everywhere
- `<Outlet />` → renders the current page

---

## 8.3 Update routing to use the Layout

Now we need to tell React Router that all pages should use this layout.

Open:

```
src/App.jsx
```

---

### A) Import the layout

```jsx
import MainLayout from "./layout/MainLayout";
```

---

### B) Nest routes inside the layout

Replace your `<Routes>` with this structure:

```jsx
<Routes>
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/editor" element={<Editor />} />
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>
```

### Important:

- The layout route has **no path**
- All child routes are rendered inside `<Outlet />`
- The 404 route stays **outside** the layout

---

## 8.4 Clean up page components

Now that padding and background are handled by the layout,
page components should focus **only on content**.

Example: `Home.jsx`

```jsx
function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Welcome</h1>
      <p>This is the Home page.</p>
    </>
  );
}

export default Home;
```

No background, no container, no padding — the layout handles that.

---

## 8.5 Why this pattern is important

This teaches students that:

- pages are **content**
- layouts are **structure**
- styles should not be duplicated
- React Router supports real app architecture

This is a **junior-level best practice**.

---

## Key Takeaways

- A layout is just a React component
- `<Outlet />` renders the active page
- Layouts prevent duplicated styles
- Real applications always use layouts

---

## 9) Adding a Navbar to the Layout

Now that we have a shared layout, we can add a **navigation bar** that appears on every page.

The navbar will:

- be visible on all pages
- use React Router navigation
- live inside the layout (not in individual pages)

---

## 9.1 Why the Navbar belongs in the Layout

A navbar is part of the **application structure**, not page content.

This means:

- ❌ it should NOT be inside `Home`, `Products`, or `Editor`
- ✅ it should be inside the layout component

Because the layout wraps all pages, the navbar will always stay visible.

---

## 9.2 Update the MainLayout component

Open:

```
src/layout/MainLayout.jsx
```

### Current version (simplified reminder)

```jsx
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
```

---

## 9.3 Add the Navbar markup

Now we add a navigation bar **above** the `<Outlet />`.

Update `MainLayout.jsx` to this:

```jsx
import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-6">
          <Link
            to="/"
            className="font-medium text-slate-800 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="font-medium text-slate-800 hover:text-blue-600"
          >
            Products
          </Link>

          <Link
            to="/editor"
            className="font-medium text-slate-800 hover:text-blue-600"
          >
            Editor
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <div className="max-w-6xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
```

---

## 9.4 Important concepts to explain to students

### `<Link>` instead of `<a>`

We use:

```jsx
<Link to="/products">Products</Link>
```

Instead of:

```html
<a href="/products">Products</a>
```

Because:

- `<Link>` does **client-side navigation**
- the page does NOT reload
- React keeps the app state

---

### Layout structure

```
MainLayout
 ├── Navbar
 └── Page content (Outlet)
        ├── Home
        ├── Products
        └── Editor
```

This helps students understand **where things live**.

---

## 9.5 Test the Navbar

Start or refresh the dev server:

```bash
npm run dev
```

Now:

- Click **Home**, **Products**, **Editor**
- The URL changes
- The page content changes
- The navbar stays visible

This confirms the layout works correctly.

---

## 9.6 (Optional) Highlight the active link (later)

For now, we keep the navbar simple.

Later, we can improve it by:

- highlighting the active page
- using `NavLink`
- adding Tailwind conditional styles

This will be a **separate lesson**.

---

## Key Takeaways

- A navbar is part of the layout, not individual pages
- Layouts keep shared UI in one place
- `<Link>` enables SPA navigation
- `<Outlet />` renders the active page inside the layout

---

## 10) Moving ProductGrid into the Products Page

Until now, the `ProductGrid` component was rendered directly in `App.jsx`.
Now that we are using pages and routing, this is no longer the best place for it.

Each page should be responsible for **its own content**.

---

## 10.1 Why move ProductGrid into the Products page?

This change helps students understand that:

- `App.jsx` handles **routing and layout**
- pages handle **page-level content**
- reusable components (like `ProductGrid`) are used inside pages

This is a very common and clean React architecture.

---

## 10.2 Update the Products page

Open:

```
src/pages/Products.jsx
```

Replace its content with the following:

```jsx
import ProductGrid from "../components/ProductGrid";

const testProducts = [
  {
    id: 1,
    title: "Blue Hoodie",
    price: 39.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/hoodie/600/400",
  },
  {
    id: 2,
    title: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/headphones/600/400",
  },
  {
    id: 3,
    title: "Coffee Mug",
    price: 12.5,
    category: "Home",
    image: "https://picsum.photos/seed/mug/600/400",
  },
];

function Products() {
  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Products</h1>

      <ProductGrid products={testProducts} />
    </>
  );
}

export default Products;
```

---

## 10.3 Clean up App.jsx

Now that `ProductGrid` lives inside the `Products` page,
we should remove it from `App.jsx`.

Open:

```
src/App.jsx
```

Make sure it only contains routing logic, for example:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/editor" element={<Editor />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 10.4 Test the result

- Open the browser
- Go to `/products`
- You should see the product cards
- Switch between pages using the navbar
- The layout and navbar remain unchanged

Everything should still work.

---

## Key Takeaways

- Pages own page-level data and content
- Reusable components belong in `components/`
- `App.jsx` should stay clean and focused on routing
- This structure scales well for real applications

---
