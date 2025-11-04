import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/pages/Home";
import { CrewRecords } from "./components/pages/CrewRecords";
import { VisitLog } from "./components/pages/VisitLog";
import { Emergencies } from "./components/pages/Emergencies";
import { MedicineInventory } from "./components/pages/MedicineInventory";
import { Analytics } from "./components/pages/Analytics";
import { Settings } from "./components/pages/Settings";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crew-records" element={<CrewRecords />} />
          <Route path="/visit-log" element={<VisitLog />} />
          <Route path="/emergencies" element={<Emergencies />} />
          <Route path="/medicine-inventory" element={<MedicineInventory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}
