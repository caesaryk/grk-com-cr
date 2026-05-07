import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import DynamicScheduler from './components/DynamicScheduler';
import WorkloadMatrix from './components/WorkloadMatrix';
import StaffManagement from './components/StaffManagement';
import LiveOpsMap from './components/LiveOpsMap';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading GRK Operations Portal...</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen text-xl">Please log in via Supabase (full auth coming soon)</div>;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/scheduler" element={<DynamicScheduler />} />
            <Route path="/matrix" element={<WorkloadMatrix />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/map" element={<LiveOpsMap />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
