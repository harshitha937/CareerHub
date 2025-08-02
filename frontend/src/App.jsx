import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import ProtectedRoute from './components/ProtectedRoute';
import PostJob from './pages/PostJob';
import JobDetails from './pages/JobDetails';
import MyApplication from './pages/MyApplicaion';
import My_forms from './pages/My_forms';
import AdminRoute from './components/AdminProtectedRoute';
import AdminJobs from './pages/Admin/AdminJobs';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminContact from './pages/Admin/AdminContact';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        <Route path="/auth/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<MyApplication />} />
        <Route path="/my-applications" element={<My_forms />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/contacts" element={<AdminContact />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
