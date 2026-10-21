import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import SEO from '../components/SEO';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const lang = i18n.language || 'en';
  const isRtl = lang === 'ur' || lang === 'ar';

  const translations = {
    en: {
      pageTitle: 'Contact Us',
      bannerNotice: 'Send general inquiries here. For religious questions and rulings, please visit the Dar-ul-Iftaa page.',
      institutionName: 'Jamia Darul-Uloom Shah Mansoor',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Email Address',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Type your message here...',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      successMsg: 'Your message has been sent successfully! We will contact you soon.',
      table: {
        address: 'Address',
        addressVal: 'Shah Mansoor, Swabi, Khyber Pakhtunkhwa, Pakistan, Post Code : 23430',
        phone: 'Phone',
        fax: 'Fax',
        email: 'E-mail',
        bank: 'Bank',
        bankVal: 'Meezan Bank Ltd / Bank Islami',
      }
    },
    ur: {
      pageTitle: 'رابطہ',
      bannerNotice: 'عمومی معلومات یہاں ارسال کریں۔ اور دینی مسائل کیلئے دارالافتاء کے پیج پہ رابطہ کریں۔',
      institutionName: 'جامعہ دارالعلوم شاہ منصور',
      namePlaceholder: 'نام',
      emailPlaceholder: 'ای میل ایڈریس',
      subjectPlaceholder: 'موضوع',
      messagePlaceholder: 'اپنا مقصد ٹائپ کریں...',
      sendBtn: 'ارسال کریں',
      sendingBtn: 'ارسال ہو رہا ہے...',
      successMsg: 'پیغام موصول ہو گیا ہے! ہم جلد آپ سے رابطہ کریں گے۔',
      table: {
        address: 'پتہ',
        addressVal: 'شاہ منصور، صوابی، خیبر پختونخوا، پاکستان، پوسٹ کوڈ : 23430',
        phone: 'فون نمبر',
        fax: 'فیکس',
        email: 'ای میل',
        bank: 'بینک',
        bankVal: 'میزان بینک لمیٹڈ / بینک اسلامی',
      }
    },
    ar: {
      pageTitle: 'اتصل بنا',
      bannerNotice: 'أرسل استفساراتك العامة هنا. وللأسئلة والفتوى الدينية يرجى زيارة صفحة دار الإفتاء.',
      institutionName: 'جامعة دار العلوم شاه منصور',
      namePlaceholder: 'الاسم الكامل',
      emailPlaceholder: 'البريد الإلكتروني',
      subjectPlaceholder: 'الموضوع',
      messagePlaceholder: 'اكتب رسالتك هنا...',
      sendBtn: 'إرسال',
      sendingBtn: 'جاري الإرسال...',
      successMsg: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.',
      table: {
        address: 'العنوان',
        addressVal: 'شاه منصور، صوابي، خيبر بختونخوا، باكستان، الرمز البريدي : 23430',
        phone: 'الهاتف',
        fax: 'الفاكس',
        email: 'البريد الإلكتروني',
        bank: 'البنك',
        bankVal: 'بنك ميزان المحدود / بنك إسلامي',
      }
    }
  };

  const content = translations[lang] || translations.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 800);
  };

  const contactTableData = [
    { label: content.table.address, val: content.table.addressVal },
    { label: content.table.phone, val: '+92-938-000000, +92-938-111111' },
    { label: content.table.fax, val: '+92-938-222222' },
    { label: content.table.email, val: 'info@jamia.edu.pk' },
    { label: content.table.bank, val: content.table.bankVal },
  ];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <SEO 
        title={`${content.pageTitle} - ${content.institutionName}`}
        description="Get in touch with Jamia Darul Uloom Shah Mansoor."
      />

      {/* Header Banner - Islamic Dark Green with Gold Accent */}
      <div className="bg-emerald-900 border-b-4 border-amber-500 relative py-10 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-repeat pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M30 30L0 0h60L30 30zM30 30L0 60h60L30 30z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-400 font-serif tracking-wide">
            {content.pageTitle}
          </h1>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Form Section */}
            <div className="bg-white border border-slate-300 rounded shadow-sm overflow-hidden">
              <div className="bg-emerald-700 text-white p-4 text-center">
                <h2 className="text-sm sm:text-base font-semibold leading-relaxed">
                  {content.bannerNotice}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-slate-50">
                <div>
                  <input 
                    type="text" 
                    required 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={content.namePlaceholder}
                    className="w-full border border-slate-300 px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:border-emerald-700 transition"
                  />
                </div>

                <div>
                  <input 
                    type="email" 
                    required 
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={content.emailPlaceholder}
                    className="w-full border border-slate-300 px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:border-emerald-700 transition"
                  />
                </div>

                <div>
                  <input 
                    type="text" 
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={content.subjectPlaceholder}
                    className="w-full border border-slate-300 px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:border-emerald-700 transition"
                  />
                </div>

                <div>
                  <textarea 
                    required 
                    rows="5" 
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={content.messagePlaceholder}
                    className="w-full border border-slate-300 px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:border-emerald-700 resize-none transition"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-2.5 px-8 rounded flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-60 text-sm"
                >
                  <FaPaperPlane size={13} className={isRtl ? 'rotate-180' : ''} /> 
                  {loading ? content.sendingBtn : content.sendBtn}
                </button>

                {sent && (
                  <div className="flex items-center gap-2 text-sm text-emerald-900 bg-emerald-50 border border-emerald-300 p-3 rounded font-medium">
                    <FaCheckCircle className="text-emerald-700" />
                    <span>{content.successMsg}</span>
                  </div>
                )}
              </form>
            </div>

            {/* Information Table Section */}
            <div className="bg-white border border-slate-300 rounded shadow-sm overflow-hidden">
              <div className="bg-emerald-900 text-white p-3 text-center font-bold text-lg border-b border-emerald-950">
                {content.institutionName}
              </div>

              <div className="divide-y divide-slate-200">
                {contactTableData.map((row, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-stretch text-sm">
                    {/* Value Field */}
                    <div className="flex-1 p-3.5 text-slate-700 font-medium bg-white flex items-center">
                      {row.val}
                    </div>
                    {/* Label Field */}
                    <div className="w-full sm:w-32 bg-slate-50 border-t sm:border-t-0 border-slate-200 p-3.5 text-slate-900 font-bold flex items-center justify-center sm:justify-start">
                      {row.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Map Location Section */}
          <div className="mt-8 bg-white border border-slate-300 rounded overflow-hidden shadow-sm p-2">
            <iframe
              title="Jamia Location Map"
              src="https://maps.google.com/maps?q=Shah%20Mansoor%20Swabi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-72 border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}