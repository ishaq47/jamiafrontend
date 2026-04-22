import Hero from '../components/Hero';
import Departments from '../components/Departments';
import News from '../components/News';
import QASection from '../components/QASection';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-green-900 mb-6">{t('about.title')}</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-700 leading-relaxed">{t('about.description')}</p>
      </section>
      <Departments />
      <QASection />
      <News />
    </>
  );
}