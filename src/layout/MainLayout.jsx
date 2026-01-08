import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-6">
          <Link
            className="font-medium text-slate-800 hover:text-blue-600"
            to={"/"}
          >
            Home
          </Link>

          <Link
            className="font-medium text-slate-800 hover:text-blue-600"
            to={"/products"}
          >
            Products
          </Link>

          <Link
            className="font-medium text-slate-800 hover:text-blue-600"
            to={"/editor"}
          >
            Editor
          </Link>

          <Link
            className="font-medium text-slate-800 hover:text-blue-600"
            to={"/weather"}
          >
            Weather
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <div className="max-w-6xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
