import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import webLogo from '../../public/webLogo.png';

export default function Footer() {
  const { t } = useTranslation();
  const Icons = [{Icon: FaFacebook, link:`https://www.facebook.com/share/18dq4CTCYP/`, color : 'text-blue-500'}, { Icon: FaYoutube, link: 'https://youtube.com/@muftifazalalishah?si=XC41EEFrukloPoZ7', color : 'text-red-500' },{ Icon : FaTiktok, link: 'https://www.tiktok.com/@mufti.fazal.ali.shah?_r=1&_t=ZN-95p4Jk0LUso', color : ''}]
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12  rounded-2xl flex items-center justify-center">
                          <img src={webLogo} alt="logo" className='rounded-2xl'  />
                        </div>
                        <div>
                          <h1 className="text-base font-bold">{t('siteName')}</h1>
                          <p className="text-xs text-slate-400">{t('tagline')}</p>
                        </div>
                      </Link>
          <div className="flex gap-3">
            {Icons.map((Icon, i) => (
              <a key={i} href={Icon.link} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition">
                <Icon.Icon size={20} className={`${Icon.color}`} />
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