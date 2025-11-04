export function Analytics() {
  return (
    <div>
      <h1 className="border-b-2 border-black pb-2 mb-6">Health Analytics</h1>
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Date Range"
          className="border-2 border-black px-4 py-2"
        />
        <input
          type="text"
          placeholder="Voyage Duration"
          className="border-2 border-black px-4 py-2"
        />
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border-2 border-black p-4">
          <p className="mb-4">Common Conditions</p>
          <div className="border border-black h-48 flex items-center justify-center">
            [Bar Chart Placeholder]
          </div>
        </div>

        <div className="border-2 border-black p-4">
          <p className="mb-4">Weekly Visits</p>
          <div className="border border-black h-48 flex items-center justify-center">
            [Line Chart Placeholder]
          </div>
        </div>

        <div className="border-2 border-black p-4">
          <p className="mb-4">Medicine Usage</p>
          <div className="border border-black h-48 flex items-center justify-center">
            [Pie Chart Placeholder]
          </div>
        </div>

        <div className="border-2 border-black p-4">
          <p className="mb-4">Ship Route Health Incidents</p>
          <div className="border border-black h-48 flex items-center justify-center">
            [Map Placeholder]
          </div>
        </div>
      </div>

      {/* Training Video Section */}
      <div className="border-2 border-black p-6">
        <p className="mb-4">Training Video</p>
        <div className="border border-black h-64 flex items-center justify-center">
          [YouTube Placeholder]
        </div>
      </div>
    </div>
  );
}
