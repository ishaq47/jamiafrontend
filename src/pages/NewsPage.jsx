import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API, { API_URL } from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import { FaCalendarAlt, FaNewspaper, FaArrowRight } from 'react-icons/fa';
import Pagination from '../components/Pagination';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const [data, setData] = useState({ news: [], pages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const lang = i18n.language || language || 'en';
  const isRtl = lang === 'ur' || lang === 'ar';

  // Localized Fallbacks for Header Subtitle, Empty States, and Meta Info
  const localizedContent = {
    en: {
      metaTitle: 'News & Announcements | Jamia Darul Uloom Shah Mansoor',
      metaDesc: 'Stay updated with the latest events, announcements, and activities at Jamia Darul Uloom Shah Mansoor.',
      subtitle: 'Latest updates, events, and announcements from our institution',
      noNews: 'No news or announcements available at the moment.',
      readMore: 'Read Full Story'
    },
    ur: {
      metaTitle: 'خبریں و اعلانات - جامعہ دارالعلوم شاہ منصور',
      metaDesc: 'جامعہ دارالعلوم تعلیم القرآن شاہ منصور (صوابی) کی تازہ ترین خبریں، پروگرامز اور اہم اعلانات۔',
      subtitle: 'جامعہ کی تازہ ترین سرگرمیاں، تعلیمی خبریں اور اہم اعلانات',
      noNews: 'اس وقت کوئی خبر یا اعلان دستیاب نہیں ہے۔',
      readMore: 'مکمل خبر پڑھیں'
    },
    ar: {
      metaTitle: 'الأخبار والإعلانات - جامعة دار العلوم شاه منصور',
      metaDesc: 'تابع أحدث الأخبار والفعاليات والإعلانات الصادرة عن جامعة دار العلوم شاه منصور.',
      subtitle: 'آخر المستجدات والفعاليات والإعلانات الخاصة بالجامعة',
      noNews: 'لا توجد أخبار أو إعلانات متاحة في الوقت الحالي.',
      readMore: 'اقرأ المزيد'
    }
  };

  const current = localizedContent[lang] || localizedContent.en;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    API.get(`/news?lang=${language}&page=${page}&limit=9`)
      .then((res) => {
        if (isMounted) {
          setData(res.data || { news: [], pages: 1 });
        }
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [language, page]);

  const getImageUrl = (img) => {
    if (!img) return null;
    return img.startsWith('/uploads/') ? `${API_URL}${img}` : img;
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="font-serif bg-slate-50/50 min-h-screen">
      <SEO 
        title={current.metaTitle}
        description={current.metaDesc}
      />
      
      <PageHeader 
        title={t('news.title') || (isRtl ? 'الأخبار والإعلانات' : 'News & Announcements')}
        subtitle={current.subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
        
        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-xs animate-pulse">
                <div className="w-full h-48 bg-slate-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-5 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-100 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : data.news.length === 0 ? (
          /* Empty News State */
          <div className="bg-white border border-emerald-100/90 rounded-2xl p-12 text-center shadow-xs max-w-xl mx-auto">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaNewspaper size={26} />
            </div>
            <p className="text-slate-600 font-medium text-sm sm:text-base font-sans">
              {current.noNews}
            </p>
          </div>
        ) : (
          /* News Cards Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.news.map((item) => (
              <article 
                key={item._id || item.id} 
                className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 group flex flex-col justify-between relative"
              >
                {/* Top Subtle Gradient Hover Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-900 via-amber-400 to-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                <div>
                  {/* Image Container */}
                  {item.image ? (
                    <div className="w-full h-48 overflow-hidden bg-emerald-950/5 relative">
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.title || 'News'} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  ) : (
                    <div className="w-full h-36 bg-emerald-950/10 flex items-center justify-center text-emerald-800/40">
                      <FaNewspaper size={36} />
                    </div>
                  )}

                  {/* Card Content Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full w-fit mb-3">
                      <FaCalendarAlt size={11} className="text-amber-600" />
                      <span>{new Date(item.createdAt || Date.now()).toLocaleDateString(lang)}</span>
                    </div>

                    <h3 className="font-bold text-lg text-emerald-950 group-hover:text-emerald-800 transition leading-snug mb-3">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100/80 mt-auto flex items-center justify-between text-xs font-bold text-emerald-900 group-hover:text-amber-600 transition">
                  <span>{current.readMore}</span>
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Control */}
        {data.pages > 1 && (
          <div className="pt-4">
            <Pagination page={page} pages={data.pages} onChange={setPage} />
          </div>
        )}

      </div>
    </div>
  );
}