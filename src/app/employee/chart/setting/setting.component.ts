import { ITask } from './../../../interfaces/settings.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  task: ITask = {
    name: 'All',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Free Employee Label', completed: false, color: 'primary' },
      { name: 'Busy Employee Label', completed: false, color: 'accent' },
      { name: 'Chart ', completed: false, color: 'warn' },
    ],
  };

  allComplete: boolean = false;

  ngOnInit(): void {
    console.log(this.task.subtasks);
  }

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    console.log(this.task.subtasks);

    this.task.subtasks.forEach((t) => (t.completed = completed));
  }
}
