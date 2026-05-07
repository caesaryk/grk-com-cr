import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function DynamicScheduler() {
  const [unassignedTasks, setUnassignedTasks] = useState([
    { id: '1', title: 'Clean Unit 101', property: 'Sea View' },
    { id: '2', title: 'Clean Unit 205', property: 'Ocean Breeze' },
  ]);

  const [availableStaff, setAvailableStaff] = useState([
    { id: 's1', name: 'Maria Lopez' },
    { id: 's2', name: 'Juan Ramirez' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // Simple assignment logic
    console.log('Assigned task', active.id, 'to staff', over.id);
  };

  return (
    <div className="flex h-full gap-6">
      {/* Unassigned Tasks */}
      <div className="flex-1 glass p-6 rounded-3xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Unassigned Tasks</h2>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={unassignedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {unassignedTasks.map(task => (
              <div key={task.id} className="glass p-4 mb-3 rounded-2xl cursor-grab active:cursor-grabbing">
                {task.title} - {task.property}
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Available Staff */}
      <div className="flex-1 glass p-6 rounded-3xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Available Staff</h2>
        {availableStaff.map(staff => (
          <div key={staff.id} className="glass p-4 mb-3 rounded-2xl">
            {staff.name}
          </div>
        ))}
      </div>
    </div>
  );
}
