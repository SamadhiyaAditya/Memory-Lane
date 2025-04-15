import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('memorylane_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('memorylane_user');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Memory Lane</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Story</Link>
        {user ? (
          <>
            <span className="user-info">Hi, {user.name}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
