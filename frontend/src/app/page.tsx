'use client';

import { useEffect, useState } from 'react';

import Task from '@/components/Task/Task';
import TaskForm from '@/components/TaskForm/TaskForm';

import { TaskInterface, getTasks } from '@/api/api';

export default function Home() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
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
    <div className="mx-auto max-w-md py-10">
      <TaskForm onTaskCreated={handleTaskCreated} />
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <p className="text-center text-gray-500">Загружаю задачи...</p>
        ) : (
          tasks.map((e) => {
            return (
              <Task
                key={e.id}
                onTaskDeleted={handleTaskDeleted}
                onTaskToggled={handleTaskToggled}
                isCompleted={e.completed}
                title={e.title}
                taskId={e.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
