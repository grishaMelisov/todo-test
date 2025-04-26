'use client';

import { useEffect, useState } from 'react';

import TaskForm from '@/components/TaskForm/TaskForm';
import TaskList from '@/components/TaskList/TaskList';
import CustomCheckbox from '@/components/ui/CustomCheckBox';

import { TaskInterface, getTasks } from '@/api/api';

export default function Home() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();

        setTasks(tasks);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const visibleTasks = showCompletedOnly ? tasks.filter((task) => task.completed) : tasks;

  const handleTaskCreated = (newTask: TaskInterface) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTaskDeleted = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleTaskToggled = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  console.log(tasks, 'таски');
  return (
    <div className="mx-auto flex w-full gap-8 py-10">
      <div className="min-h-screen w-1/3">
        <div className="sticky top-1/2 -translate-y-1/2">
          <TaskForm onTaskCreated={handleTaskCreated} />
          <div className="mt-4 flex items-center gap-2">
            <CustomCheckbox
              checked={showCompletedOnly}
              onChange={() => setShowCompletedOnly((prev) => !prev)}
            />
            <span className="text-sm text-gray-700">Показать только выполненные</span>
          </div>
        </div>
      </div>

      <div className="flex w-2/3 flex-col gap-5">
        {isLoading ? (
          <h3 className="text-center">Загружаю задачи...</h3>
        ) : (
          <TaskList
            tasks={visibleTasks}
            onTaskDeleted={handleTaskDeleted}
            onTaskToggled={handleTaskToggled}
          />
        )}
      </div>
    </div>
  );
}
