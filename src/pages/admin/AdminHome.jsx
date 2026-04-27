import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../api/axios';
import { FaQuestion, FaCheckCircle, FaClock, FaNewspaper, FaUsers } from 'react-icons/fa';

export default function AdminHome() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ total: 0, pending: 0, answered: 0, news: 0, users: 0 });

  useEffect(() => {
    Promise.all([
      API.get('/questions'),
      API.get('/news/admin/all'),
      API.get('/users'),
    ]).then(([qRes, nRes, uRes]) => {
      const qs = qRes.data;
      setStats({
        total: qs.length,
        pending: qs.filter((q) => q.status === 'pending').length,
        answered: qs.filter((q) => q.status === 'answered').length,
        news: nRes.data.length,
        users: uRes.data.length,
      });
    });
  }, []);

  const cards = [
    { label: t('admin.totalQuestions'), value: stats.total, icon: FaQuestion, color: 'bg-blue-500' },
    { label: t('admin.pendingQuestions'), value: stats.pending, icon: FaClock, color: 'bg-yellow-500' },
    { label: t('admin.answeredQuestions'), value: stats.answered, icon: FaCheckCircle, color: 'bg-green-600' },
    { label: t('admin.totalNews'), value: stats.news, icon: FaNewspaper, color: 'bg-purple-500' },
    { label: t('admin.totalUsers'), value: stats.users, icon: FaUsers, color: 'bg-pink-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">{t('admin.dashboard')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {cards.map((c) => (
          <div key={c.label} className="bg-white p-6 rounded-xl shadow">
            <div className={`${c.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
              <c.icon className="text-white text-2xl" />
            </div>
            <p className="text-gray-500 text-sm">{c.label}</p>
            <p className="text-3xl font-bold text-gray-800">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}