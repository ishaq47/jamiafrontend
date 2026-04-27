import { useTranslation } from 'react-i18next';
import { FaBuilding, FaBookOpen, FaUsers, FaAward, FaCheckCircle } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { icon: FaBuilding, label: '50+ Years', value: 'Established' },
    { icon: FaBookOpen, label: '6', value: 'Departments' },
    { icon: FaUsers, label: '5000+', value: 'Students' },
    { icon: FaAward, label: '1000+', value: 'Graduates' },
  ];

  const values = [
    'Authentic Islamic Education following Ahl al-Sunnah',
    'Traditional curriculum with modern teaching methods',
    'Qualified scholars and experienced teachers',
    'Focus on character building and spiritual growth',
    'International student community',
    'Research-based learning environment',
  ];

  return (
    <>
      <SEO 
        title="About Us - Jamia Uloom Islamia"
        description="Learn about Jamia Uloom Islamia - 50+ years of authentic Islamic education with qualified scholars."
      />
      <PageHeader 
        title={t('pages.aboutTitle')} 
        subtitle={t('tagline')}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission */}
        <div className="max-w-3xl mb-16">
          <p className="text-lg text-slate-700 leading-relaxed">
            {t('pages.aboutContent')}
          </p>
        </div>

        {/* Stats Grid - Outlined Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition">
              <s.icon className="text-2xl text-slate-700 mb-3" />
              <p className="text-2xl font-bold text-slate-900">{s.label}</p>
              <p className="text-sm text-slate-500 mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Values</h2>
            <ul className="space-y-3">
              {values.map((v, i) => (
                <li key={i} className="flex gap-3">
                  <FaCheckCircle className="text-slate-700 mt-1 flex-shrink-0" size={16} />
                  <span className="text-slate-700">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              To preserve and disseminate authentic Islamic knowledge through traditional and contemporary methods, producing scholars who serve the Ummah with wisdom and dedication.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-6">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To be a leading center of Islamic learning that bridges traditional scholarship with modern challenges, fostering a generation of knowledgeable and pious Muslims.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}