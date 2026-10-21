import { useTranslation } from 'react-i18next';
import { FaBuilding, FaBookOpen, FaUsers, FaAward, FaCheckCircle, FaBullhorn, FaEye } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function About() {
  const { t, i18n } = useTranslation();

  const lang = i18n.language || 'en';
  const isRtl = lang === 'ur' || lang === 'ar';

  const localizedContent = {
    en: {
      metaTitle: 'About Us - Jamia Darul Uloom Shah Mansoor',
      metaDesc: 'Learn about Jamia Darul Uloom Shah Mansoor - Nearly a century of authentic Islamic education, Quranic memorization, and scholarly excellence.',
      stats: [
        { label: 'Established', value: '1927 AD' },
        { label: 'Departments', value: '6 Main' },
        { label: 'Students Enrolled', value: '1,000+' },
        { label: 'Graduated Scholars', value: '5,000+' },
      ],
      ourValuesTitle: 'Our Core Values',
      values: [
        'Authentic Islamic Education following Ahl al-Sunnah wal-Jama’ah',
        'Traditional Dars-e-Nizami curriculum with modern teaching methods',
        'Qualified Islamic scholars and experienced, dedicated teachers',
        'Emphasis on moral character building and spiritual purification',
        'Focused environment for Quran memorization (Hifz) & Tajweed',
        'Dedicated service to the local and broader Muslim Ummah',
      ],
      missionTitle: 'Our Mission',
      missionDesc: 'To preserve and disseminate authentic Islamic knowledge through traditional Quranic and Prophetic methodology, preparing pious scholars who lead and serve humanity with wisdom.',
      visionTitle: 'Our Vision',
      visionDesc: 'To remain a leading sanctuary of traditional Islamic scholarship in Khyber Pakhtunkhwa, bridging classical knowledge with contemporary societal guidance.',
    },
    ur: {
      metaTitle: 'ہمارے بارے میں - جامعہ دارالعلوم شاہ منصور',
      metaDesc: 'جامعہ دارالعلوم تعلیم القرآن شاہ منصور (صوابی) کے بارے میں جانئے - ایک صدی سے علومِ اسلامیہ کی ترویج و اشاعت کا معتبر مرکز۔',
      stats: [
        { label: 'سنِ قیام', value: '۱۹۲۷ء' },
        { label: 'تعلیمی شعبہ جات', value: '۶ اہم' },
        { label: 'زیرِ تعلیم طلبہ', value: '+۱،۰۰۰' },
        { label: 'فارغ التحصیل علماء', value: '+۵،۰۰۰' },
      ],
      ourValuesTitle: 'ہمارے بنیادی اقدار',
      values: [
        'اہل السنۃ والجماعۃ کے اصولوں کے مطابق خالص دینی تعلیم',
        'جدید تعلیمی تقاضوں کے ساتھ روایتی درسِ نظامی کا نصاب',
        'جلیل القدر علماء اور تجربہ کار اساتذہ کرام کی سرپرستی',
        'اخلاقی تربیت، تزکیہ نفس اور کردار سازی پر خصوصی توجہ',
        'حفظِ قرآن مجید اور تجوید و قراءت کا پرسکون ماحول',
        'امتِ مسلمہ کی دینی و روحانی رہنمائی کے لیے بے لوث خدمات',
      ],
      missionTitle: 'ہمارا مقصد (مشن)',
      missionDesc: 'قرآن و سنت کے علوم کا تحفظ، فروغ اور اشاعت کرنا تاکہ ایسے باعمل علماء اور حفاظ تیار کیے جا سکیں جو حکمت اور اخلاص کے ساتھ دینِ اسلام کی خدمت کر سکیں۔',
      visionTitle: 'ہمارا نصب العین (ویژن)',
      visionDesc: 'خیبر پختونخوا میں اسلامی تعلیمات کا ایک ممتاز اور مرکزی ادارہ بنے رہنا جو اسلاف کے نقشِ قدم پر چلتے ہوئے دورِ حاضر کے چیلنجز کا شرعی حل فراہم کرے۔',
    },
    ar: {
      metaTitle: 'عن الجامعة - جامعة دار العلوم شاه منصور',
      metaDesc: 'تعرف على جامعة دار العلوم تعليم القرآن شاه منصور (صوابي) - ما يقارب قرناً من نشر العلوم الشرعية وحفظ القرآن الكريم.',
      stats: [
        { label: 'سنة التأسيس', value: '١٩٢٧ م' },
        { label: 'الأقسام الأكاديمية', value: '٦ أقسام' },
        { label: 'الطلاب المسجلون', value: '+١،٠٠٠' },
        { label: 'الخريجون والفائزون', value: '+٥،٠٠٠' },
      ],
      ourValuesTitle: 'قيمنا الأساسية',
      values: [
        'التعليم الإسلامي الأصيل وفق منهج أهل السنة والجماعة',
        'منهج درس نظامي التقليدي المطور بأساليب تعليمية حدیثة',
        'كوكبة من كبار العلماء والأساتذة ذوي الخبرة العالية',
        'التركيز على التربية الأخلاقية والتزكية الروحية للطلاب',
        'بيئة متميزة لحفظ القرآن الكريم وتجويده بالقراءات',
        'خدمة أمة المسلمين والإرشاد الديني بإخلاص وثبات',
      ],
      missionTitle: 'رسالتنا',
      missionDesc: 'الحفاظ على العلوم الشرعية ونشرها عبر المنهج النبوي والقرآني، وإعداد علماء وأئمة يخدمون المجتمع بالحكمة والموعظة الحسنة.',
      visionTitle: 'رؤيتنا',
      visionDesc: 'أن تظل الجامعة مركزاً رائعاً للعلوم الإسلامية في خيبر بختونخوا، يربط بين الفقه الأصيل ومتطلبات العصر الحديث.',
    },
  };

  const current = localizedContent[lang] || localizedContent.en;

  const statIcons = [FaBuilding, FaBookOpen, FaUsers, FaAward];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="font-serif bg-slate-50/50 min-h-screen">
      <SEO 
        title={current.metaTitle}
        description={current.metaDesc}
      />
      
      <PageHeader 
        title={t('pages.aboutTitle') || (isRtl ? 'عن الجامعة' : 'About Our Institution')} 
        subtitle={t('tagline') || (isRtl ? 'مركز التعليمات الإسلامية' : 'Center of Islamic Excellence')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        
        {/* Main Historical Overview Paragraph */}
        <div className="max-w-4xl mx-auto bg-white border border-emerald-100/90 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-900 via-amber-400 to-emerald-900"></div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 mb-4 text-center">
            {t('siteName') || 'Jamia Darul Uloom Shah Mansoor'}
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-0.5 bg-emerald-800/20"></div>
            <div className="w-2.5 h-2.5 bg-amber-400 rotate-45"></div>
            <div className="w-10 h-0.5 bg-emerald-800/20"></div>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-justify font-sans">
            {t('pages.aboutContent')}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {current.stats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <div 
                key={i} 
                className="bg-white border border-emerald-100 rounded-2xl p-5 sm:p-6 text-center shadow-sm hover:shadow-md hover:border-amber-400/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-center text-emerald-900 group-hover:bg-emerald-950 group-hover:text-amber-300 transition-colors duration-300 mb-3">
                  <Icon className="text-xl" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-950">{s.value}</p>
                <p className="text-xs sm:text-sm font-medium text-emerald-800/80 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Values & Mission/Vision Section */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Values List Column */}
          <div className="lg:col-span-7 bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-bold">
                ✓
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-950">
                {current.ourValuesTitle}
              </h2>
            </div>

            <ul className="space-y-4">
              {current.values.map((v, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <FaCheckCircle className="text-amber-500 mt-1 flex-shrink-0" size={16} />
                  <span className="text-slate-700 text-sm sm:text-base font-sans leading-snug">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission & Vision Cards Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mission Card */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-amber-400/30 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3 text-amber-300">
                <FaBullhorn size={20} />
                <h3 className="text-lg sm:text-xl font-bold">{current.missionTitle}</h3>
              </div>
              <p className="text-emerald-100/90 text-sm leading-relaxed font-sans">
                {current.missionDesc}
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-3 text-emerald-950">
                <FaEye className="text-amber-500" size={20} />
                <h3 className="text-lg sm:text-xl font-bold">{current.visionTitle}</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                {current.visionDesc}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}