// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">
        Kanban Board
      </Link>
      <div>
        <Link to="/login">
          <button className="bg-white text-blue-600 px-4 py-2 rounded mr-2">Login</button>
        </Link>
        <Link to="/register">
          <button className="bg-white text-blue-600 px-4 py-2 rounded">Register</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
