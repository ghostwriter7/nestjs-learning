import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto, GetTaskFilterDto } from './dto';

@Injectable()
export class TasksService {
  private _tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this._tasks;
  }

  public getTasksWithFilters({ status, search }: GetTaskFilterDto): Task[] {
    let tasks = [...this._tasks];
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
    }

    return tasks;
  }

  public getTaskById(id: string): Task {
    const found = this._tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} does not exist!`);
    }

    return found;
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
    const found = this.getTaskById(id);
    this._tasks = this._tasks.filter((task) => task.id !== found.id);
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
