import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { FaCheckCircle, FaUpload } from 'react-icons/fa';

export default function ApplyForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', fatherName: '', cnic: '', dateOfBirth: '', gender: 'male',
    nationality: '', email: '', phone: '', address: '', city: '', country: '',
    department: 'dars', previousEducation: '', previousInstitute: '',
    quranMemorization: '', languagesKnown: '', motivationLetter: '',
  });
  const [files, setFiles] = useState({ document: null, photo: null });

  const update = (key, val) => setForm({ ...form, [key]: val });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (files.document) fd.append('document', files.document);
      if (files.photo) fd.append('photo', files.photo);

      const { data } = await API.post('/applications', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAppId(data.id);
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.error || 'Error submitting');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-white border border-slate-200 rounded-lg p-8">
          <FaCheckCircle className="text-emerald-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
          <p className="text-slate-600 mb-2">Thank you for applying.</p>
          <p className="text-sm text-slate-500 mb-6">Application ID: <code className="bg-slate-100 px-2 py-1 rounded">{appId}</code></p>
          <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-6 py-2 rounded-lg">Back Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('apply.title')}</h1>
          <p className="text-slate-600">{t('apply.subtitle')}</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
              }`}>{s}</div>
              {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-slate-900' : 'bg-slate-200'}`}></div>}
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          {step === 1 && (
            <>
              <h2 className="font-bold text-lg mb-4">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="Full Name *" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg" />
                <input required placeholder="Father's Name *" value={form.fatherName} onChange={(e) => update('fatherName', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg" />
                <input placeholder="CNIC / ID Number" value={form.cnic} onChange={(e) => update('cnic', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg" />
                <input type="date" required value={form.dateOfBirth} onChange={(e) => update('dateOfBirth', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg" />
                <select required value={form.gender} onChange={(e) => update('gender', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input placeholder="Nationality" value={form.nationality} onChange={(e) => update('nationality', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg" />
              </div>
              <button type="button" onClick={() => setStep(2)} className="bg-slate-900 text-white px-6 py-2 rounded-lg mt-4">Next →</button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-bold text-lg mb-4">Contact & Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="email" required placeholder="Email *" value={form.email} onChange={(e) => update('email', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg" />
                <input required placeholder="Phone *" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg" />
                <input placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg" />
                <input placeholder="Country" value={form.country} onChange={(e) => update('country', e.target.value)} className="border border-slate-300 px-3 py-2 rounded-lg" />
              </div>
              <textarea required placeholder="Full Address *" rows="3" value={form.address} onChange={(e) => update('address', e.target.value)} className="w-full border border-slate-300 px-3 py-2 rounded-lg"></textarea>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={() => setStep(1)} className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg">← Back</button>
                <button type="button" onClick={() => setStep(3)} className="bg-slate-900 text-white px-6 py-2 rounded-lg">Next →</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-bold text-lg mb-4">Education & Documents</h2>
              <select required value={form.department} onChange={(e) => update('department', e.target.value)} className="w-full border border-slate-300 px-3 py-2 rounded-lg">
                <option value="dars">Dars-e-Nizami</option>
                <option value="hifz">Hifz-ul-Quran</option>
                <option value="tajweed">Tajweed</option>
                <option value="ifta">Ifta</option>
                <option value="hadith">Hadith Studies</option>
                <option value="arabic">Arabic Literature</option>
              </select>
              <input placeholder="Previous Education" value={form.previousEducation} onChange={(e) => update('previousEducation', e.target.value)} className="w-full border border-slate-300 px-3 py-2 rounded-lg" />
              <input placeholder="Previous Institute" value={form.previousInstitute} onChange={(e) => update('previousInstitute', e.target.value)} className="w-full border border-slate-300 px-3 py-2 rounded-lg" />
              <input placeholder="Quran Memorization (e.g., 5 Para)" value={form.quranMemorization} onChange={(e) => update('quranMemorization', e.target.value)} className="w-full border border-slate-300 px-3 py-2 rounded-lg" />
              <input placeholder="Languages Known" value={form.languagesKnown} onChange={(e) => update('languagesKnown', e.target.value)} className="w-full border border-slate-300 px-3 py-2 rounded-lg" />
              <textarea placeholder="Why do you want to join? (Motivation Letter)" rows="4" value={form.motivationLetter} onChange={(e) => update('motivationLetter', e.target.value)} className="w-full border border-slate-300 px-3 py-2 rounded-lg"></textarea>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Photo</label>
                  <input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, photo: e.target.files[0] })} className="text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Documents (PDF/Image)</label>
                  <input type="file" onChange={(e) => setFiles({ ...files, document: e.target.files[0] })} className="text-sm" />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button type="button" onClick={() => setStep(2)} className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg">← Back</button>
                <button type="submit" disabled={loading} className="bg-emerald-600 text-white px-6 py-2 rounded-lg disabled:opacity-60">
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}