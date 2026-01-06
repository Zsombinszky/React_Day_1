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

const Products = () => {
  return (
    <div>
      <h1>Products</h1>
      <ProductGrid products={testProducts} />
    </div>
  );
};

export default Products;
