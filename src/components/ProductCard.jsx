const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
      <p className="text-slate-900 text-sm mt-1">{product.category}</p>
      <p className="text-slate-900 text-sm mt-3">{product.price}</p>
    </div>
  );
};

export default ProductCard;
