import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // important

  useEffect(() => {
    // Check localStorage or cookies
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children} {/* prevents UI from flashing */}
    </AuthContext.Provider>
  );
};
