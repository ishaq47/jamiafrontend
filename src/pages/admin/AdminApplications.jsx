import { useEffect, useState } from 'react';
import API, { API_URL } from '../../api/axios';
import { FaCheck, FaTimes, FaTrash, FaEye } from 'react-icons/fa';

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');

  const load = () => API.get('/applications').then((r) => setApps(r.data));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}/status`, { status, adminNote: note });
    setSelected(null); setNote(''); load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await API.delete(`/applications/${id}`);
    load();
  };

  const filtered = apps.filter(a => filter === 'all' ? true : a.status === filter);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Applications</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'approved', 'rejected'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg capitalize text-sm ${
            filter === f ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200'
          }`}>
            {f} ({apps.filter(a => f === 'all' ? true : a.status === f).length})
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((app) => (
          <div key={app._id} className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold">{app.fullName}</h3>
                <p className="text-xs text-slate-500">{app.email} • {app.phone}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                app.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>{app.status}</span>
            </div>
            <p className="text-sm text-slate-600">Department: <strong>{app.department}</strong></p>
            <p className="text-sm text-slate-600">DOB: {new Date(app.dateOfBirth).toLocaleDateString()}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => setSelected(app)} className="flex-1 bg-slate-100 hover:bg-slate-200 py-2 rounded text-sm flex items-center justify-center gap-1">
                <FaEye /> View
              </button>
              <button onClick={() => handleDelete(app._id)} className="bg-red-50 hover:bg-red-100 text-red-600 px-3 rounded">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selected.fullName}</h2>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <p><strong>Father:</strong> {selected.fatherName}</p>
                <p><strong>CNIC:</strong> {selected.cnic}</p>
                <p><strong>DOB:</strong> {new Date(selected.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Gender:</strong> {selected.gender}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Phone:</strong> {selected.phone}</p>
                <p className="col-span-2"><strong>Address:</strong> {selected.address}</p>
                <p><strong>Department:</strong> {selected.department}</p>
                <p><strong>Previous:</strong> {selected.previousEducation}</p>
                <p className="col-span-2"><strong>Motivation:</strong> {selected.motivationLetter}</p>
              </div>
              {selected.photoUrl && <img src={`${API_URL}${selected.photoUrl}`} alt="" className="mt-3 h-32 rounded" />}
              {selected.documentUrl && <a href={`${API_URL}${selected.documentUrl}`} target="_blank" rel="noreferrer" className="block mt-2 text-blue-600 hover:underline text-sm">View Document</a>}
              
              <textarea placeholder="Admin note..." value={note} onChange={(e) => setNote(e.target.value)} className="w-full border mt-4 p-2 rounded" rows="2"></textarea>
              <div className="flex gap-2 mt-3">
                <button onClick={() => updateStatus(selected._id, 'approved')} className="flex-1 bg-emerald-600 text-white py-2 rounded flex items-center justify-center gap-2">
                  <FaCheck /> Approve
                </button>
                <button onClick={() => updateStatus(selected._id, 'rejected')} className="flex-1 bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2">
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}