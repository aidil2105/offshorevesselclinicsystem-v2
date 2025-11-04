export function MedicineInventory() {
  return (
    <div>
      <h1 className="border-b-2 border-black pb-2 mb-6">Medicine Inventory</h1>
      
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Stock Level"
          className="border-2 border-black px-4 py-2"
        />
        <input
          type="text"
          placeholder="Expiry Date"
          className="border-2 border-black px-4 py-2"
        />
        <input
          type="text"
          placeholder="Category"
          className="border-2 border-black px-4 py-2"
        />
        <button className="border-2 border-black px-6 py-2 bg-white hover:bg-black hover:text-white ml-auto">
          Add New Medicine
        </button>
      </div>

      {/* Medicine Table */}
      <div className="border-2 border-black">
        <p className="border-b-2 border-black p-2">Full Medicine Stock</p>
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="border-r border-black p-2 text-left">Name</th>
              <th className="border-r border-black p-2 text-left">Stock</th>
              <th className="border-r border-black p-2 text-left">Expiry</th>
              <th className="border-r border-black p-2 text-left">Reorder Level</th>
              <th className="border-r border-black p-2 text-left">Location</th>
              <th className="p-2 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
              <tr key={row} className="border-b border-black">
                <td className="border-r border-black p-2">[Medicine Name]</td>
                <td className="border-r border-black p-2">[Qty]</td>
                <td className="border-r border-black p-2">[Date]</td>
                <td className="border-r border-black p-2">[Level]</td>
                <td className="border-r border-black p-2">[Location]</td>
                <td className="p-2">[Category]</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
