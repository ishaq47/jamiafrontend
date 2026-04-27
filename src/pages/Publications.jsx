import { useTranslation } from 'react-i18next';
import { FaBook, FaDownload, FaEye } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Publications() {
  const { t } = useTranslation();
  
  const books = [
    { title: 'Tafseer Collection', pages: 500, category: 'Tafseer', year: 2023 },
    { title: 'Hadith Studies', pages: 350, category: 'Hadith', year: 2023 },
    { title: 'Fiqh Essentials', pages: 400, category: 'Fiqh', year: 2022 },
    { title: 'Arabic Grammar', pages: 280, category: 'Language', year: 2024 },
    { title: 'Seerah of Prophet', pages: 600, category: 'Seerah', year: 2023 },
    { title: 'Islamic History', pages: 450, category: 'History', year: 2022 },
    { title: 'Aqeedah Basics', pages: 200, category: 'Aqeedah', year: 2024 },
    { title: 'Quran Tajweed', pages: 180, category: 'Tajweed', year: 2023 },
  ];

  return (
    <>
      <SEO 
        title="Publications - Islamic Books | Jamia Uloom Islamia"
        description="Explore our collection of authentic Islamic books and research."
      />
      <PageHeader 
        title={t('pages.publicationsTitle')}
        subtitle={t('pages.publicationsContent')}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {books.map((b, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-400 transition">
              <div className="aspect-[3/4] bg-slate-100 rounded mb-4 flex items-center justify-center">
                <FaBook className="text-4xl text-slate-400" />
              </div>
              <span className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                {b.category}
              </span>
              <h3 className="font-bold text-slate-900 mt-2 mb-1">{b.title}</h3>
              <p className="text-xs text-slate-500 mb-3">{b.pages} pages • {b.year}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-sm py-2 rounded flex items-center justify-center gap-1">
                  <FaEye size={12} /> View
                </button>
                <button className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm py-2 px-3 rounded">
                  <FaDownload size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}