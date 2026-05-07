import { useState } from 'react';

export default function DynamicScheduler() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <span>⚡</span> Dynamic Scheduler
      </h1>
      <div className="glass p-8 rounded-3xl">
        <p className="text-lg">Unassigned Tasks → Drag to Available Staff</p>
        <p className="text-gray-400 mt-6">Full drag-and-drop from App 2 is ready for implementation</p>
      </div>
    </div>
  );
}
