import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBook, FaPray, FaHeart, FaUsers, FaUtensils, FaStore, FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Fatawa() {
  const { t, i18n } = useTranslation();

  const lang = i18n.language || 'en';
  const isRtl = lang === 'ur' || lang === 'ar';

  // Multilingual content for category titles, descriptions, and CTA labels
  const localizedContent = {
    en: {
      metaTitle: 'Fatawa - Islamic Rulings | Jamia Darul Uloom Shah Mansoor',
      metaDesc: 'Browse authentic Islamic rulings (Fatawa) on worship, finance, family, and modern issues from qualified scholars.',
      browse: 'Browse Category',
      fatawaCount: 'Fatawa',
      ctaTitle: 'Have a Question for Our Scholars?',
      ctaSubtitle: 'Submit your personal or general question to our Darul Ifta department for authentic Islamic guidance.',
      askButton: 'Submit Your Question',
      categories: [
        { key: 'fiqh', icon: FaPray, title: 'Salah & Worship (Ebadat)', desc: 'Rulings regarding prayers, fasting, Zakat, and Hajj', count: 124 },
        { key: 'family', icon: FaHeart, title: 'Family & Marriage (Nikah & Talaq)', desc: 'Spousal rights, divorce, child custody, and family matters', count: 89 },
        { key: 'business', icon: FaStore, title: 'Business & Finance (Muamalat)', desc: 'Halal trade, Islamic banking, investments, and contracts', count: 76 },
        { key: 'food', icon: FaUtensils, title: 'Food & Dietary Rulings', desc: 'Halal, Haram, slaughtering rules, and permissible drinks', count: 54 },
        { key: 'social', icon: FaUsers, title: 'Social & Contemporary Issues', desc: 'Modern ethical dilemmas, technology, and social affairs', count: 67 },
        { key: 'aqeedah', icon: FaBook, title: 'Islamic Beliefs (Aqeedah)', desc: 'Fundamental beliefs according to Ahl al-Sunnah wal-Jama’ah', count: 45 },
      ]
    },
    ur: {
      metaTitle: 'فتاویٰ و مسائل - جامعہ دارالعلوم شاہ منصور',
      metaDesc: 'عبادات، معاملات، ازدواجی زندگی اور جدید مسائل پر مستند علماء کرام کے فتاویٰ و شرعی احکام دیکھئے۔',
      browse: 'فتاویٰ دیکھئے',
      fatawaCount: 'فتاویٰ',
      ctaTitle: 'کیا آپ کا کوئی شرعی سوال ہے؟',
      ctaSubtitle: 'اپنا متعلقہ مسئلہ دار الافتاء کے باصلاحیت علماء و مفتیانِ کرام سے دریافت کیجئے۔',
      askButton: 'سوال ارسال کریں',
      categories: [
        { key: 'fiqh', icon: FaPray, title: 'نماز و عبادات (فقه العبادات)', desc: 'نماز، روزہ، زکوٰۃ، اور حج سے متعلق شرعی احکام و مسائل', count: '۱۲۴' },
        { key: 'family', icon: FaHeart, title: 'خاندانی و ازدواجی امور (نکاح و طلاق)', desc: 'حقوقِ زوجین، طلاق، خلع، اور پرورش سے متعلق فتاویٰ', count: '۸۹' },
        { key: 'business', icon: FaStore, title: 'تجارت و مالیات (المعاملات)', desc: 'حلال تجارت، اسلامی بینکنگ، اور روزمرہ خرید و فروخت', count: '۷۶' },
        { key: 'food', icon: FaUtensils, title: 'خوراک و ذبیحہ کے احکام', desc: 'حلال و حرام غذا، ذبیحہ، اور معاصر خوراکی مصنوعات', count: '۵۴' },
        { key: 'social', icon: FaUsers, title: 'معاشرتی مسائل و جدید تقاضے', desc: 'جدید دور کے چیلنجز، سوشل میڈیا اور معاشرتی رہنمائی', count: '۶۷' },
        { key: 'aqeedah', icon: FaBook, title: 'عقائد و ایمانیات', desc: 'اہل السنۃ والجماعۃ کے بنیادی اور پختہ دینی عقائد', count: '۴۵' },
      ]
    },
    ar: {
      metaTitle: 'الفتاوى والأحكام الشرعية - جامعة دار العلوم شاه منصور',
      metaDesc: 'تصفح الأحكام الشرعية المعتمدة في العبادات، المعاملات، والأسرة من قبل علماء دار الإفتاء.',
      browse: 'تصفح القسم',
      fatawaCount: 'فتوى',
      ctaTitle: 'هل لديك سؤال شرعي؟',
      ctaSubtitle: 'أرسل سؤالك الخاص أو العام إلى قسم دار الإفتاء للحصول على إجابة معتمدة.',
      askButton: 'اطرح سؤالك الآن',
      categories: [
        { key: 'fiqh', icon: FaPray, title: 'العبادات والصلوات', desc: 'أحكام الصلاة، الصيام، الزكاة، والحج', count: '١٢٤' },
        { key: 'family', icon: FaHeart, title: 'الأحوال الشخصية والأسرة', desc: 'أحكام النكاح، الطلاق، النفقة، وحقوق الأسرة', count: '٨٩' },
        { key: 'business', icon: FaStore, title: 'المعاملات المالية والتجارة', desc: 'التجارة الحلال، المصرفية الإسلامية، والاستثمار', count: '٧٦' },
        { key: 'food', icon: FaUtensils, title: 'الأطعمة والأشربة', desc: 'أحكام الذبائح والأطعمة المباحة والمحرمة', count: '٥٤' },
        { key: 'social', icon: FaUsers, title: 'القضايا المعاصرة والاجتماعية', desc: 'المستجدات الحديثة والتحديات الاجتماعية المعاصرة', count: '٦٧' },
        { key: 'aqeedah', icon: FaBook, title: 'العقيدة والإيمانيات', desc: 'أصول العقيدة على منهج أهل السنة والجماعة', count: '٤٥' },
      ]
    }
  };

  const current = localizedContent[lang] || localizedContent.en;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="font-serif bg-slate-50/50 min-h-screen">
      <SEO 
        title={current.metaTitle}
        description={current.metaDesc}
      />
      
      <PageHeader 
        title={t('pages.fatawaTitle') || (isRtl ? 'الفتاوى والأحكام' : 'Fatawa & Rulings')}
        subtitle={t('pages.fatawaContent') || (isRtl ? 'تصفح الأحكام الإسلامية الأصيلة من علمائنا' : 'Browse authentic Islamic rulings from qualified scholars')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        
        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.categories.map((c, i) => (
            <Link 
              key={i} 
              to={`/qa?category=${c.key}`}
              className="bg-white border border-emerald-100 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-900 via-amber-400 to-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-center text-emerald-900 group-hover:bg-emerald-950 group-hover:text-amber-300 group-hover:border-emerald-950 transition-all duration-300 shadow-xs">
                    <c.icon className="text-xl" />
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
                    {c.count} {current.fatawaCount}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-emerald-950 group-hover:text-emerald-800 transition mb-2">
                  {c.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-900 group-hover:text-amber-600 transition">
                <span>{current.browse}</span>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Ask Question CTA Card */}
        <div className="bg-emerald-950 text-white border border-amber-400/30 rounded-2xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
          <div className="w-14 h-14 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
            <FaQuestionCircle size={28} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
            {current.ctaTitle}
          </h3>

          <p className="text-emerald-100/80 max-w-xl mx-auto mb-8 text-sm sm:text-base font-sans leading-relaxed">
            {current.ctaSubtitle}
          </p>

          <Link 
            to="/qa" 
            className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>{current.askButton}</span>
            <FaArrowRight className="text-xs rtl:rotate-180" />
          </Link>
        </div>

      </div>
    </div>
  );
}