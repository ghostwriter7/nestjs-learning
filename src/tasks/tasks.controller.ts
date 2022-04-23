import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto, CreateTaskDto } from './dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private _tasksService: TasksService) {}

  @Get()
  public getTasks(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto,
  ): Promise<Task[]> {
    return this._tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  public getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this._tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this._tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  public deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this._tasksService.updateTaskStatus(id, status);
  }
}
