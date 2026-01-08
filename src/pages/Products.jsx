import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";

const API_URL = "https://fakestoreapi.com/products";

const Products = () => {
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
      } catch (error) {
        setError(error.message);
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
};

export default Products;
