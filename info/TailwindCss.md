## 🧩 Card.jsx (Tailwind CSS)

```jsx
function Card({ title, description, price }) {
  return (
    <div className="max-w-sm rounded-xl bg-white shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">${price}</span>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
```

---

## 🧪 Használat példa (App.jsx)

```jsx
import Card from "./Card";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex gap-6 flex-wrap">
      <Card
        title="Laptop"
        description="A fast and reliable laptop for everyday work."
        price={999}
      />

      <Card
        title="Smartphone"
        description="A modern smartphone with a great camera."
        price={499}
      />

      <Card
        title="Tablet"
        description="Lightweight tablet for browsing and media."
        price={299}
      />
    </div>
  );
}

export default App;
```

---

## 🧹 What if Tailwind class lists feel too long?

When using Tailwind CSS, it is very common to have long `className` values:

```jsx
<div className="max-w-sm rounded-xl bg-white shadow-md p-6 hover:shadow-lg transition-shadow">
```

This is normal in Tailwind, but **some developers find it hard to read**.

The good news is:
👉 **You can extract Tailwind classes into reusable custom classes.**

---

## 🧱 Creating reusable Tailwind classes (recommended way)

Tailwind allows you to define your own class names using the `@layer components` feature.

This lets you keep Tailwind’s power **without writing traditional CSS**.

---

## Step 1: Open your main CSS file

Usually this is:

```
src/index.css
```

---

## Step 2: Define a custom component class

Add this below your Tailwind import:

```css
@layer components {
  .card-container {
    @apply max-w-sm rounded-xl bg-white shadow-md p-6 
           hover:shadow-lg transition-shadow;
  }
}
```

### What is happening here?

- `@layer components` → tells Tailwind this is a reusable UI component
- `@apply` → lets you combine multiple Tailwind utilities into one class
- `.card-container` → your own custom class name

---

## Step 3: Use the custom class in React

Now your JSX becomes much cleaner:

```jsx
<div className="card-container">Card content</div>
```

Instead of a long list of utilities, you now use **one meaningful class name**.

---

## ✅ When should you do this?

This approach is useful when:

- The same group of Tailwind classes is reused many times
- Class lists become too long and hurt readability
- You want to give a **semantic name** to a UI pattern (card, button, layout)

Examples of good custom class names:

- `card-container`
- `primary-button`
- `page-wrapper`
- `form-input`

---

## ⚠️ When should you NOT do this?

Avoid extracting classes when:

- The styles are used only once
- You are still experimenting with the design
- The component is very small

Tailwind works best when you **start inline**, then extract **only when needed**.

---

## Key takeaway

> Tailwind does NOT force you to write long className strings forever.
> You can always refactor them into clean, reusable component classes.

This gives you:

- readable JSX
- reusable styles
- no traditional CSS architecture problems

---
