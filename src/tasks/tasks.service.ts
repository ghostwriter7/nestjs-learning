import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private _tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this._tasks;
  }

  public getTaskById(id: string): Task {
    return this._tasks.find(task => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this._tasks.push(task);
    return task;
  }

  public deleteTask(id: string): void {
    this._tasks = this._tasks.filter((task) => task.id !== id);
  }
}
