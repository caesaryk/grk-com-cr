import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, ClipboardList, Users, Map, Settings, TrendingUp } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: ClipboardList, label: 'Dynamic Scheduler', path: '/scheduler' },
  { icon: Users, label: 'Staff', path: '/staff' },
  { icon: Map, label: 'Live Ops Map', path: '/map' },
  { icon: TrendingUp, label: 'Revenue', path: '/revenue' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-sky-400">GRK</h1>
        <p className="text-xs text-gray-400">Operations Portal</p>
      </div>
      
      <div className="flex-1 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          const className = isActive 
            ? 'flex items-center gap-3 px-6 py-3 bg-gray-800 text-sky-400' 
            : 'flex items-center gap-3 px-6 py-3 hover:bg-gray-800 text-gray-300 transition-colors';

          return (
            <Link
              key={item.path}
              to={item.path}
              className={className}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
        GRK Operations Portal v4
      </div>
    </div>
  );
}
