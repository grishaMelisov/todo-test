'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';

import { deleteTask, toggleTask } from '@/api/api';

import CustomCheckbox from '../ui/CustomCheckBox';

interface TaskPropsInterface {
  title: string;
  isCompleted: boolean;
  taskId: number;
  onTaskDeleted: (id: number) => void;
  onTaskToggled: (id: number) => void;
}

export default function Task({
  title,
  isCompleted,
  taskId,
  onTaskDeleted,
  onTaskToggled,
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

  const ToggleHandler = async () => {
    try {
      setIsLoading(true);
      await toggleTask(taskId);
      onTaskToggled(taskId);
    } catch (error) {
      console.error('Не удалось завершить задачу:(', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        'relative flex h-[60px] w-full items-center justify-center rounded-lg border shadow-md',
        isCompleted && 'bg-sea-green-100'
      )}
    >
      <div className="flex w-full items-center justify-center px-5">
        <div className="flex-0 basis-0">
          <CustomCheckbox checked={isCompleted} onChange={ToggleHandler} />
        </div>
        <div className="text-trim flex-1 basis-0 text-center">{title}</div>
      </div>
      <button
        disabled={isLoading}
        onClick={DeleteHandler}
        className="absolute top-2 right-2 active:scale-90"
      >
        <CgClose className="text-soft-grey" />
      </button>
    </div>
  );
}
