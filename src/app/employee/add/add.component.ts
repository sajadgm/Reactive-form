import { EmployeeService } from './../../services/employee.service';
import { IEmployee } from './../../interfaces/employee.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {  MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  newEmployee!:IEmployee

  profileForm!: FormGroup
  constructor(
    private formBuilder : FormBuilder,
    private dialog : MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployee,
  ) { }




  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
        ID : [],
        LastName:['',Validators.required],
        Job:['',Validators.required],
        HireDate:['',Validators.required],
        Role:['',Validators.required],
      })

    //تغییر ولیدیتور ها برای هر سلکت ها
    this.profileForm.get('Role')?.valueChanges.subscribe(response =>{
      if (response === 'guest') {
        this.profileForm.get('Job')?.clearValidators();
        this.profileForm.get('Job')?.updateValueAndValidity();
      }else{
        this.profileForm.get('Job')?.setValidators(Validators.required);
        this.profileForm.get('Job')?.updateValueAndValidity();

      }
    })

    if(this.data){
      this.profileForm = this.formBuilder.group({
        ID:[],
        LastName:[this.data.LastName, Validators.required],
        Job:[this.data.Job , Validators.required],
        HireDate:[ this.data.HireDate , Validators.required],
        Role: [this.data.Role , Validators.required],
      })
    }
  }



  saveForm():void{
    if(this.profileForm.valid){
      this.dialog.close([this.profileForm.value,this.data.ID])
    }

    // this.dialog.close(form)
  }

  dismiss() : void{
    this.dialog.close(null)
  }
}
