import { 
  Gauge, 
  TableProperties, 
  Settings, 
  Cog,
  Mail,
  Users,
  Menu,
  ChevronDown,
  Wrench
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Gauge, label: 'Machine Dashboard', link: '/' },
    { icon: TableProperties, label: 'Slideshow', link: '/slideshow' },
    // { icon: TableProperties, label: 'Die Dashboard' },
    // { icon: TableProperties, label: 'Die Dashboard' },
    // { icon: Settings, label: 'Machine Detail' },
    // { icon: Users, label: 'User' },
    // { icon: Cog, label: 'Machine Master' },
    // { icon: Wrench, label: 'Maintenance', hasDropdown: true },
    // { icon: TableProperties, label: 'Reports', hasDropdown: true },
    // { icon: Mail, label: 'Email Settings' }
  ];

  return (
    <div 
      className={`bg-slate-100 border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out relative z-40 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        {isExpanded ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="text-amber-500 font-bold text-lg">SFE</div>
              <div className="text-slate-800 font-semibold text-sm">SUSHA</div>
              <div className="text-slate-600 text-xs">FOUNDERS & ENGINEERS</div>
            </div>
            <Menu className="text-slate-600" size={20} />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
          </div>
        )}
      </div>
      
     {/* Menu Items */}
     <nav className="flex-1 py-4 px-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.link;
          
          return (
            <Link
              key={index}
              to={item.link}
              className={`w-full flex items-center transition-all duration-200 group relative ${
                isExpanded ? 'px-4 py-3 justify-start gap-3' : 'py-3 justify-center'
              } ${
                isActive 
                  ? 'bg-amber-400 text-slate-800 rounded-lg mb-2' 
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
            >
            <Icon size={20} className="flex-shrink-0" />
              
              {isExpanded && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                </>
              )}
              
              {/* Tooltip for collapsed state */}
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {isExpanded && (
        <div className="p-4 border-t border-slate-200">
          <div className="bg-amber-500 text-white rounded-lg p-3 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amber-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-amber-500">SFE</span>
              </div>
            </div>
            <div className="text-sm font-semibold">SINCE 1958</div>
          </div>
        </div>
      )}
    </div>
  );
}