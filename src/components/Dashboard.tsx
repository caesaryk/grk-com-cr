import { Users, Calendar, MapPin, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="glass p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Today's Tasks</p>
              <p className="text-5xl font-bold text-white mt-2">18</p>
            </div>
            <Calendar className="w-12 h-12 text-sky-400" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Staff</p>
              <p className="text-5xl font-bold text-white mt-2">12</p>
            </div>
            <Users className="w-12 h-12 text-emerald-400" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Properties</p>
              <p className="text-5xl font-bold text-white mt-2">31</p>
            </div>
            <MapPin className="w-12 h-12 text-amber-400" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revenue Today</p>
              <p className="text-5xl font-bold text-white mt-2">$2,840</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Live Operations</h2>
        <div className="glass p-8 rounded-3xl border border-gray-700 text-center text-gray-400">
          Live Map + AI Audit + Activity Ticker will appear here
          <br />
          <span className="text-xs">(Next features coming soon)</span>
        </div>
      </div>
    </div>
  );
}
