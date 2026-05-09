import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface Task {
  id: string;
  title: string;
  property: string;
}

interface Staff {
  id: string;
  name: string;
  tasks: Task[];
}

export default function DynamicScheduler() {
  const [unassignedTasks, setUnassignedTasks] = useState<Task[]>([
    { id: 't1', title: 'Clean Unit 101', property: 'Sea View' },
    { id: 't2', title: 'Clean Unit 205', property: 'Ocean Breeze' },
    { id: 't3', title: 'Clean Unit 310', property: 'Palm Court' },
  ]);

  const [staffList, setStaffList] = useState<Staff[]>([
    { id: 's1', name: 'Maria Lopez', tasks: [] },
    { id: 's2', name: 'Juan Ramirez', tasks: [] },
    { id: 's3', name: 'Carlos Mendez', tasks: [] },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const staffId = over.id as string;

    const taskIndex = unassignedTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = unassignedTasks[taskIndex];

    const newUnassigned = unassignedTasks.filter(t => t.id !== taskId);
    setUnassignedTasks(newUnassigned);

    const updatedStaff = staffList.map(staff => {
      if (staff.id === staffId) {
        return { ...staff, tasks: [...staff.tasks, task] };
      }
      return staff;
    });
    setStaffList(updatedStaff);
  };

  const unassignTask = (staffId: string, taskId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return;

    const task = staff.tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedStaff = staffList.map(s => {
      if (s.id === staffId) {
        return { ...s, tasks: s.tasks.filter(t => t.id !== taskId) };
      }
      return s;
    });
    setStaffList(updatedStaff);

    setUnassignedTasks([...unassignedTasks, task]);
  };

  return (
    <div className="flex h-full gap-6">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* Unassigned Tasks */}
        <div className="flex-1 glass p-6 rounded-3xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📋 Unassigned Tasks
            <span className="text-sm text-gray-400">({unassignedTasks.length})</span>
          </h2>
          
          <SortableContext items={unassignedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {unassignedTasks.length > 0 ? (
              unassignedTasks.map(task => (
                <div 
                  key={task.id} 
                  className="glass p-4 mb-3 rounded-2xl cursor-grab active:cursor-grabbing hover:bg-gray-800/50 transition-colors"
                >
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-400">{task.property}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm py-8 text-center">
                All tasks assigned!
              </div>
            )}
          </SortableContext>
        </div>

        {/* Available Staff */}
        <div className="flex-1 glass p-6 rounded-3xl border border-gray-700 overflow-auto">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            👥 Available Staff
          </h2>
          
          {staffList.map(staff => (
            <div key={staff.id} className="mb-4">
              <div className="font-semibold mb-2 flex items-center gap-2">
                {staff.name}
                <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full">
                  {staff.tasks.length} tasks
                </span>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-3 min-h-[80px] border border-gray-800">
                {staff.tasks.length > 0 ? (
                  staff.tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg mb-2 text-sm">
                      <div>
                        <div>{task.title}</div>
                        <div className="text-xs text-gray-400">{task.property}</div>
                      </div>
                      <button 
                        onClick={() => unassignTask(staff.id, task.id)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-xs py-4 text-center">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
