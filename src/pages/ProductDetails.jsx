import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://fakestoreapi.com/products";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="mb-6">
        <Link className="text-blue-600 hover:underline" to={"/products"}>
          ← Back to products
        </Link>

        {loading && <p>Loading products...</p>}

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
                  {product.price}
                </p>
                <p className="text-slate-700">{product.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
