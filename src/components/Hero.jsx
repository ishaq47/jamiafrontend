import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaPaperPlane, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&q=80',
    title: { en: 'Welcome to Jamia Uloom Islamia', ur: 'جامعہ علوم اسلامیہ میں خوش آمدید', ar: 'مرحباً بكم في جامعة العلوم الإسلامية' },
    subtitle: { en: 'Preserving Islamic Knowledge for Generations', ur: 'نسلوں کے لیے اسلامی علوم کا تحفظ', ar: 'الحفاظ على المعرفة الإسلامية للأجيال' },
  },
  {
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1920&q=80',
    title: { en: 'Center of Islamic Excellence', ur: 'اسلامی تعلیمات کا مرکز', ar: 'مركز التميز الإسلامي' },
    subtitle: { en: 'Nurturing Scholars of Tomorrow', ur: 'کل کے علماء کی تربیت', ar: 'تربية علماء المستقبل' },
  },
  {
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80',
    title: { en: 'Memorization of the Holy Quran', ur: 'قرآن پاک کی حفاظت', ar: 'حفظ القرآن الكريم' },
    subtitle: { en: 'Connecting Hearts to the Divine Word', ur: 'دلوں کا کلام الہی سے تعلق', ar: 'ربط القلوب بالكلمة الإلهية' },
  },
  {
    image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=1920&q=80',
    title: { en: 'Authentic Islamic Education', ur: 'خالص اسلامی تعلیمات', ar: 'التعليم الإسلامي الأصيل' },
    subtitle: { en: 'Following the Path of Our Predecessors', ur: 'اسلاف کے نقش قدم پر', ar: 'اتباع طريق السلف الصالح' },
  },
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const lang = i18n.language || 'en';

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    if (question.trim().length < 5) {
      setMessage({ type: 'error', text: 'Question too short' });
      return;
    }
    try {
      setLoading(true);
      await API.post('/questions', { question: question.trim(), language: lang, category: 'general' });
      setMessage({ type: 'success', text: t('qa.submitSuccess') });
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
      className="relative min-h-[600px] lg:min-h-[680px] text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60"></div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)}
        className="absolute start-4 top-1/2 -translate-y-1/2 z-20 bg-white/5 hover:bg-white/15 backdrop-blur-sm p-3 rounded-full border border-white/20 hidden md:block"
      >
        <FaChevronLeft className="rtl:rotate-180" />
      </button>
      <button
        onClick={() => setCurrentSlide((p) => (p + 1) % slides.length)}
        className="absolute end-4 top-1/2 -translate-y-1/2 z-20 bg-white/5 hover:bg-white/15 backdrop-blur-sm p-3 rounded-full border border-white/20 hidden md:block"
      >
        <FaChevronRight className="rtl:rotate-180" />
      </button>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                currentSlide === index
                  ? 'opacity-100 translate-y-0 relative'
                  : 'opacity-0 translate-y-4 absolute top-0 inset-x-0 pointer-events-none'
              }`}
            >
              <span className="inline-block bg-white/10 border border-white/20 text-white/90 px-3 py-1 rounded text-xs font-medium tracking-wider uppercase mb-4 backdrop-blur-sm">
                {t('tagline')}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {slide.title[lang]}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-6">
                {slide.subtitle[lang]}
              </p>
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/about"
              className="bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 font-medium px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              {t('hero.cta')} <FaArrowRight className="rtl:rotate-180" />
            </Link>
            <Link
              to="/admissions/apply"
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              {t('apply.applyNow')}
            </Link>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-7 shadow-xl border border-white/20 text-slate-800">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">
            <div className="bg-blue-50 p-2.5 rounded-lg">
              <FaQuestionCircle className="text-2xl text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t('hero.askTitle')}</h2>
              <p className="text-xs text-slate-500">{t('hero.askSubtitle')}</p>
            </div>
          </div>

          {user ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t('hero.askPlaceholder')}
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <FaPaperPlane size={14} />
                {loading ? '...' : t('hero.askButton')}
              </button>
              {message.text && (
                <p className={`text-center text-sm p-2 rounded ${
                  message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {message.text}
                </p>
              )}
            </form>
          ) : (
            <div className="text-center py-4">
              <p className="mb-4 text-slate-600 text-sm">{t('hero.loginToAsk')}</p>
              <div className="flex gap-2 justify-center">
                <Link to="/login" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium">
                  {t('auth.login')}
                </Link>
                <Link to="/register" className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 px-5 py-2 rounded-lg text-sm font-medium">
                  {t('auth.register')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === index ? 'w-8 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}