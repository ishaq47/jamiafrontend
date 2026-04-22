import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaGlobe, FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'departments', path: '/departments' },
    { key: 'qa', path: '/qa' },
    { key: 'news', path: '/news' },
    { key: 'contact', path: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'اردو' },
    { code: 'ar', label: 'العربية' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserOpen(false);
  };

  return (
    <nav className="bg-green-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-green-900 font-bold text-xl">ج</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">{t('siteName')}</h1>
              <p className="text-xs text-yellow-300">{t('tagline')}</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="px-3 py-2 rounded hover:bg-green-700 transition text-sm"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}

            {/* Language */}
            <div className="relative ms-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-green-900 rounded hover:bg-yellow-400"
              >
                <FaGlobe />
                {languages.find((l) => l.code === language)?.label}
              </button>
              {langOpen && (
                <div className="absolute end-0 mt-2 bg-white text-gray-800 rounded shadow-lg overflow-hidden min-w-[120px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className="block w-full text-start px-4 py-2 hover:bg-green-100"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <div className="relative ms-2">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-green-700"
                >
                  <FaUserCircle size={20} />
                  <span className="text-sm">{user.name}</span>
                </button>
                {userOpen && (
                  <div className="absolute end-0 mt-2 bg-white text-gray-800 rounded shadow-lg overflow-hidden min-w-[160px]">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserOpen(false)}
                      className="block px-4 py-2 hover:bg-green-100"
                    >
                      {t('nav.dashboard')}
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserOpen(false)}
                        className="block px-4 py-2 hover:bg-green-100 text-green-700 font-bold"
                      >
                        {t('nav.admin')}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-start px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="ms-2 px-4 py-2 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-green-900 text-sm"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-yellow-500 text-green-900 rounded hover:bg-yellow-400 text-sm font-bold"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>

          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 hover:bg-green-700 rounded"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 hover:bg-green-700 rounded">
                  {t('nav.dashboard')}
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-3 py-2 hover:bg-green-700 rounded">
                    {t('nav.admin')}
                  </Link>
                )}
                <button onClick={handleLogout} className="block w-full text-start px-3 py-2 hover:bg-red-700 rounded">
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 hover:bg-green-700 rounded">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="block px-3 py-2 hover:bg-green-700 rounded">
                  {t('nav.register')}
                </Link>
              </>
            )}
            <div className="flex gap-2 mt-3 px-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1 rounded text-sm ${
                    language === lang.code
                      ? 'bg-yellow-500 text-green-900'
                      : 'bg-green-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}