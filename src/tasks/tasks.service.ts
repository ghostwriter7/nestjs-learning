import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private _tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this._tasks;
  }
}
