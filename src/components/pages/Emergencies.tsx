export function Emergencies() {
  return (
    <div>
      <h1 className="border-b-2 border-black pb-2 mb-6">Emergency Cases</h1>
      
      {/* Emergency Form */}
      <div className="border-2 border-black p-6 mb-6">
        <p className="border-b border-black pb-2 mb-4">Emergency Case Log</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Incident Type</label>
            <input type="text" className="w-full border-2 border-black px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1">Date & Time</label>
            <input type="text" className="w-full border-2 border-black px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1">Crew Name</label>
            <input type="text" className="w-full border-2 border-black px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1">Location / Vessel Section</label>
            <input type="text" className="w-full border-2 border-black px-3 py-2" />
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block mb-1">Treatment Given</label>
            <textarea className="w-full border-2 border-black px-3 py-2" rows={2}></textarea>
          </div>
          <div>
            <label className="block mb-1">Evacuation Details</label>
            <textarea className="w-full border-2 border-black px-3 py-2" rows={2}></textarea>
          </div>
          <div>
            <label className="block mb-1">Outcome / Follow-up</label>
            <textarea className="w-full border-2 border-black px-3 py-2" rows={2}></textarea>
          </div>
        </div>

        <button className="border-2 border-black px-6 py-2 bg-black text-white">
          Submit Emergency Record
        </button>
      </div>

      {/* Past Emergencies Table */}
      <div className="border-2 border-black mb-4">
        <p className="border-b-2 border-black p-2">Past Emergencies</p>
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="border-r border-black p-2 text-left">Date</th>
              <th className="border-r border-black p-2 text-left">Type</th>
              <th className="border-r border-black p-2 text-left">Crew</th>
              <th className="p-2 text-left">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="border-b border-black">
                <td className="border-r border-black p-2">[Date]</td>
                <td className="border-r border-black p-2">[Type]</td>
                <td className="border-r border-black p-2">[Crew]</td>
                <td className="p-2">[Outcome]</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="border-2 border-black px-6 py-2 bg-white hover:bg-black hover:text-white">
        Generate Emergency Summary PDF
      </button>
    </div>
  );
}
