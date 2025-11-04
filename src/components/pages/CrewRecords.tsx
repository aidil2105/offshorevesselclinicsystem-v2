export function CrewRecords() {
  return (
    <div>
      <h1 className="border-b-2 border-black pb-2 mb-6">Crew Medical Records</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Crew..."
              className="w-full border-2 border-black px-4 py-2"
            />
          </div>

          {/* Table */}
          <div className="border-2 border-black">
            <p className="border-b-2 border-black p-2">Crew Medical Records</p>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="border-r border-black p-2 text-left">Name</th>
                  <th className="border-r border-black p-2 text-left">Rank</th>
                  <th className="border-r border-black p-2 text-left">Last Visit</th>
                  <th className="border-r border-black p-2 text-left">Health Status</th>
                  <th className="p-2 text-left">Vaccination</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr key={row} className="border-b border-black">
                    <td className="border-r border-black p-2">[Name]</td>
                    <td className="border-r border-black p-2">[Rank]</td>
                    <td className="border-r border-black p-2">[Date]</td>
                    <td className="border-r border-black p-2">[Status]</td>
                    <td className="p-2">[Vax]</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="border-2 border-black p-4">
          <p className="mb-4">Crew Profile Panel</p>
          
          <div className="space-y-2 mb-4">
            <button className="w-full border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white">
              Add Visit Record
            </button>
            <button className="w-full border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white">
              Upload Report
            </button>
            <button className="w-full border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white">
              Print Summary
            </button>
          </div>

          <div className="space-y-2">
            <div className="border border-black p-3">Personal Information</div>
            <div className="border border-black p-3">Medical History</div>
            <div className="border border-black p-3">Vaccination Record</div>
            <div className="border border-black p-3">Fitness Status</div>
          </div>
        </div>
      </div>
    </div>
  );
}
