'use client';

import { FormEvent, useState } from 'react';

import { TaskInterface, createTask } from '@/api/api';

interface TaskFormProps {
  onTaskCreated: (task: TaskInterface) => void;
}

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsLoading(true);
      const newTask = await createTask(title);
      onTaskCreated(newTask);
      setTitle('');
    } catch (error) {
      console.error('Ошибка при создании задачи', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <label className="rounded-lg border p-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Новая задача"
          className="w-full border-hidden focus:outline-hidden"
        />
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-bg-button text-button hover:bg-sea-green-500 rounded-md px-3 py-2 transition active:scale-98 disabled:opacity-50"
      >
        {isLoading ? 'Добавляю...' : 'Добавить'}
      </button>
    </form>
  );
}
