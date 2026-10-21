import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaTiktok, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import webLogo from '../../public/webLogo.png';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const isRtl = lang === 'ur' || lang === 'ar';

  const socialIcons = [
    { 
      Icon: FaFacebook, 
      link: 'https://www.facebook.com/share/18dq4CTCYP/', 
      hoverColor: 'hover:bg-blue-600 hover:text-white',
      color: 'text-blue-400' 
    }, 
    { 
      Icon: FaYoutube, 
      link: 'https://youtube.com/@muftifazalalishah?si=XC41EEFrukloPoZ7', 
      hoverColor: 'hover:bg-red-600 hover:text-white',
      color: 'text-red-400' 
    }, 
    { 
      Icon: FaTiktok, 
      link: 'https://www.tiktok.com/@mufti.fazal.ali.shah?_r=1&_t=ZN-95p4Jk0LUso', 
      hoverColor: 'hover:bg-slate-700 hover:text-white',
      color: 'text-slate-200' 
    }
  ];

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-amber-500 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Subtle Islamic Geometric Overlay Pattern */}
      <div 
        className="absolute inset-0 opacity-5 bg-repeat pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M30 30L0 0h60L30 30zM30 30L0 60h60L30 30z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Brand & Social Section */}
        <div className="lg:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-3.5 group inline-flex">
            <div className="w-12 h-12 bg-emerald-900 border border-amber-400/30 rounded-xl flex items-center justify-center p-1 shadow-inner">
              <img src={webLogo} alt="logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition">
                {t('siteName')}
              </h1>
              <p className="text-xs text-amber-300/80 font-medium">
                {t('tagline')}
              </p>
            </div>
          </Link>

          <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed max-w-sm">
            Dedicated to imparting authentic Islamic knowledge, Quranic memorization, and nurturing scholarly excellence based on traditional values.
          </p>

          <div className="flex items-center gap-2.5 pt-2">
            {socialIcons.map((item, i) => (
              <a 
                key={i} 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 bg-emerald-900/80 border border-emerald-700/50 rounded-xl flex items-center justify-center transition duration-200 shadow-sm ${item.hoverColor}`}
              >
                <item.Icon size={18} className={item.color} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-amber-400 font-bold text-xs uppercase tracking-widest border-b border-emerald-800 pb-2">
            {t('footer.quickLinks') || 'Quick Links'}
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/about" className="text-emerald-200/80 hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 text-xs">▪</span> {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link to="/departments" className="text-emerald-200/80 hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 text-xs">▪</span> {t('nav.departments')}
              </Link>
            </li>
            <li>
              <Link to="/admissions" className="text-emerald-200/80 hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 text-xs">▪</span> {t('nav.admissions')}
              </Link>
            </li>
            <li>
              <Link to="/qa" className="text-emerald-200/80 hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 text-xs">▪</span> {t('nav.qa')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information Column */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-amber-400 font-bold text-xs uppercase tracking-widest border-b border-emerald-800 pb-2">
            {t('footer.contact') || 'Contact Us'}
          </h4>
          <div className="space-y-3 text-sm text-emerald-200/90">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-amber-400 mt-1 flex-shrink-0" size={14} />
              <span>Shah Mansoor, Swabi, Khyber Pakhtunkhwa, Pakistan</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400 flex-shrink-0" size={14} />
              <span>info@jamia.edu.pk</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-amber-400 flex-shrink-0" size={13} />
              <span>+92 300 0000000</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-emerald-950/90 border-t border-emerald-900 py-5 text-center text-xs text-emerald-300/70">
        <div className="max-w-7xl mx-auto px-4">
          © {new Date().getFullYear()} {t('siteName')} — {t('footer.rights') || 'All Rights Reserved.'}
        </div>
      </div>
    </footer>
  );
}