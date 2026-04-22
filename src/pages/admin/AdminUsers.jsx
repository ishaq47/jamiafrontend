import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../api/axios';
import { FaUserShield, FaUser, FaBan, FaCheck, FaTrash } from 'react-icons/fa';

export default function AdminUsers() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const load = () => API.get('/users').then((r) => setUsers(r.data));

  useEffect(() => { load(); }, []);

  const toggleBlock = async (id) => {
    await API.put(`/users/${id}/block`);
    load();
  };

  const toggleRole = async (id) => {
    if (!window.confirm('Change user role?')) return;
    await API.put(`/users/${id}/role`);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user and all their questions?')) return;
    await API.delete(`/users/${id}`);
    load();
  };

  const filtered = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(search?.toLowerCase()) ||
      u.email?.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-900 mb-6">{t('admin.manageUsers')}</h1>

      <input
        type="text" placeholder={t('common.search')}
        value={search} onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 px-4 py-2 border rounded-lg mb-6"
      />

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-900 text-white">
            <tr>
              <th className="p-3 text-start">Name</th>
              <th className="p-3 text-start">{t('auth.email')}</th>
              <th className="p-3 text-start">{t('admin.role')}</th>
              <th className="p-3 text-start">{t('admin.status')}</th>
              <th className="p-3 text-start">{t('admin.joined')}</th>
              <th className="p-3 text-start">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-bold">{u.username}</td>
                <td className="p-3 text-sm">{u.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 w-fit ${
                    u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {u.role === 'admin' ? <FaUserShield /> : <FaUser />}
                    {u.role}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    u.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {u.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="p-3 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <div className="flex gap-1 flex-wrap">
                    <button
                      onClick={() => toggleRole(u._id)}
                      className="px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
                      title={u.role === 'admin' ? t('admin.removeAdmin') : t('admin.makeAdmin')}
                    >
                      <FaUserShield />
                    </button>
                    <button
                      onClick={() => toggleBlock(u._id)}
                      className={`px-3 py-1 rounded text-xs text-white ${
                        u.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'
                      }`}
                      title={u.isBlocked ? t('admin.unblock') : t('admin.block')}
                    >
                      {u.isBlocked ? <FaCheck /> : <FaBan />}
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
