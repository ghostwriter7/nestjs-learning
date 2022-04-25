import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, GetTaskFilterDto } from './dto';
import { TaskStatus } from './task-status.enum';

import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private _taskRepository: TaskRepository,
  ) {}

  public async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return await this._taskRepository.getTasks(filterDto);
  }

  public async getTaskById(id: number): Promise<Task> {
    const found = await this._taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} does not exist!`);
    }
    return found;
  }

  public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this._taskRepository.createTask(createTaskDto, user);
  }

  public async deleteTask(id: number): Promise<void> {
    const result = await this._taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Task with an ID ${id} does not exist!`);
    }
  }

  public async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
