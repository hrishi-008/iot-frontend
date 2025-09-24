import { Header } from "./components/Header";
import { MachineCard } from "./components/MachineCard";
import { Sidebar } from "./components/Sidebar";
import { MachineDetailPage } from "./pages/MachineDetailsPage";
import { SlideshowPage } from "./pages/SlideshowPage";
import { SlideshowPageSimple } from "./pages/SlideshowPageSimple";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const machineData = [
  {
    id: 'R500-LPDC-MC-1',
    name: 'Machine 1',
    shift: 2,
    count: 0,
    recipeName: 'CASTING TYPE-1',
    status: 'online' as const
  },
  {
    id: 'R500-LPDC-MC-2', 
    name: 'Machine 2',
    shift: 1,
    count: 104,
    recipeName: 'AM CAST',
    status: 'online' as const
  },
  {
    id: 'R500-LPDC-MC-3',
    name: 'R500 LPDC MC-3', 
    shift: 2,
    count: 102,
    recipeName: 'WEB CAST',
    status: 'breakdown' as const
  },
  {
    id: '1215-VTA-MC-4',
    name: '1215 VTA MC-4',
    shift: 'NA',
    count: 0,
    recipeName: 'NA',
    status: 'offline' as const
  },
  {
    id: '1518-VTA-MC-5',
    name: '1518 VTA MC-5',
    shift: 1,
    count: 50,
    recipeName: 'AM CAST',
    status: 'maintenance' as const
  },
  {
    id: '1629-GDC-MC-6',
    name: '1629 GDC MC-6',
    shift: 'NA',
    count: 0,
    recipeName: 'NA',
    status: 'offline' as const
  },
  {
    id: '2436-HPA-CB-MC-7',
    name: '2436 HPA CB MC-7',
    shift: 'NA', 
    count: 0,
    recipeName: 'NA',
    status: 'offline' as const
  }
];

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/machine/:id" element={<MachineDetailPage />} />
              <Route path="/slideshow" element={<SlideshowPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {machineData.map((machine, index) => (
        <MachineCard key={index} machine={machine} />
      ))}
    </div>
  );
}