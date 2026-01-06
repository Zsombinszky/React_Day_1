## Vite + React Mini Project Setup

### 0) Prerequisites

- Node.js installed
- Terminal available (VS Code Terminal is fine)

---

## 1) Creating a Vite + React App

### A) In a new folder (classic way)

1. Open the terminal in the folder where you want to create the project.
2. Run:

```bash
npm create vite@latest
```

3. Answer the prompts:

- Project name: e.g. `vite-react-basics`
- Framework: **React**
- Variant: **JavaScript**

4. Enter the project folder and install dependencies:

```bash
cd vite-react-basics
npm install
```

---

### B) In an existing folder (if you already created an empty folder)

1. Navigate into the existing folder:

```bash
cd your-existing-folder-name
```

2. Run the same command, but use `.` (current folder):

```bash
npm create vite@latest .
```

3. Select **React + JavaScript** again
4. Install dependencies:

```bash
npm install
```

> Tip: If you don’t like interactive prompts, there is also a template-based command, but the interactive version is recommended for beginners.

---

## 2) Project Structure (what each file is for)

The most important files and folders:

- `index.html`
  This is the entry point for the browser. It contains the `<div id="root"></div>` element.

- `src/`
  This is where all React code lives.

  - `src/main.jsx`
    This file starts the React app and mounts the `App` component into the `#root` element.

  - `src/App.jsx`
    The main component of the application. This is the file you will edit most often.

  - `src/index.css` (or similar)
    Global CSS file. Tailwind imports will also go here later.

- `package.json`
  Project dependencies and scripts (for example: `npm run dev`).

---

## 3) Running the App and Checking It in the Browser

Start the development server:

```bash
npm run dev
```

The terminal will print a local URL (usually `http://localhost:5173`).
Open it in your browser.

---

## 4) Clean Project: Removing Unnecessary Files

Goal: a completely clean project with a simple “Hello World”.

1. Delete unnecessary assets (if they exist):

- `src/assets/` folder (for example Vite/React logos) – safe to delete

2. Open `src/App.jsx` and replace it with a minimal version.

**src/App.jsx**

```jsx
function App() {
  return <h1>Hello World</h1>;
}

export default App;
```

3. Refresh the browser and make sure only “Hello World” is displayed.

---

## 5) Installing Tailwind CSS (using the official documentation)

At this point, follow the **official Tailwind “Vite plugin” setup** from the documentation.

Once the setup is complete, continue with the next step.

---

## 6) Hello World with Tailwind Classes

Now we style the App component using Tailwind (inline `className`).

**src/App.jsx**

```jsx
function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-slate-900">Hello World</h1>
    </div>
  );
}

export default App;
```

Check the browser: the text should be centered, large, with a clean background.

---

## 7) Creating Components: ProductGrid + ProductCard

### 7.1 Create a components folder

`src/components/`

---

### 7.2 ProductCard component

Create: `src/components/ProductCard.jsx`

```jsx
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>

      <p className="text-slate-600 text-sm mt-1">{product.category}</p>

      <p className="text-blue-600 font-bold mt-3">${product.price}</p>
    </div>
  );
}

export default ProductCard;
```

---

### 7.3 ProductGrid component

Create: `src/components/ProductGrid.jsx`

```jsx
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
```

---

## 8) Test Product List + Using ProductGrid in App.jsx

Now create a simple test array in `App.jsx` and pass it to the grid.

**src/App.jsx**

```jsx
import ProductGrid from "./components/ProductGrid";

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

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Products</h1>

      <ProductGrid products={testProducts} />
    </div>
  );
}

export default App;
```

Open the browser: you should see the product cards displayed in a grid.

---
