import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('userInfo'));

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
