import { Search, ChevronDown, RefreshCw, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-slate-800 font-medium">Dashboard</h1>
        
        <div className="flex items-center gap-4">
          {/* Machine Selector */}
          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Machine</option>
              <option>LPDC Machines</option>
              <option>VTA Machines</option>
              <option>GDC Machines</option>
              <option>HPA CB Machines</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search machines..."
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Refresh Button */}
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
          <RefreshCw size={18} />
        </button>

        {/* Time Display */}
        <div className="text-right">
          <div className="text-slate-800 font-medium">{formatTime(currentTime)}</div>
          <div className="text-xs text-slate-500">{formatDate(currentTime)}</div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right">
            <div className="text-slate-800 font-medium">dpak (Admin)</div>
            <div className="text-xs text-slate-500">System Administrator</div>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}