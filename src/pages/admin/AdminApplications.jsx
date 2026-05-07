import { useEffect, useRef, useState } from "react";
import API from "../../api/axios";
import {
  FaCheck,
  FaTimes,
  FaTrash,
  FaEye,
  FaPrint,
} from "react-icons/fa";

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");

  const printRef = useRef();

  const load = () =>
    API.get("/applications").then((r) => setApps(r.data));

  useEffect(() => {
    load();
  }, []);

  const filtered = apps.filter((a) =>
    filter === "all" ? true : a.status === filter
  );

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}/status`, {
      status,
      adminNote: note,
    });

    setSelected(null);
    setNote("");
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete application?")) return;

    await API.delete(`/applications/${id}`);
    load();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Hide everything except print section while printing */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            .print-section, .print-section * {
              visibility: visible;
            }

            .print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }

            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-3xl font-bold">
          Applications
        </h1>

        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPrint />
          Print
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 no-print">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded capitalize ${
              filter === f
                ? "bg-slate-900 text-white"
                : "bg-white border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        ref={printRef}
        className="print-section overflow-x-auto bg-white  border"
      >
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left border-l">Name</th>
              <th className="p-2 text-left border-l">Father</th>
              <th className="p-2 text-left border-l">Department</th>
              <th className="p-2 text-left border-l">Phone</th>
              <th className="p-2 text-left border-l">Status</th>
              <th className="p-2 text-left border-l no-print">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((app, index) => (
              <tr
                key={app._id}
                className="border-t"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2 border-l">{app.fullName}</td>
                <td className="p-2 border-l">{app.fatherName}</td>
                <td className="p-2 border-l capitalize">
                  {app.department}
                </td>
                <td className="p-2 border-l">{app.phone}</td>

                <td className="p-2 border-l">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="p-2 border-l no-print">
                  <div className="flex gap-2" 

                  >
                    <button
                      onClick={() => setSelected(app)}
                      className="text-blue-600"
                      
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(app._id)
                      }
                      className="text-red-600"
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

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 no-print">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {selected.fullName}
              </h2>

              <button
                onClick={() => setSelected(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>
                <strong>CNIC:</strong>{" "}
                {selected.cnic}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selected.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selected.phone}
              </p>

              <p>
                <strong>City:</strong>{" "}
                {selected.city}
              </p>

              <p className="col-span-2">
                <strong>Address:</strong>{" "}
                {selected.address}
              </p>

              <p className="col-span-2">
                <strong>Motivation:</strong>{" "}
                {selected.motivationLetter}
              </p>
            </div>

            <textarea
              rows={2}
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              className="w-full border mt-4 p-2 rounded"
              placeholder="Admin note..."
            />

            <div className="flex gap-2 mt-4">

  {selected.status === "approved" ? (
    <div className="w-full text-center bg-green-100 text-green-700 py-2 rounded font-semibold">
      ✔ Already Approved
    </div>
  ) : (
    <>
      <button
        onClick={() =>
          updateStatus(selected._id, "approved")
        }
        className="flex-1 bg-green-600 text-white py-2 rounded flex justify-center items-center gap-2"
      >
        <FaCheck />
        Approve
      </button>

      <button
        onClick={() =>
          updateStatus(selected._id, "rejected")
        }
        className="flex-1 bg-red-600 text-white py-2 rounded flex justify-center items-center gap-2"
      >
        <FaTimes />
        Reject
      </button>
    </>
  )}

</div>
          </div>
        </div>
      )}
    </div>
  );
}