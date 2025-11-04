import { useState } from "react";

export function Settings() {
  const [activeTab, setActiveTab] = useState<"clinic" | "roles" | "backup" | "complaint">("clinic");
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  return (
    <div>
      <h1 className="border-b-2 border-black pb-2 mb-6">Settings & Clinic Management</h1>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("clinic")}
          className={`border-2 border-black px-6 py-2 ${
            activeTab === "clinic" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Clinic Info
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`border-2 border-black px-6 py-2 ${
            activeTab === "roles" ? "bg-black text-white" : "bg-white"
          }`}
        >
          User Roles
        </button>
        <button
          onClick={() => setActiveTab("backup")}
          className={`border-2 border-black px-6 py-2 ${
            activeTab === "backup" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Backup/Export
        </button>
        <button
          onClick={() => setActiveTab("complaint")}
          className={`border-2 border-black px-6 py-2 ${
            activeTab === "complaint" ? "bg-black text-white" : "bg-white"
          }`}
        >
          File Complaint
        </button>
      </div>

      {/* Tab Content */}
      <div className="border-2 border-black p-6">
        {activeTab === "clinic" && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Vessel Name</label>
              <input type="text" className="w-full border-2 border-black px-3 py-2" placeholder="e.g., MV OCEAN EXPLORER" />
            </div>
            <div>
              <label className="block mb-1">Vessel IMO Number</label>
              <input type="text" className="w-full border-2 border-black px-3 py-2" placeholder="e.g., IMO 9234567" />
            </div>
            <div>
              <label className="block mb-1">Medic in Charge</label>
              <input type="text" className="w-full border-2 border-black px-3 py-2" placeholder="e.g., Dr. John Smith" />
            </div>
            <div>
              <label className="block mb-1">Medical License Number</label>
              <input type="text" className="w-full border-2 border-black px-3 py-2" placeholder="e.g., ML-12345" />
            </div>
          </div>
        )}

        {activeTab === "roles" && (
          <div className="space-y-3">
            <div className="border border-black p-4">
              <p>Medic</p>
            </div>
            <div className="border border-black p-4">
              <p>Clinic Admin</p>
            </div>
            <div className="border border-black p-4">
              <p>Officer</p>
            </div>
          </div>
        )}

        {activeTab === "backup" && (
          <div>
            <button className="border-2 border-black px-6 py-3 bg-white hover:bg-black hover:text-white">
              Export Data
            </button>
          </div>
        )}

        {activeTab === "complaint" && (
          <div>
            {complaintSubmitted ? (
              <div className="border-2 border-black p-6 text-center">
                <p className="mb-4">✓ Complaint Submitted Successfully</p>
                <p className="mb-4">Your complaint has been sent to support@marmed.com</p>
                <p className="mb-4">Reference ID: COMP-{Math.floor(Math.random() * 10000)}</p>
                <button 
                  onClick={() => setComplaintSubmitted(false)}
                  className="border-2 border-black px-6 py-2 bg-white hover:bg-black hover:text-white"
                >
                  Submit Another Complaint
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                setComplaintSubmitted(true);
              }} className="space-y-4">
                <div>
                  <label className="block mb-1">Complaint Category *</label>
                  <select required className="w-full border-2 border-black px-3 py-2 bg-white">
                    <option value="">-- Select Category --</option>
                    <option value="equipment">Medical Equipment Issue</option>
                    <option value="supply">Medicine/Supply Shortage</option>
                    <option value="system">System Technical Issue</option>
                    <option value="protocol">Protocol/Procedure Concern</option>
                    <option value="safety">Safety Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Priority Level *</label>
                  <select required className="w-full border-2 border-black px-3 py-2 bg-white">
                    <option value="">-- Select Priority --</option>
                    <option value="critical">Critical - Immediate Attention Required</option>
                    <option value="high">High - Urgent Response Needed</option>
                    <option value="medium">Medium - Important but Not Urgent</option>
                    <option value="low">Low - General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Subject/Title *</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full border-2 border-black px-3 py-2" 
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div>
                  <label className="block mb-1">Date of Incident</label>
                  <input 
                    type="date" 
                    className="w-full border-2 border-black px-3 py-2" 
                  />
                </div>

                <div>
                  <label className="block mb-1">Detailed Description *</label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full border-2 border-black px-3 py-2" 
                    placeholder="Please provide detailed information about the complaint including what happened, when it occurred, and any relevant details..."
                  />
                </div>

                <div>
                  <label className="block mb-1">Your Contact Email *</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full border-2 border-black px-3 py-2" 
                    placeholder="your.email@vessel.com"
                  />
                </div>

                <div>
                  <label className="block mb-1">Contact Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full border-2 border-black px-3 py-2" 
                    placeholder="+1234567890"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="border-2 border-black px-8 py-3 bg-white hover:bg-black hover:text-white"
                  >
                    Submit Complaint
                  </button>
                  <p className="mt-2 text-sm">* Required fields</p>
                  <p className="mt-2 text-sm border-t border-black pt-2">
                    Note: This form will send your complaint to support@marmed.com. 
                    You will receive a confirmation email with a reference number.
                  </p>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
