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
    subtasks: [
      { name: 'Free Employee Label', completed: true, color: 'primary' },
      { name: 'Busy Employee Label', completed: true, color: 'accent' },
      { name: 'Chart ', completed: true, color: 'warn' },
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
