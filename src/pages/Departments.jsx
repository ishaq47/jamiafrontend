import { useTranslation } from 'react-i18next';
import { 
  FaBook, 
  FaQuran, 
  FaMicrophone, 
  FaGavel, 
  FaScroll, 
  FaLanguage, 
  FaArrowRight 
} from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Departments() {
  const { t, i18n } = useTranslation();
  
  const lang = i18n.language || 'en';
  const isRtl = lang === 'ur' || lang === 'ar';

  const items = [
    { key: 'dars', icon: FaBook, duration: '8 Years', students: '500+' },
    { key: 'hifz', icon: FaQuran, duration: '3-5 Years', students: '300+' },
    { key: 'tajweed', icon: FaMicrophone, duration: '2 Years', students: '200+' },
    { key: 'ifta', icon: FaGavel, duration: '2 Years', students: '50+' },
    { key: 'hadith', icon: FaScroll, duration: '4 Years', students: '150+' },
    { key: 'arabic', icon: FaLanguage, duration: '3 Years', students: '250+' },
  ];

  const labels = {
    en: {
      duration: 'Duration',
      students: 'Students',
      description: 'Comprehensive curriculum covering essential topics in this field of Islamic studies.'
    },
    ur: {
      duration: 'مدت تعلیم',
      students: 'تعداد طلبہ',
      description: 'اسلامی علوم کی اس شاخ میں بنیادی اور اعلی مفاہیم پر مشتمل جامع نصاب۔'
    },
    ar: {
      duration: 'مدة الدراسة',
      students: 'عدد الطلاب',
      description: 'منهج شامل يغطي المواضيع الأساسية والمتقدمة في هذا المجال من العلوم الإسلامية.'
    }
  };

  const currentLabels = labels[lang] || labels.en;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="font-serif">
      <SEO 
        title={`${t('pages.departmentsTitle') || 'Academic Departments'} - Jamia Darul Uloom Shah Mansoor`}
        description="Explore our academic departments: Dars-e-Nizami, Hifz, Tajweed, Ifta, Hadith, Arabic Literature."
      />
      
      <PageHeader 
        title={t('pages.departmentsTitle') || 'Academic Departments'}
        subtitle="Comprehensive Islamic education across multiple disciplines"
      />

      <div className="bg-slate-50/60 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map(({ key, icon: Icon, duration, students }) => (
              <div 
                key={key} 
                className="bg-white border border-emerald-100/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                {/* Top Subtle Decorative Highlight Bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-900 via-amber-400 to-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon & Title Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-center text-emerald-900 group-hover:bg-emerald-950 group-hover:text-amber-300 group-hover:border-emerald-950 transition-all duration-300 shadow-xs flex-shrink-0">
                      <Icon className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-950 group-hover:text-emerald-800 transition">
                      {t(`departments.${key}`)}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {currentLabels.description}
                  </p>
                </div>

                {/* Footer Metrics */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <p className="text-[11px] font-semibold text-emerald-800/80 uppercase tracking-wider">
                      {currentLabels.duration}
                    </p>
                    <p className="text-slate-900 font-bold mt-0.5">{duration}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-emerald-800/80 uppercase tracking-wider">
                      {currentLabels.students}
                    </p>
                    <p className="text-slate-900 font-bold mt-0.5">{students}</p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-emerald-950 transition duration-300 text-slate-400">
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}