import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBook, FaPray, FaHeart, FaUsers, FaUtensils, FaStore, FaArrowRight } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Fatawa() {
  const { t } = useTranslation();
  
  const categories = [
    { icon: FaPray, title: 'Salah & Worship', desc: 'Prayers, fasting, hajj rulings', count: 124 },
    { icon: FaHeart, title: 'Family & Marriage', desc: 'Marriage, divorce, family matters', count: 89 },
    { icon: FaStore, title: 'Business & Finance', desc: 'Halal trade, banking, investments', count: 76 },
    { icon: FaUtensils, title: 'Food & Drink', desc: 'Halal/haram food rulings', count: 54 },
    { icon: FaUsers, title: 'Social Issues', desc: 'Modern social challenges', count: 67 },
    { icon: FaBook, title: 'Aqeedah', desc: 'Islamic beliefs and creed', count: 45 },
  ];

  return (
    <>
      <SEO 
        title="Fatawa - Islamic Rulings | Jamia Uloom Islamia"
        description="Browse authentic Islamic rulings (Fatawa) on various topics from qualified scholars."
      />
      <PageHeader 
        title={t('pages.fatawaTitle')}
        subtitle={t('pages.fatawaContent')}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {categories.map((c, i) => (
            <Link 
              key={i} 
              to="/qa"
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-400 transition group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-900 transition">
                  <c.icon className="text-xl text-slate-700 group-hover:text-white transition" />
                </div>
                <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                  {c.count} fatawa
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{c.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{c.desc}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900 group-hover:gap-3 transition-all">
                Browse <FaArrowRight size={12} className="rtl:rotate-180" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Have a Question?</h3>
          <p className="text-slate-600 mb-6">Ask our qualified scholars and get authentic answers</p>
          <Link to="/qa" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium">
            Ask a Question <FaArrowRight className="rtl:rotate-180" size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}