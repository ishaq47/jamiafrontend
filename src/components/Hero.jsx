import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaPaperPlane, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import madrasa1 from '../../public/madrasa1.jpg';
import madrasa2 from '../../public/madrasa2.jpg';
import madrasa3 from '../../public/madrasa3.jpg';
import madrasa4 from '../../public/madrasa4.jpg';

const slides = [
  {
    image: madrasa1,
    title: {
      en: 'Welcome to Jamia Darul Uloom Shah Mansoor',
      ur: 'جامعہ دارالعلوم شاہ منصور میں خوش آمدید',
      ar: 'مرحباً بكم في جامعة دار العلوم شاه منصور'
    },
    subtitle: { 
      en: 'Preserving Islamic Knowledge for Generations', 
      ur: 'نسلوں کے لیے اسلامی علوم کا تحفظ', 
      ar: 'الحفاظ على المعرفة الإسلامية للأجيال' 
    },
  },
  {
    image: madrasa2,
    title: { en: 'Center of Islamic Excellence', ur: 'اسلامی تعلیمات کا مرکز', ar: 'مركز التميز الإسلامي' },
    subtitle: { en: 'Nurturing Scholars of Tomorrow', ur: 'کل کے علماء کی تربیت', ar: 'تربية علماء المستقبل' },
  },
  {
    image: madrasa3,
    title: { en: 'Memorization of the Holy Quran', ur: 'قرآن پاک کی حفاظت', ar: 'حفظ القرآن الكريم' },
    subtitle: { en: 'Connecting Hearts to the Divine Word', ur: 'دلوں کا کلام الہی سے تعلق', ar: 'ربط القلوب بالكلمة الإلهية' },
  },
  {
    image: madrasa4,
    title: { en: 'Authentic Islamic Education', ur: 'خالص اسلامی تعلیمات', ar: 'التعليم الإسلامي الأصيل' },
    subtitle: { en: 'Following the Path of Our Predecessors', ur: 'اسلاف کے نقش قدم پر', ar: 'اتباع طريق السلف الصالح' },
  },
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const lang = i18n.language || 'en';

  const isRtl = lang === 'ur' || lang === 'ar';

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (user) {
      setName(user.username || user.name || '');
      setEmail(user.email || '');
    } else {
      setName('');
      setEmail('');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim().length < 5) {
      setMessage({ type: 'error', text: 'Question too short' });
      return;
    }
    try {
      setLoading(true);
      await API.post('/questions', { userName: name, userEmail: email, question: question.trim(), language: lang, category: 'general' });
      setMessage({ type: 'success', text: t('qa.submitSuccess') || 'Question submitted successfully!' });
      setQuestion('');
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Error submitting' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-[620px] lg:min-h-[85vh] text-white overflow-hidden bg-emerald-950 font-serif"
      dir={isRtl ? 'rtl' : 'ltr'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Islamic Deep Emerald Overlay */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/60"></div>
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[600px]">
        
        {/* Left Banner Info */}
        <div className="lg:col-span-7 relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                currentSlide === index
                  ? 'opacity-100 translate-y-0 relative'
                  : 'opacity-0 translate-y-4 absolute top-0 inset-x-0 pointer-events-none'
              }`}
            >
              <span className="inline-flex items-center gap-2 bg-emerald-900/60 border border-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                {t('tagline')}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight text-white tracking-tight">
                {slide.title[lang]}
              </h1>
              <p className="text-base sm:text-lg text-emerald-100/90 mb-8 max-w-2xl font-light leading-relaxed">
                {slide.subtitle[lang]}
              </p>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/about"
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-6 py-3 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 text-sm"
            >
              {t('hero.cta')} <FaArrowRight className="rtl:rotate-180" size={12} />
            </Link>
            {user?.role !== 'admin' && (
              <Link
                to="/admissions/apply"
                className="bg-emerald-900/80 hover:bg-emerald-800 text-amber-100 font-semibold px-6 py-3 rounded-xl border border-emerald-500/30 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 shadow-md text-sm"
              >
                {t('apply.applyNow')}
              </Link>
            )}
          </div>
        </div>

        {/* Right Form Card (Ask Question / Fatwa) */}
        {user?.role !== 'admin' && (
          <div className="lg:col-span-5 bg-emerald-950/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-emerald-500/20 text-white relative">
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-emerald-800/60">
              <div className="bg-amber-400/20 border border-amber-400/30 p-3 rounded-xl text-amber-300">
                <FaQuestionCircle className="text-xl" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">{t('hero.askTitle')}</h2>
                <p className="text-xs text-emerald-200/80">{t('hero.askSubtitle')}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('hero.askName')}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-emerald-50 placeholder-emerald-300/50 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('hero.askEmail')}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-emerald-50 placeholder-emerald-300/50 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                  />
                </div>
              </div>

              <div>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={t('hero.askPlaceholder')}
                  required
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-emerald-50 placeholder-emerald-300/50 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60 text-sm"
              >
                <FaPaperPlane size={13} />
                {loading ? '...' : t('hero.askButton')}
              </button>

              {message.text && (
                <p
                  className={`text-center text-xs p-2.5 rounded-xl border ${
                    message.type === 'success'
                      ? 'bg-emerald-900/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500/50 text-red-200'
                  }`}
                >
                  {message.text}
                </p>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-amber-400' : 'w-2 bg-emerald-200/30 hover:bg-emerald-200/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}