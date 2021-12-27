import { ITask } from './../interfaces/settings.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  task: ITask = {
    name: 'Show All',
    completed: true,
    color: 'primary',
    id: 'All',
    subtasks: [
      {
        name: 'Free Employee Label',
        id: 'free',
        completed: true,
        color: 'primary',
      },
      {
        name: 'Busy Employee Label',
        id: 'busy',
        completed: true,
        color: 'accent',
      },
      {
        name: 'Chart',
        id: 'chart',
        completed: true,
        color: 'warn',
      },
    ],
  };
  constructor() {}

  update(e: boolean) {
    this.task.completed = e;
    this.task.subtasks?.every((t) => t.completed);
  }

  setAll(completed: boolean) {
    this.task.completed = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }
}
