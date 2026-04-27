import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaClipboardList, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Admissions() {
  const { t } = useTranslation();
  
  const requirements = [
    'Must be at least 12 years old',
    'Basic reading knowledge of Quran',
    'Medical fitness certificate',
    'Parent/Guardian consent',
    'Previous academic records',
    'Valid identity document',
  ];

  const steps = [
    { num: 1, title: 'Fill Application', desc: 'Complete the online application form with required details' },
    { num: 2, title: 'Submit Documents', desc: 'Upload required documents and photographs' },
    { num: 3, title: 'Entrance Test', desc: 'Take the assessment test (where applicable)' },
    { num: 4, title: 'Get Admission', desc: 'Receive confirmation and join the institution' },
  ];

  return (
    <>
      <SEO 
        title="Admissions - Apply Online | Jamia Uloom Islamia"
        description="Apply online for Islamic education programs. Easy 4-step admission process."
      />
      <PageHeader 
        title={t('pages.admissionsTitle')}
        subtitle="Begin your journey of Islamic learning"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero CTA */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded mb-3">
              ADMISSIONS OPEN
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Academic Year 2024-2025</h2>
            <p className="text-slate-600">{t('pages.admissionsContent')}</p>
          </div>
          <Link 
            to="/admissions/apply" 
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap"
          >
            Apply Now <FaArrowRight className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Requirements */}
          <div className="bg-white border border-slate-200 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <FaClipboardList className="text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Requirements</h3>
            </div>
            <ul className="space-y-3">
              {requirements.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <FaCheckCircle className="text-slate-700 mt-1 flex-shrink-0" size={14} />
                  <span className="text-slate-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Dates */}
          <div className="bg-white border border-slate-200 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Important Dates</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Application Opens', date: 'January 15, 2025' },
                { label: 'Application Deadline', date: 'March 30, 2025' },
                { label: 'Entrance Test', date: 'April 15, 2025' },
                { label: 'Result Announcement', date: 'May 1, 2025' },
                { label: 'Classes Begin', date: 'June 1, 2025' },
              ].map((d, i) => (
                <div key={i} className="flex justify-between pb-3 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 text-sm">{d.label}</span>
                  <span className="font-medium text-slate-900 text-sm">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Application Process</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="bg-white border border-slate-200 rounded-lg p-6 relative">
                <div className="text-4xl font-bold text-slate-200 absolute top-3 end-4">
                  {step.num.toString().padStart(2, '0')}
                </div>
                <h4 className="font-bold text-slate-900 mb-2 mt-2">{step.title}</h4>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}