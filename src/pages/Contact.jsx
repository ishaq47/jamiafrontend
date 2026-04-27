import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  const contactInfo = [
    { icon: FaMapMarkerAlt, label: t('pages.address'), val: 'Shah Mansoor, Swabi, Pakistan' },
    { icon: FaPhone, label: t('pages.phone'), val: '+92 300 0000000' },
    { icon: FaEnvelope, label: t('pages.email'), val: 'info@jamia.edu' },
    { icon: FaClock, label: 'Office Hours', val: 'Mon-Fri: 9 AM - 5 PM' },
  ];

  return (
    <>
      <SEO 
        title="Contact Us - Jamia Uloom Islamia"
        description="Get in touch with Jamia Uloom Islamia. Contact information, address, and inquiry form."
      />
      <PageHeader 
        title={t('pages.contactTitle')}
        subtitle="We'd love to hear from you"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              {contactInfo.map((c, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 flex gap-4 hover:border-slate-300 transition">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <c.icon className="text-slate-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{c.label}</p>
                    <p className="text-slate-900 font-medium mt-1">{c.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white border border-slate-200 rounded-lg mt-4 aspect-video flex items-center justify-center text-slate-400">
              <FaMapMarkerAlt size={32} />
              <span className="ml-2">Map Location</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                <input 
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input 
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                <input 
                  type="text" value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea 
                  required rows="5" value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-900 resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition">
                <FaPaperPlane size={14} /> Send Message
              </button>
              {sent && (
                <p className="text-center text-sm text-emerald-700 bg-emerald-50 p-2 rounded">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}