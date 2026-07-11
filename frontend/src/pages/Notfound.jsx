import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="mt-6 bg-black text-white px-6 py-3 rounded">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
