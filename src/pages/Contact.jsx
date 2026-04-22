import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{t('pages.contactTitle')}</h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {[
            { icon: FaMapMarkerAlt, label: t('pages.address'), val: 'Main Street, Karachi, Pakistan' },
            { icon: FaPhone, label: t('pages.phone'), val: '+92 300 0000000' },
            { icon: FaEnvelope, label: t('pages.email'), val: 'info@jamia.edu' },
          ].map((c, i) => (
            <div key={i} className="flex gap-4 bg-white p-5 rounded-xl shadow">
              <div className="bg-green-800 text-white p-4 rounded-full">
                <c.icon className="text-xl" />
              </div>
              <div>
                <p className="font-bold text-gray-500 text-sm">{c.label}</p>
                <p className="text-lg">{c.val}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-4">
          <input type="text" required placeholder={t('auth.name')}
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg" />
          <input type="email" required placeholder={t('auth.email')}
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg" />
          <textarea required rows="5" placeholder={t('pages.yourMessage')}
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"></textarea>
          <button className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
            <FaPaperPlane /> {t('pages.send')}
          </button>
        </form>
      </div>
    </div>
  );
}