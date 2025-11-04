import { useState } from "react";

export function VisitLog() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1 className="border-b-2 border-black pb-2 mb-6">Clinic Visit Log</h1>
      
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Date Range"
          className="border-2 border-black px-4 py-2"
        />
        <input
          type="text"
          placeholder="Condition Type"
          className="border-2 border-black px-4 py-2"
        />
        <input
          type="text"
          placeholder="Medic"
          className="border-2 border-black px-4 py-2"
        />
        <button
          onClick={() => setShowModal(true)}
          className="border-2 border-black px-6 py-2 bg-white hover:bg-black hover:text-white ml-auto"
        >
          Add New Visit
        </button>
      </div>

      {/* Main Table */}
      <div className="border-2 border-black">
        <p className="border-b-2 border-black p-2">Clinic Visit Log</p>
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="border-r border-black p-2 text-left">Date</th>
              <th className="border-r border-black p-2 text-left">Crew Name</th>
              <th className="border-r border-black p-2 text-left">Complaint</th>
              <th className="border-r border-black p-2 text-left">Diagnosis</th>
              <th className="border-r border-black p-2 text-left">Treatment</th>
              <th className="p-2 text-left">Medic</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map((row) => (
              <tr key={row} className="border-b border-black">
                <td className="border-r border-black p-2">[Date]</td>
                <td className="border-r border-black p-2">[Name]</td>
                <td className="border-r border-black p-2">[Complaint]</td>
                <td className="border-r border-black p-2">[Diagnosis]</td>
                <td className="border-r border-black p-2">[Treatment]</td>
                <td className="p-2">[Medic]</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white border-4 border-black p-6 w-[500px]">
            <h2 className="border-b-2 border-black pb-2 mb-4">Add New Visit</h2>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block mb-1">Crew Name</label>
                <input type="text" className="w-full border-2 border-black px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Complaint</label>
                <input type="text" className="w-full border-2 border-black px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Diagnosis</label>
                <input type="text" className="w-full border-2 border-black px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Treatment Given</label>
                <input type="text" className="w-full border-2 border-black px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Remarks</label>
                <textarea className="w-full border-2 border-black px-3 py-2" rows={3}></textarea>
              </div>
              <div className="border-2 border-black p-6 text-center">
                File Upload Area
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border-2 border-black px-4 py-2 bg-black text-white"
              >
                Save Visit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
