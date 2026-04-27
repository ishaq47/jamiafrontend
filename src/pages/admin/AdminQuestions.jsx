import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../api/axios';
import { FaCheck, FaTrash, FaChevronDown } from 'react-icons/fa';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function AdminQuestions() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [answer, setAnswer] = useState('');
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const load = () => API.get('/questions').then((r) => setQuestions(r.data));

  useEffect(() => { load(); }, []);

  const handleAnswer = async (id) => {
    await API.put(`/questions/${id}/answer`, { answer, isPublic: true });
    setActiveId(null);
    setAnswer('');
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    await API.delete(`/questions/${id}`);
    load();
  };

  const filtered = questions.filter((q) =>
    filter === 'all' ? true : q.status === filter
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'blockquote'],
      ['clean'],
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">{t('admin.manageQuestions')}</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'answered'].map((f) => (
          <button
            key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === f ? 'bg-slate-800 text-white' : 'bg-white text-gray-700'
            }`}
          >
            {f} ({filter === f ? filtered.length : questions.filter(q => f === 'all' ? true : q.status === f).length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((q) => (
          <div key={q._id} className="bg-white rounded-xl shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    {q.userName} ({q.userEmail}) • {new Date(q.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded ${
                      q.status === 'answered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {q.status}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                      {t(`categories.${q.category}`)}
                    </span>
                  </div>
                </div>
                <button onClick={() => handleDelete(q._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>

              <button
                onClick={() => setExpanded(expanded === q._id ? null : q._id)}
                className="w-full text-start flex justify-between items-center"
              >
                <p className="font-bold text-gray-800 flex-1">{q.question}</p>
                <FaChevronDown className={`text-gray-400 transition-transform ${expanded === q._id ? 'rotate-180' : ''}`} />
              </button>

              <div className={`grid transition-all duration-300 ${expanded === q._id ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  {q.answer && (
                    <div className="p-3 bg-slate-50 rounded mb-3">
                      <p className="text-sm font-bold text-slate-800 mb-1">Answer:</p>
                      <div className="text-gray-700 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: q.answer }} />
                    </div>
                  )}

                  {activeId === q._id ? (
                    <div className="space-y-2">
                      <ReactQuill
                        theme="snow" value={answer} onChange={setAnswer}
                        modules={modules} placeholder={t('admin.typeAnswer')}
                        className="bg-white"
                      />
                      <div className="flex gap-2 mt-12">
                        <button onClick={() => handleAnswer(q._id)}
                          className="bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2">
                          <FaCheck /> {t('admin.submit')}
                        </button>
                        <button onClick={() => { setActiveId(null); setAnswer(''); }}
                          className="bg-gray-300 px-5 py-2 rounded-lg">
                          {t('common.cancel')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => { setActiveId(q._id); setAnswer(q.answer || ''); }}
                      className="border border-slate-200 text-slate-700 hover:border-slate-300 cursor-pointer px-3 py-1 rounded-lg font-bold">
                      {q.answer ? t('admin.edit') : t('admin.answerQuestion')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}