import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { GetTaskFilterDto, CreateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(private _tasksService: TasksService) {}

  @Get()
  public getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this._tasksService.getTasksWithFilters(filterDto);
    }
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

  @Patch('/:id/status')
  public updateTaskStatus(
    @Body('status') status: TaskStatus,
    @Param('id') id: string,
  ): Task {
    return this._tasksService.updateTaskStatus(id, status);
  }
}
