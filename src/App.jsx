import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import Admissions from './pages/Admissions';
import Fatawa from './pages/Fatawa';
import Publications from './pages/Publications';
import Contact from './pages/Contact';
import NewsPage from './pages/NewsPage';
import QAPage from './pages/QAPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';

import AdminLayout from './pages/admin/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AdminNews from './pages/admin/AdminNews';
import AdminQuestions from './pages/admin/AdminQuestions';
import AdminUsers from './pages/admin/AdminUsers';

import './i18n/i18n';
import AdminApplications from './pages/admin/AdminApplications';
import ApplyForm from './pages/ApplyForm';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/departments" element={<Layout><Departments /></Layout>} />
            <Route path="/admissions" element={<Layout><Admissions /></Layout>} />
            <Route path="/fatawa" element={<Layout><Fatawa /></Layout>} />
            <Route path="/publications" element={<Layout><Publications /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/news" element={<Layout><NewsPage /></Layout>} />
            <Route path="/qa" element={<Layout><QAPage /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
            <Route path="/reset-password/:token" element={<Layout><ResetPassword /></Layout>} />
            <Route path="/admissions/apply" element={<Layout><ApplyForm /></Layout>} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminHome />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="questions" element={<AdminQuestions />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="applications" element={<AdminApplications />} />
            </Route>

            <Route path="*" element={<Layout><Home /></Layout>} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}