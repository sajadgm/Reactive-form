import { IEmployee } from './../../interfaces/employee.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  newEmployee!: IEmployee;

  profileForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployee
  ) {}

  ngOnInit(): void {
    //ساخت یک فرم
    // let newEmId = this.EmService.ELEMENT_DATA.length; //تعیین آیدی کاربر جدید
    this.profileForm = this.formBuilder.group({
      ID: [],
      LastName: ['', Validators.required],
      Job: ['', Validators.required],
      HireDate: ['', Validators.required],
      Role: ['', Validators.required],
    });

    //تغییر ولیدیتور ها برای هر سلکت ها
    this.profileForm.get('Role')?.valueChanges.subscribe((response) => {
      if (response === 'guest') {
        this.profileForm.get('Job')?.clearValidators();
        this.profileForm.get('Job')?.updateValueAndValidity();
      } else {
        this.profileForm.get('Job')?.setValidators(Validators.required);
        this.profileForm.get('Job')?.updateValueAndValidity();
      }
    });

    //وجود دیتا برای ویرایش
    if (this.data) {
      this.profileForm = this.formBuilder.group({
        ID: [this.data.ID],
        LastName: [this.data.LastName, Validators.required],
        Job: [this.data.Job, Validators.required],
        HireDate: [new Date(this.data.HireDate), Validators.required],
        Role: [this.data.Role, Validators.required],
      });
    }
  }

  saveForm(): void {
    this.dialog.close([this.profileForm.value, this.profileForm.value.ID]); //arg 1 = Value , arg 2 = ID
  }

  dismiss(): void {
    this.dialog.close(null);
  }
}
