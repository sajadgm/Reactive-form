import { ITask } from './../../../interfaces/settings.interface';
import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { ThemePalette } from '@angular/material/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  task!: ITask;
  allComplete!: boolean;

  constructor(private _settingService: SettingsService) {}

  ngOnInit(): void {
    //get Data
    this.task = this._settingService.task;
    // this.task.subtasks = this._settingService.task.subtasks;
    this.allComplete = this._settingService.task.completed;
    // console.log(this.task.subtasks);
  }

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
    this._settingService.update(this.allComplete);
  }

  someComplete(): boolean {
    // not required
    // only show some status for Show ALL Checkbox
    //indeterminate dar html tarif shode baraye in method ke dar azaman load checkbox ha update mishavad
    if (this._settingService.task.subtasks == null) {
      return false;
    }
    return (
      this._settingService.task.subtasks.filter((t) => t.completed).length >
        0 && !this.task.completed
    );
  }

  setAll(completed: boolean) {
    this._settingService.setAll(completed);
  }
}
