import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../api/axios';
import { FaCheck, FaTrash } from 'react-icons/fa';

export default function AdminQuestions() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [answer, setAnswer] = useState('');
  const [filter, setFilter] = useState('all');

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

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-900 mb-6">
        {t('admin.manageQuestions')}
      </h1>

      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'answered'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === f ? 'bg-green-800 text-white' : 'bg-white text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((q) => (
          <div key={q._id} className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-500">
                  {q.userName} ({q.userEmail}) •{' '}
                  {new Date(q.createdAt).toLocaleString()}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    q.status === 'answered'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {q.status}
                </span>
              </div>
              <button
                onClick={() => handleDelete(q._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>

            <p className="font-bold text-gray-800 mb-3">{q.question}</p>

            {q.answer && (
              <div className="p-3 bg-green-50 rounded mb-3">
                <p className="text-sm font-bold text-green-800 mb-1">Answer:</p>
                <p className="text-gray-700 whitespace-pre-wrap">{q.answer}</p>
              </div>
            )}

            {activeId === q._id ? (
              <div className="space-y-2">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={t('admin.typeAnswer')}
                  rows="4"
                  className="w-full border rounded p-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAnswer(q._id)}
                    className="bg-green-700 text-white px-5 py-2 rounded flex items-center gap-2"
                  >
                    <FaCheck /> {t('admin.submit')}
                  </button>
                  <button
                    onClick={() => { setActiveId(null); setAnswer(''); }}
                    className="bg-gray-300 px-5 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setActiveId(q._id); setAnswer(q.answer || ''); }}
                className="bg-yellow-500 text-green-900 px-4 py-2 rounded font-bold"
              >
                {q.answer ? t('admin.edit') : t('admin.answerQuestion')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}