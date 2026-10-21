import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  FaBars, 
  FaTimes, 
  FaGlobe, 
  FaCalendarAlt, 
  FaChevronDown,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserShield
} from 'react-icons/fa';
import { formatDate, getHijriDate } from '../utils/dateFormatter';
import webLogo from '../../public/webLogo.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(formatDate(language));
  const [hijriDate] = useState(getHijriDate());

  const isRtl = i18n.language === 'ur' || i18n.language === 'ar';

  useEffect(() => {
    setCurrentDate(formatDate(language));
  }, [language]);

  useEffect(() => {
    setIsOpen(false);
    setUserOpen(false);
    setLangOpen(false);
  }, [location]);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'departments', path: '/departments' },
    { key: 'qa', path: '/qa' },
    { key: 'fatawa', path: '/fatawa' },
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
    <header className="sticky top-0 z-50 shadow-md" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Banner - Deep Emerald & Gold Accents */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-amber-400" />
            <span className="font-medium">{currentDate}</span>
          </div>
          {hijriDate && (
            <div className="text-amber-300 font-semibold tracking-wide flex items-center gap-1">
              <span>{hijriDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Branding & Logo */}
            <Link className="flex items-center gap-3.5 group" to="/">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-center p-1 shadow-inner group-hover:border-amber-400 transition">
                <img src={webLogo} alt="Jamia Logo" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-emerald-950 tracking-tight group-hover:text-emerald-800 transition">
                  {t('siteName')}
                </h1>
                <p className="text-[11px] text-emerald-700/80 font-medium">
                  {t('tagline')}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-emerald-900 text-amber-300 font-semibold shadow-sm'
                        : 'text-slate-700 hover:text-emerald-950 hover:bg-emerald-50'
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                );
              })}

              {/* Language Selector Dropdown */}
              <div className="relative ms-2">
                <button
                  onClick={() => { setLangOpen(!langOpen); setUserOpen(false); }}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 rounded-xl border border-slate-200 transition"
                >
                  <FaGlobe className="text-emerald-700" size={13} />
                  <span className="font-medium">{languages.find((l) => l.code === language)?.label}</span>
                  <FaChevronDown className="text-slate-400" size={10} />
                </button>

                {langOpen && (
                  <div className="absolute end-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden min-w-[140px] py-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`block w-full text-start px-4 py-2 text-sm transition hover:bg-emerald-50 ${
                          language === lang.code ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-slate-700'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Authentication Menu */}
              {user ? (
                <div className="relative ms-1">
                  <button
                    onClick={() => { setUserOpen(!userOpen); setLangOpen(false); }}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-emerald-50 rounded-xl border border-slate-200 transition"
                  >
                    <div className="w-7 h-7 bg-emerald-900 text-amber-300 rounded-full flex items-center justify-center text-xs font-bold shadow-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-800">{user?.name?.split(' ')[0]}</span>
                    <FaChevronDown className="text-slate-400" size={10} />
                  </button>

                  {userOpen && (
                    <div className="absolute end-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden min-w-[180px] py-1 z-50">
                      <Link 
                        to="/dashboard" 
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 transition"
                      >
                        <FaTachometerAlt className="text-emerald-700" size={13} />
                        {t('nav.dashboard')}
                      </Link>
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          onClick={() => setUserOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition"
                        >
                          <FaUserShield className="text-amber-600" size={13} />
                          {t('nav.admin')}
                        </Link>
                      )}
                      <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-2 w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <FaSignOutAlt size={13} />
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 ms-2">
                  <Link className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-emerald-950 hover:bg-emerald-50 rounded-xl transition" to="/login">
                    {t('nav.login')}
                  </Link>
                  <Link className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-amber-100 text-sm font-bold rounded-xl shadow-sm transition" to="/register">
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button 
              className="lg:hidden text-emerald-950 p-2 rounded-xl hover:bg-emerald-50 transition" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="lg:hidden pb-5 border-t border-slate-100 mt-1 pt-3 space-y-1">
              {navItems.map((item) => (
                <Link className="block px-3.5 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-950 rounded-xl font-medium transition" key={item.key} to={item.path}>
                  {t(`nav.${item.key}`)}
                </Link>
              ))}

              <div className="pt-2 border-t border-slate-100 space-y-1">
                {user ? (
                  <>
                    <Link className="block px-3.5 py-2 text-slate-700 hover:bg-emerald-50 rounded-xl" to="/dashboard">{t('nav.dashboard')}</Link>
                    {user.role === 'admin' && <Link className="block px-3.5 py-2 text-emerald-900 font-bold hover:bg-emerald-50 rounded-xl" to="/admin">{t('nav.admin')}</Link>}
                    <button onClick={handleLogout} className="block w-full text-start px-3.5 py-2 text-red-600 hover:bg-red-50 rounded-xl">{t('nav.logout')}</button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 pt-1 px-1">
                    <Link className="block text-center px-4 py-2 text-slate-700 border border-slate-200 rounded-xl font-medium" to="/login">{t('nav.login')}</Link>
                    <Link className="block text-center px-4 py-2 bg-emerald-900 text-amber-100 rounded-xl font-bold" to="/register">{t('nav.register')}</Link>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3 px-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      language === lang.code ? 'bg-emerald-900 text-amber-300 border-emerald-900' : 'border-slate-200 text-slate-700 hover:bg-emerald-50'
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
    </header>
  );
}