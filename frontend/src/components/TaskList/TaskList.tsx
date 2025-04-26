import Task from '@/components/Task/Task';

import { TaskInterface } from '@/api/api';

interface TaskListPropsInterface {
  tasks: TaskInterface[];
  onTaskDeleted: (id: number) => void;
  onTaskToggled: (id: number) => void;
}

export default function TaskList({
  tasks,
  onTaskDeleted,
  onTaskToggled,
}: TaskListPropsInterface) {
  if (tasks.length === 0) {
    return <h3 className="text-center">Пока тут пусто..</h3>;
  }

  return (
    <div className="flex flex-col gap-5">
      {tasks.map((task) => (
        <Task
          key={task.id}
          onTaskDeleted={onTaskDeleted}
          onTaskToggled={onTaskToggled}
          isCompleted={task.completed}
          title={task.title}
          taskId={task.id}
        />
      ))}
    </div>
  );
}
