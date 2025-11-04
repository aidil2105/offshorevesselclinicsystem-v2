export function Home() {
  return (
    <div>
      <h1 className="border-b-2 border-black pb-2 mb-6">Dashboard</h1>
      
      {/* Row 1: Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border-2 border-black p-6 text-center">
          <p>Patients Today</p>
        </div>
        <div className="border-2 border-black p-6 text-center">
          <p>Ongoing Treatments</p>
        </div>
        <div className="border-2 border-black p-6 text-center">
          <p>Crew Under Observation</p>
        </div>
        <div className="border-2 border-black p-6 text-center">
          <p>Medicine Stock Alerts</p>
        </div>
      </div>

      {/* Row 2: Chart and Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 border-2 border-black p-6">
          <p className="mb-4">7-Day Visit Trend</p>
          <div className="border border-black h-64 flex items-center justify-center">
            [Line Chart Placeholder]
          </div>
        </div>
        
        <div className="border-2 border-black p-6">
          <p className="mb-4">Quick Actions</p>
          <div className="space-y-4">
            <button className="w-full border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white">
              Add New Visit
            </button>
            <button className="w-full border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white">
              Log Emergency Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
