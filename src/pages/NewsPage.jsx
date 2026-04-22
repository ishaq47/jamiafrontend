import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API, { API_URL } from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import Pagination from '../components/Pagination';

export default function NewsPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [data, setData] = useState({ news: [], pages: 1 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    API.get(`/news?lang=${language}&page=${page}&limit=9`).then((r) => setData(r.data));
  }, [language, page]);

  const getImageUrl = (img) =>
    img?.startsWith('/uploads/') ? `${API_URL}${img}` : img;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{t('news.title')}</h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.news.map((item) => (
            <article key={item._id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">
              {item.image && (
                <img src={getImageUrl(item.image)} alt="" className="w-full h-48 object-cover" />
              )}
              <div className="p-5">
                <span className="text-xs text-yellow-600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <h3 className="text-xl font-bold text-green-900 mt-2 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description?.substring(0, 150)}...</p>
              </div>
            </article>
          ))}
        </div>
        <Pagination page={page} pages={data.pages} onChange={setPage} />
      </div>
    </div>
  );
}