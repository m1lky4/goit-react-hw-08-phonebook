import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
        )}
      </ul>
      {isAuthenticated && (
        <div>
          <p>mango@mail.com</p>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
