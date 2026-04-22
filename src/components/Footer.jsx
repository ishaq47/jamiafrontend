import { useTranslation } from 'react-i18next';
import { FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">{t('siteName')}</h3>
          <p className="text-green-200">{t('about.description')}</p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 text-yellow-400">
            {t('footer.quickLinks')}
          </h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-yellow-300">{t('nav.about')}</a></li>
            <li><a href="/departments" className="hover:text-yellow-300">{t('nav.departments')}</a></li>
            <li><a href="/admissions" className="hover:text-yellow-300">{t('nav.admissions')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 text-yellow-400">
            {t('footer.contact')}
          </h4>
          <p>📧 info@jamia.edu</p>
          <p>📞 +92 300 0000000</p>
          <div className="flex gap-4 mt-4 text-2xl">
            <FaFacebook className="hover:text-yellow-400 cursor-pointer" />
            <FaYoutube className="hover:text-yellow-400 cursor-pointer" />
            <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="border-t border-green-700 mt-8 pt-4 text-center text-green-300">
        © {new Date().getFullYear()} {t('siteName')} - {t('footer.rights')}
      </div>
    </footer>
  );
}