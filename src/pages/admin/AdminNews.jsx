import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../api/axios';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const emptyForm = {
  title: { en: '', ur: '', ar: '' },
  description: { en: '', ur: '', ar: '' },
  image: '',
};

export default function AdminNews() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => API.get('/news/all').then((r) => setNews(r.data));

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/news/${editId}`, form);
      } else {
        await API.post('/news', form);
      }
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      image: item.image || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this news?')) return;
    await API.delete(`/news/${id}`);
    load();
  };

  const updateField = (field, lang, value) => {
    setForm({ ...form, [field]: { ...form[field], [lang]: value } });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-900">
          {t('admin.manageNews')}
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm(emptyForm);
          }}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Close' : t('admin.addNews')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-6 space-y-4">
          <h2 className="text-xl font-bold text-green-900">
            {editId ? t('admin.editNews') : t('admin.addNews')}
          </h2>

          {/* Title Multi-language */}
          <div>
            <label className="block font-bold mb-2">{t('admin.title')}</label>
            <div className="grid md:grid-cols-3 gap-3">
              {['en', 'ur', 'ar'].map((lang) => (
                <input
                  key={lang}
                  type="text"
                  placeholder={`Title (${lang.toUpperCase()})`}
                  value={form.title[lang]}
                  onChange={(e) => updateField('title', lang, e.target.value)}
                  dir={lang === 'en' ? 'ltr' : 'rtl'}
                  required={lang === 'en'}
                  className="border rounded px-3 py-2 w-full"
                />
              ))}
            </div>
          </div>

          {/* Description Multi-language */}
          <div>
            <label className="block font-bold mb-2">{t('admin.description')}</label>
            <div className="grid md:grid-cols-3 gap-3">
              {['en', 'ur', 'ar'].map((lang) => (
                <textarea
                  key={lang}
                  placeholder={`Description (${lang.toUpperCase()})`}
                  value={form.description[lang]}
                  onChange={(e) => updateField('description', lang, e.target.value)}
                  dir={lang === 'en' ? 'ltr' : 'rtl'}
                  rows="4"
                  required={lang === 'en'}
                  className="border rounded px-3 py-2 w-full"
                />
              ))}
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block font-bold mb-2">{t('admin.image')}</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
            {form.image && (
              <img src={form.image} alt="" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>

          <button
            type="submit"
            className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            {t('admin.save')}
          </button>
        </form>
      )}

      {/* News List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {news.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow overflow-hidden">
            {item.image && (
              <img src={item.image} alt="" className="w-full h-48 object-cover" />
            )}
            <div className="p-5">
              <h3 className="font-bold text-green-900 mb-1">{item.title?.en}</h3>
              <p className="text-sm text-gray-600 mb-1" dir="rtl">{item.title?.ur}</p>
              <p className="text-sm text-gray-600 mb-3" dir="rtl">{item.title?.ar}</p>
              <p className="text-gray-700 text-sm mb-4">
                {item.description?.en?.substring(0, 100)}...
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-green-900 py-2 rounded flex items-center justify-center gap-2 font-bold"
                >
                  <FaEdit /> {t('admin.edit')}
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <FaTrash /> {t('admin.delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}