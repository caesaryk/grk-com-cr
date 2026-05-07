import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function DynamicScheduler() {
  const [tasks, setTasks] = useState(['Task 1 - Sea View 101', 'Task 2 - Ocean Breeze 205']);
  const [staff, setStaff] = useState(['Maria', 'Juan', 'Carlos']);

  return (
    <div className="glass p-8 rounded-3xl">
      <h1 className="text-3xl font-bold mb-6">⚡ Dynamic Scheduler</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="font-semibold mb-4">Unassigned Tasks</h2>
          {tasks.map(task => (
            <div key={task} className="bg-gray-800 p-4 mb-2 rounded-xl cursor-grab">{task}</div>
          ))}
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="font-semibold mb-4">Available Staff</h2>
          {staff.map(name => (
            <div key={name} className="bg-emerald-900 p-4 mb-2 rounded-xl">{name}</div>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-8">Drag & drop functionality (full version next)</p>
    </div>
  );
}