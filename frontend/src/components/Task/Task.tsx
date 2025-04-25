'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';

import { deleteTask } from '@/api/api';

interface TaskPropsInterface {
  title: string;
  isCompleted: boolean;
  taskId: number;
  onTaskDeleted: (id: number) => void;
}

export default function Task({
  title,
  isCompleted,
  taskId,
  onTaskDeleted,
}: TaskPropsInterface) {
  const [isLoading, setIsLoading] = useState(false);

  const DeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await deleteTask(taskId);
      onTaskDeleted(taskId);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        'relative flex aspect-20/19 w-full items-center justify-center rounded-lg border shadow-md',
        isCompleted && 'bg-sea-green-100'
      )}
    >
      <div>{title}</div>
      <button
        disabled={isLoading}
        onClick={DeleteHandler}
        className="absolute top-2 right-2 active:scale-90"
      >
        <CgClose />
      </button>
    </div>
  );
}
