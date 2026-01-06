# React Components Overview

## What is a React Component?

A React component is a reusable building block that returns a piece of UI (User Interface) to be rendered on the web page. Components make it easier to break down your application into smaller, manageable pieces.

Each component is responsible for **what it displays**, and it can receive data from its parent component. This approach helps keep applications organized, readable, and easier to maintain.

---

## Components Must Return a Single Wrapper Element

A very important rule in React is that **a component must return exactly one root (wrapper) element**.

This means you cannot return multiple elements side by side unless they are wrapped inside a single parent element.

### ❌ This is NOT allowed:

```javascript
return (
  <h1>Title</h1>
  <p>Description</p>
);
```

### ✅ This IS allowed:

```javascript
return (
  <div>
    <h1>Title</h1>
    <p>Description</p>
  </div>
);
```

The wrapper element is often a `div`, but later you will also see other solutions like `React.Fragment`. For now, always remember:

> **One component → one wrapper element**

---

## JSX: What It Is and Why We Use It

JSX stands for JavaScript XML. It is a syntax extension that allows you to write HTML-like structures directly in JavaScript.

JSX makes React code easier to read and understand because it looks similar to HTML, while still allowing you to use JavaScript logic.

Here is a simple example of JSX:

```javascript
const element = <h1>Hello, world</h1>;
```

Even though JSX looks like HTML, it is **not HTML**. Behind the scenes, JSX is transformed into JavaScript objects that React can render in the browser.

---

## Props: What They Are and How Data Flows Into a Component

Props (short for _properties_) are used to pass data from a **parent component** to a **child component**.

Props make components reusable. The same component can display different data depending on the props it receives.

### Important rule about props:

> **Data in React flows in one direction: from parent to child.**

A child component **cannot change its own props**. Props are read-only.

---

## Example: A Reusable ProductCard Component

Let’s create a simple `ProductCard` component that displays product information using props:

```javascript
function ProductCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Price: ${props.price}</p>
      <p>Description: {props.description}</p>
    </div>
  );
}
```

In this example:

- `ProductCard` is a **child component**
- `props` is an object containing the data passed from the parent
- We use `{}` inside JSX to insert JavaScript values

---

## Reusing Components with Different Props

One of the biggest advantages of React components is reusability.

The same component can be used multiple times with different props:

```javascript
function App() {
  return (
    <div>
      <h1>Product List</h1>

      <ProductCard
        name="Laptop"
        price={999}
        description="A high-performance laptop."
      />

      <ProductCard
        name="Smartphone"
        price={499}
        description="A powerful smartphone."
      />

      <ProductCard
        name="Tablet"
        price={299}
        description="A portable tablet device."
      />
    </div>
  );
}
```

Here:

- `App` is the **parent component**
- `ProductCard` is the **child component**
- Data flows **only from App to ProductCard**

Each `ProductCard` uses the same structure but displays different data.

---

## Key Takeaways

- React applications are built from **components**
- A component must return **one wrapper element**
- JSX allows you to write UI using HTML-like syntax in JavaScript
- Props are used to pass data into components
- Data flows **one-way: from parent to child**
- Props are **read-only** and should never be modified by the component

---

## Conclusion

React components help you build user interfaces that are reusable, organized, and easy to understand. By learning how components, JSX, and props work together, you build a strong foundation for React development.

In the next steps, you will learn how to make components dynamic using state and effects.
