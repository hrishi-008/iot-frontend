import { ArrowRight, Activity, Clock, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Machine {
  id: string;
  name: string;
  shift: number | string;
  count: number;
  recipeName: string;
  status: 'online' | 'offline' | 'breakdown' | 'maintenance';
}

interface MachineCardProps {
  machine: Machine;
}

const statusColorClasses: Record<Machine['status'], string> = {
  online: 'bg-green-500',
  offline: 'bg-slate-400',
  breakdown: 'bg-red-500',
  maintenance: 'bg-amber-600',
};

export function MachineCard({ machine }: MachineCardProps) {
  const isOnline = machine.status === 'online';
  const isNA = machine.shift === 'NA' || machine.recipeName === 'NA';

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Header */}
      <div
        className={`px-4 py-3 text-white relative overflow-hidden ${
          isOnline
            ? 'bg-gradient-to-r from-slate-600 to-slate-700'
            : 'bg-gradient-to-r from-slate-400 to-slate-500'
        }`}>
        <div className="relative z-10">
          <h3 className="font-medium truncate">{machine.name}</h3>
        </div>
        {isOnline && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Shift and Count */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
              <Clock size={14} />
              <span>Shift</span>
            </div>
            <div className={`text-xl font-semibold ${isNA ? 'text-slate-400' : 'text-slate-800'}`}>
              {machine.shift}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
              <Package size={14} />
              <span>Count</span>
            </div>
            <div
              className={`text-xl font-semibold ${
                machine.count === 0 ? 'text-slate-400' : 'text-blue-600'
              }`}>
              {machine.count}
            </div>
          </div>
        </div>

        {/* Recipe Name */}
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
            <Activity size={14} />
            <span>Recipe Name</span>
          </div>
          <div className={`font-medium truncate ${isNA ? 'text-slate-400' : 'text-slate-700'}`}>
            {machine.recipeName}
          </div>
        </div>

        {/* View Detail Button */}
        <Link
          to={`/machine/${machine.id}`}
          className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg transition-all duration-200 group/btn border border-slate-200 hover:border-blue-200">
          <span className="font-medium">View Detail</span>
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {/* Status Indicator */}
      <div className={`h-1 w-full ${statusColorClasses[machine.status]}`}></div>
    </div>
  );
}
