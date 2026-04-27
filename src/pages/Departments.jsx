import { useTranslation } from 'react-i18next';
import { FaBook, FaQuran, FaMicrophone, FaGavel, FaScroll, FaLanguage, FaArrowRight } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Departments() {
  const { t } = useTranslation();
  
  const items = [
    { key: 'dars', icon: FaBook, duration: '8 Years', students: '500+' },
    { key: 'hifz', icon: FaQuran, duration: '3-5 Years', students: '300+' },
    { key: 'tajweed', icon: FaMicrophone, duration: '2 Years', students: '200+' },
    { key: 'ifta', icon: FaGavel, duration: '2 Years', students: '50+' },
    { key: 'hadith', icon: FaScroll, duration: '4 Years', students: '150+' },
    { key: 'arabic', icon: FaLanguage, duration: '3 Years', students: '250+' },
  ];

  return (
    <>
      <SEO 
        title="Academic Departments - Jamia Uloom Islamia"
        description="Explore our 6 academic departments: Dars-e-Nizami, Hifz, Tajweed, Ifta, Hadith, Arabic Literature."
      />
      <PageHeader 
        title={t('pages.departmentsTitle')}
        subtitle="Comprehensive Islamic education across multiple disciplines"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ key, icon: Icon, duration, students }) => (
            <div 
              key={key} 
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-400 transition group cursor-pointer"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-900 transition">
                <Icon className="text-xl text-slate-700 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t(`departments.${key}`)}
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Comprehensive curriculum covering essential topics in this field of Islamic studies.
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="text-sm font-medium text-slate-900">{duration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Students</p>
                  <p className="text-sm font-medium text-slate-900">{students}</p>
                </div>
                <FaArrowRight className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}