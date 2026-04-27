import Hero from '../components/Hero';
import Departments from '../components/Departments';
import News from '../components/News';
import QASection from '../components/QASection';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';
import { organizationSchema } from '../utils/seoSchemas';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="Jamia Uloom Islamia - Authentic Islamic Education & Fatawa"
        description="Get answers from qualified Islamic scholars. Browse Fatawa, learn Quran, apply for admission online."
        schema={organizationSchema}
      />
      <Hero />
      
      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{t('about.title')}</h2>
          <div className="w-12 h-1 bg-slate-900 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 leading-relaxed">{t('about.description')}</p>
        </div>
      </section>
      <Departments />
      <QASection />
      <News />
    </>
  );
}