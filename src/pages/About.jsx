import { useTranslation } from 'react-i18next';
import { FaMosque, FaBookOpen, FaUsers, FaAward } from 'react-icons/fa';

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{t('pages.aboutTitle')}</h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-16">
        <p className="text-lg text-gray-700 leading-relaxed mb-12 text-center">
          {t('pages.aboutContent')}
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: FaMosque, label: '50+ Years', color: 'text-green-700' },
            { icon: FaBookOpen, label: '6 Departments', color: 'text-yellow-600' },
            { icon: FaUsers, label: '5000+ Students', color: 'text-blue-600' },
            { icon: FaAward, label: '1000+ Graduates', color: 'text-purple-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow text-center hover:shadow-xl transition">
              <s.icon className={`text-5xl mx-auto mb-3 ${s.color}`} />
              <p className="font-bold text-gray-700">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}