import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-8 flex justify-between items-center h-20">
      <h1 className="text-xl font-bold">MyForm App</h1>
      <nav className="space-x-4">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
