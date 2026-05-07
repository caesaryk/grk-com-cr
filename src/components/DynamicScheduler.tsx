import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function DynamicScheduler() {
  const [unassignedTasks, setUnassignedTasks] = useState([
    { id: '1', title: 'SeaView 101 - Checkout Clean' },
    { id: '2', title: 'OceanFront 305 - Turnaround' },
    { id: '3', title: 'BeachHouse 12 - Standard Clean' }
  ]);

  const [assigned, setAssigned] = useState<Record<string, any>>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    console.log('Task', active.id, 'dropped on', over.id);
    // In full version this would assign staff to task
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-8 h-full">
        {/* Unassigned Tasks Column */}
        <div className="flex-1 glass p-6 rounded-3xl border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            📋 Unassigned Tasks
          </h2>
          <SortableContext items={unassignedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {unassignedTasks.map(task => (
              <div key={task.id} className="bg-gray-800 p-4 rounded-2xl mb-3 cursor-grab active:cursor-grabbing">
                {task.title}
              </div>
            ))}
          </SortableContext>
        </div>

        {/* Staff / Assignment Area */}
        <div className="flex-1 glass p-6 rounded-3xl border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">👷‍♀️ Available Staff</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-2xl">Maria Lopez</div>
            <div className="p-4 bg-gray-800 rounded-2xl">Juan Ramirez</div>
            <div className="p-4 bg-gray-800 rounded-2xl">Carlos Mendoza</div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
