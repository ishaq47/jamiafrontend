import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaGlobe, FaUserCircle, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { formatDate, getHijriDate } from '../utils/dateFormatter';

export default function Navbar() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(formatDate(language));
  const [hijriDate] = useState(getHijriDate());

  useEffect(() => setCurrentDate(formatDate(language)), [language]);
  useEffect(() => setIsOpen(false), [location]);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'departments', path: '/departments' },
    { key: 'qa', path: '/qa' },
    { key: 'admissions', path: '/admissions' },
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
    <>
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-slate-400" />
            <span>{currentDate}</span>
          </div>
          {hijriDate && <div className="text-slate-400">{hijriDate}</div>}
        </div>
      </div>

      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-18 py-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ج</span>
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900">{t('siteName')}</h1>
                <p className="text-xs text-slate-500">{t('tagline')}</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                );
              })}

              <div className="relative ms-2">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
                >
                  <FaGlobe size={14} />
                  {languages.find((l) => l.code === language)?.label}
                  <FaChevronDown size={10} />
                </button>
                {langOpen && (
                  <div className="absolute end-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden min-w-[140px]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`block w-full text-start px-4 py-2 text-sm hover:bg-slate-50 ${
                          language === lang.code ? 'bg-slate-100 font-bold' : ''
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserOpen(!userOpen)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {user?.name?.toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{user?.name?.split(' ')[0]}</span>
                    <FaChevronDown size={10} className="text-slate-400" />
                  </button>
                  {userOpen && (
                    <div className="absolute end-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden min-w-[180px]">
                      <Link to="/dashboard" onClick={() => setUserOpen(false)} className="block px-4 py-2 text-sm hover:bg-slate-50">
                        {t('nav.dashboard')}
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setUserOpen(false)} className="block px-4 py-2 text-sm font-bold text-blue-600 hover:bg-slate-50">
                          {t('nav.admin')}
                        </Link>
                      )}
                      <button onClick={handleLogout} className="block w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="ms-2 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">
                    {t('nav.login')}
                  </Link>
                  <Link to="/register" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg">
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>

            <button className="lg:hidden text-slate-700" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden pb-4 border-t border-slate-200 mt-2 pt-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.key} to={item.path} className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded">
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded">{t('nav.dashboard')}</Link>
                  {user.role === 'admin' && <Link to="/admin" className="block px-3 py-2 text-blue-600 font-bold hover:bg-slate-50 rounded">{t('nav.admin')}</Link>}
                  <button onClick={handleLogout} className="block w-full text-start px-3 py-2 text-red-600 hover:bg-red-50 rounded">{t('nav.logout')}</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded">{t('nav.login')}</Link>
                  <Link to="/register" className="block px-3 py-2 bg-slate-900 text-white rounded">{t('nav.register')}</Link>
                </>
              )}
              <div className="flex gap-2 mt-3 px-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 rounded text-sm border ${
                      language === lang.code ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-700'
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
    </>
  );
}