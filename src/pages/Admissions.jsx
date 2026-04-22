import { useTranslation } from 'react-i18next';
import { FaCheckCircle } from 'react-icons/fa';

export default function Admissions() {
  const { t } = useTranslation();
  const requirements = [
    'Must be at least 12 years old',
    'Basic reading knowledge of Quran',
    'Medical fitness certificate',
    'Parent/Guardian consent',
    'Previous academic records',
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{t('pages.admissionsTitle')}</h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-lg text-gray-700 mb-8">{t('pages.admissionsContent')}</p>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Requirements</h2>
          <ul className="space-y-3">
            {requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}