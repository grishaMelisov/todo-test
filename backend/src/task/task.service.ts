import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TaskCreateDto, TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: TaskCreateDto): Promise<TaskDto> {
    const task = await this.prisma.task.create({
      data: { title: dto.title },
    });
    return this.returnTaskFields(task);
  }

  async findAll(): Promise<TaskDto[]> {
    return this.prisma.task.findMany({
      orderBy: {
        completed: 'asc',
      },
    });
  }

  async toggleCompleted(id: number): Promise<TaskDto> {
    const existing = await this.prisma.task.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const updated = await this.prisma.task.update({
      where: { id },
      data: { completed: !existing.completed },
    });

    return this.returnTaskFields(updated);
  }

  async delete(id: number): Promise<{ message: string }> {
    const existing = await this.prisma.task.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: `Task ${id} deleted successfully` };
  }

  private returnTaskFields(task: any): TaskDto {
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
      createdAt: task.createdAt,
    };
  }
}
