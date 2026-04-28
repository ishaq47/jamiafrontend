import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-white mb-3">{t('siteName')}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{t('about.description')}</p>
          <div className="flex gap-3">
            {[FaFacebook, FaYoutube, FaTiktok].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">{t('footer.quickLinks')}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-slate-400 hover:text-white">{t('nav.about')}</Link></li>
            <li><Link to="/departments" className="text-slate-400 hover:text-white">{t('nav.departments')}</Link></li>
            <li><Link to="/admissions" className="text-slate-400 hover:text-white">{t('nav.admissions')}</Link></li>
            <li><Link to="/qa" className="text-slate-400 hover:text-white">{t('nav.qa')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">{t('footer.contact')}</h4>
          <p className="text-sm text-slate-400">📧 info@jamia.edu</p>
          <p className="text-sm text-slate-400 mt-1">📞 +92 300 0000000</p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {t('siteName')} — {t('footer.rights')}
      </div>
    </footer>
  );
}