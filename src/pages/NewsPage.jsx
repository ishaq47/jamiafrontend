import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API, { API_URL } from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import { FaCalendarAlt } from 'react-icons/fa';
import Pagination from '../components/Pagination';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function NewsPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [data, setData] = useState({ news: [], pages: 1 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    API.get(`/news?lang=${language}&page=${page}&limit=9`).then((r) => setData(r.data));
  }, [language, page]);

  const getImageUrl = (img) => img?.startsWith('/uploads/') ? `${API_URL}${img}` : img;

  return (
    <>
      <SEO 
        title="News & Announcements | Jamia Uloom Islamia"
        description="Latest news, events, and announcements."
      />
      <PageHeader 
        title={t('news.title')}
        subtitle="Stay updated with our latest activities"
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.news.map((item) => (
            <article key={item._id} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition">
              {item.image && (
                <img src={getImageUrl(item.image)} alt="" className="w-full h-44 object-cover" />
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <FaCalendarAlt size={11} />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description?.substring(0, 120)}...</p>
              </div>
            </article>
          ))}
        </div>

        {data.news.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <p className="text-slate-500">No news available</p>
          </div>
        )}

        <Pagination page={page} pages={data.pages} onChange={setPage} />
      </div>
    </>
  );
}