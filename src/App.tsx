import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MachineCard } from './components/MachineCard';

const machineData = [
  {
    id: 'R500-LPDC-MC-1',
    name: 'R500 LPDC MC-1',
    shift: 2,
    count: 0,
    recipeName: 'CASTING TYPE-1',
    status: 'active'
  },
  {
    id: 'R500-LPDC-MC-2', 
    name: 'R500 LPDC MC-2',
    shift: 1,
    count: 104,
    recipeName: 'AM CAST',
    status: 'active'
  },
  {
    id: 'R500-LPDC-MC-3',
    name: 'R500 LPDC MC-3', 
    shift: 2,
    count: 102,
    recipeName: 'WEB CAST',
    status: 'active'
  },
  {
    id: '1215-VTA-MC-4',
    name: '1215 VTA MC-4',
    shift: 'NA',
    count: 0,
    recipeName: 'NA',
    status: 'inactive'
  },
  {
    id: '1518-VTA-MC-5',
    name: '1518 VTA MC-5',
    shift: 1,
    count: 50,
    recipeName: 'AM CAST',
    status: 'active'
  },
  {
    id: '1629-GDC-MC-6',
    name: '1629 GDC MC-6',
    shift: 'NA',
    count: 0,
    recipeName: 'NA',
    status: 'inactive'
  },
  {
    id: '2436-HPA-CB-MC-7',
    name: '2436 HPA CB MC-7',
    shift: 'NA', 
    count: 0,
    recipeName: 'NA',
    status: 'inactive'
  }
];

export default function App() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {machineData.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}