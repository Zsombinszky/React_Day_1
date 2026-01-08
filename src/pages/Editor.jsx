import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const Editor = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Price must be a number and greater than 0.");
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

      setSuccess(`Product created! (server id: ${data.id ?? "N/A"}) `);

      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Editor</h1>

      <form
        className="bg-white rounded-xl shadow p-6 max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Create a product
        </h2>

        {/* TITLE */}
        <label className="block mb-2 font-medium text-slate-700">Title</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="e.g. Blue Hoodie"
        />

        {/* Price */}
        <label className="block mb-2 font-medium text-slate-700">Price</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4"
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="e.g. 39.99"
        />

        {/* Image */}
        <label className="block mb-2 font-medium text-slate-700">Image</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4"
          type="text"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
          placeholder="e.g. https://..."
        />

        {/* MESSAGES */}

        {error && <p className="text-red-600 mb-3">{error}</p>}

        {success && <p className="text-green-600 mb-3">{success}</p>}

        {/* Submit Button */}
        <button
          className={`w-full px-4 py-2 rounded-lg text-white transition-colors
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
          disabled={loading}
          type="submit"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default Editor;
