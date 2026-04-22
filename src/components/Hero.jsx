import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaPaperPlane, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

// Background slides with images and captions
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
  {
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1920&q=80',
    title: { en: 'Community & Brotherhood', ur: 'امت اور اخوت', ar: 'المجتمع والأخوة' },
    subtitle: { en: 'Building a Righteous Society Together', ur: 'ایک صالح معاشرے کی تعمیر', ar: 'بناء مجتمع صالح معاً' },
  },
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const lang = i18n.language || 'en';

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index) => setCurrentSlide(index);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    try {
      setLoading(true);
      await API.post('/questions', {
        question,
        language: lang,
        category: 'general',
      });
      setMessage(t('qa.submitSuccess'));
      setQuestion('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-[650px] lg:min-h-[700px] text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title[lang]}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/80 to-green-900/90"></div>
            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute start-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-yellow-500 hover:text-green-900 backdrop-blur-sm p-3 rounded-full transition-all duration-300 border border-white/30 hidden md:block"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-xl rtl:rotate-180" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute end-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-yellow-500 hover:text-green-900 backdrop-blur-sm p-3 rounded-full transition-all duration-300 border border-white/30 hidden md:block"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xl rtl:rotate-180" />
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center min-h-[650px]">
        {/* Left: Dynamic Text */}
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
              <div className="inline-block bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 px-4 py-1 rounded-full text-sm mb-4 backdrop-blur-sm">
                ✨ {t('tagline')}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-2xl">
                {slide.title[lang]}
              </h1>
              <p className="text-xl md:text-2xl text-yellow-300 mb-6 drop-shadow-lg">
                {slide.subtitle[lang]}
              </p>
            </div>
          ))}
          <p className="text-green-100 mb-8 leading-relaxed text-lg max-w-xl drop-shadow">
            {t('about.description')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/about"
              className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-8 py-3 rounded-full transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              {t('hero.cta')}
            </Link>
            <Link
              to="/qa"
              className="bg-white/10 hover:bg-white/20 border border-white/40 text-white font-bold px-8 py-3 rounded-full transition backdrop-blur-sm"
            >
              {t('nav.qa')}
            </Link>
          </div>
        </div>

        {/* Right: Ask Question Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 hover:border-yellow-400/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-500/20 p-3 rounded-full">
              <FaQuestionCircle className="text-3xl text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t('hero.askTitle')}</h2>
              <p className="text-sm text-green-200">{t('hero.askSubtitle')}</p>
            </div>
          </div>

          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t('hero.askPlaceholder')}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-60 shadow-lg hover:shadow-xl"
              >
                <FaPaperPlane />
                {loading ? '...' : t('hero.askButton')}
              </button>
              {message && (
                <p className="text-center text-yellow-300 font-medium bg-yellow-500/10 p-2 rounded">
                  {message}
                </p>
              )}
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="mb-4 text-green-100">{t('hero.loginToAsk')}</p>
              <div className="flex gap-3 justify-center">
                <Link
                  to="/login"
                  className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-6 py-2 rounded-lg transition shadow-lg"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-2 rounded-lg border border-white/40 transition"
                >
                  {t('auth.register')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-10 h-3 bg-yellow-500'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          key={currentSlide}
          className="h-full bg-yellow-500"
          style={{
            animation: isPaused ? 'none' : 'progress 5s linear',
          }}
        ></div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}