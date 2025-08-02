import { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from '../services/authServices';
import getUserDetails from '../utils/getUserDetails';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Fix: import context, not provider

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
useEffect(() => {
  if (user) {
    setIsAuthenticated(true);
    setIsAdmin(!!user.isAdmin);
  } else {
    setIsAuthenticated(false);
    setIsAdmin(false);
  }
}, [user]);


  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
      window.location.href = '/auth/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR85rU-7xiW0QP2j8QPfPTlZeLzLS29-pRQzA&s"
          alt="CareerHub Logo"
          className="h-30 w-auto"
        />
      </a>

      {/* Navigation */}
      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <a href="#jobs" className="hover:text-blue-600">Jobs</a>
        <a href="#about" className="hover:text-blue-600">About</a>
        <a href="#contact" className="hover:text-blue-600">Contact</a>

        {isAuthenticated ? (
          <>
            {isAdmin ? (
              <>
                <Link to="/admin/jobs" className="hover:text-blue-600">Manage Jobs</Link>
                <Link to="/admin/users" className="hover:text-blue-600">Manage Users</Link>
                <Link to="/admin/contacts" className="hover:text-blue-600">Contact Messages</Link>
              </>
            ) : (
              <Link to="/my-applications" className="hover:text-blue-600">My Applications</Link>
            )}
            <Link to="/profile" className="hover:text-blue-600">Profile</Link>
            <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="hover:text-blue-600">Login</Link>
            <Link to="/auth/register" className="hover:text-blue-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
