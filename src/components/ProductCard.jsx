import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => {
        navigate(`/products/${product.id}`);
      }}
      className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
      <p className="text-slate-900 text-sm mt-1">{product.category}</p>
      <p className="text-slate-900 text-sm mt-3 mb-4">{product.price}</p>

      <Link
        className="px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm"
        to={`/products/${product.id}`}
      >
        Check details
      </Link>
    </div>
  );
};

export default ProductCard;
