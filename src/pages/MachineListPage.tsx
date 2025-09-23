
import { MachineCard } from '../components/MachineCard';

const machines = [
  {
    id: '1',
    name: 'CNC Machine',
    shift: 1,
    count: 1250,
    recipeName: 'Part-A-12',
    status: 'online' as const,
  },
  {
    id: '2',
    name: 'Laser Cutter',
    shift: 2,
    count: 850,
    recipeName: 'Part-B-04',
    status: 'offline' as const,
  },
  {
    id: '3',
    name: 'Injection Molder',
    shift: 'NA',
    count: 0,
    recipeName: 'NA',
    status: 'breakdown' as const,
  },
  {
    id: '4',
    name: 'Robotic Arm',
    shift: 1,
    count: 2100,
    recipeName: 'Assembly-3',
    status: 'maintenance' as const,
  },
  {
    id: '5',
    name: '3D Printer',
    shift: 3,
    count: 350,
    recipeName: 'Prototype-X7',
    status: 'online' as const,
  },
  {
    id: '6',
    name: 'Packaging Line',
    shift: 2,
    count: 15000,
    recipeName: 'Box-Standard',
    status: 'online' as const,
  },
];

export function MachineListPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {machines.map((machine) => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  );
}
