import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  create(@Body() dto: TaskCreateDto) {
    return this.taskService.create(dto);
  }

  @Patch(':id/toggle')
  toggleCompleted(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.toggleCompleted(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
