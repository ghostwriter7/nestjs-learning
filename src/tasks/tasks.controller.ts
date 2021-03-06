import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto, CreateTaskDto } from './dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private _logger = new Logger('TasksController');

  constructor(private _tasksService: TasksService) {}

  @Get()
  public getTasks(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    this._logger.verbose(`User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}.`);
    return this._tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  public getTaskById(@Param('id', ParseIntPipe) id: number,
                     @GetUser() user: User): Promise<Task> {
    return this._tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    this._logger.verbose(`User ${user.username} creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
    return this._tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  public deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this._tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this._tasksService.updateTaskStatus(id, status, user);
  }
}
