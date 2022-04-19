import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private _tasksService: TasksService) {}

  @Get()
  public getAllTasks(): Task[] {
    return this._tasksService.getAllTasks();
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this._tasksService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this._tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  public deleteTask(@Param('id') id: string): void {
    return this._tasksService.deleteTask(id);
  }
}
