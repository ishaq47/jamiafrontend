import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API, { API_URL } from '../../api/axios';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaUpload, FaLink } from 'react-icons/fa';

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'url'
  const [loading, setLoading] = useState(false);

  const load = () => API.get('/news/admin/all').then((r) => setNews(r.data));

  useEffect(() => {
    load();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', JSON.stringify(form.title));
      formData.append('description', JSON.stringify(form.description));

      if (uploadMode === 'file' && imageFile) {
        formData.append('image', imageFile);
      } else if (uploadMode === 'url' && form.image) {
        formData.append('image', form.image);
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (editId) {
        await API.put(`/news/${editId}`, formData, config);
      } else {
        await API.post('/news', formData, config);
      }

      resetForm();
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving news');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setUploadMode('file');
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title || { en: '', ur: '', ar: '' },
      description: item.description || { en: '', ur: '', ar: '' },
      image: item.image || '',
    });
    setImagePreview(
      item.image?.startsWith('/uploads/')
        ? `${API_URL}${item.image}`
        : item.image || ''
    );
    setUploadMode(item.image?.startsWith('/uploads/') ? 'file' : 'url');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('common.confirmDelete') || 'Delete this news?')) return;
    await API.delete(`/news/${id}`);
    load();
  };

  const updateField = (field, lang, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const getImageUrl = (img) =>
    img?.startsWith('/uploads/') ? `${API_URL}${img}` : img;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">
          {t('admin.manageNews')}
        </h1>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? t('common.cancel') : t('admin.addNews')}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            {editId ? t('admin.editNews') : t('admin.addNews')}
          </h2>

          {/* Title */}
          <div className="mb-5">
            <label className="block font-semibold text-slate-700 mb-2">
              {t('admin.title')}
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {['en', 'ur', 'ar'].map((lang) => (
                <input
                  key={lang}
                  type="text"
                  placeholder={`Title (${lang.toUpperCase()})`}
                  value={form.title[lang] || ''}
                  onChange={(e) => updateField('title', lang, e.target.value)}
                  dir={lang === 'en' ? 'ltr' : 'rtl'}
                  required={lang === 'en'}
                  className="border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-slate-500"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block font-semibold text-slate-700 mb-2">
              {t('admin.description')}
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {['en', 'ur', 'ar'].map((lang) => (
                <textarea
                  key={lang}
                  placeholder={`Description (${lang.toUpperCase()})`}
                  value={form.description[lang] || ''}
                  onChange={(e) => updateField('description', lang, e.target.value)}
                  dir={lang === 'en' ? 'ltr' : 'rtl'}
                  rows={4}
                  required={lang === 'en'}
                  className="border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-slate-500 resize-y"
                />
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block font-semibold text-slate-700 mb-2">
              {t('admin.image')}
            </label>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all ${
                  uploadMode === 'file'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FaUpload /> {t('common.uploadImage')}
              </button>
              <span className="self-center text-slate-400">or</span>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all ${
                  uploadMode === 'url'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FaLink /> {t('common.imageUrl')}
              </button>
            </div>

            {uploadMode === 'file' ? (
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-slate-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <FaUpload className="mx-auto text-5xl text-slate-400 mb-3" />
                  <p className="text-slate-600 font-medium">
                    {t('common.selectImage')}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    JPG, PNG, WEBP • Max 5MB
                  </p>
                </label>
              </div>
            ) : (
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={(e) => {
                  setForm({ ...form, image: e.target.value });
                  setImagePreview(e.target.value);
                }}
                className="border border-slate-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-slate-500"
              />
            )}

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="h-44 w-full object-cover rounded-2xl border border-slate-200"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white py-3.5 rounded-xl font-semibold transition-colors"
          >
            {loading ? 'Saving...' : t('admin.save')}
          </button>
        </form>
      )}

      {/* Compact News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {news.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
          >
            {item.image && (
              <div className="relative h-40 overflow-hidden">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title?.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="p-4">
              <h3 className="font-semibold text-slate-800 line-clamp-2 mb-1 text-base">
                {item.title?.en}
              </h3>

              <p
                className="text-xs text-slate-500 line-clamp-2 mb-3"
                dir="rtl"
              >
                {item.title?.ur}
              </p>

              <p className="text-[10px] text-slate-400 mb-4 line-clamp-1">
                {item.description?.en?.substring(0, 80)}...
              </p>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-700 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FaEdit size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FaTrash size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No news found. Add some using the button above.
        </div>
      )}
    </div>
  );
}