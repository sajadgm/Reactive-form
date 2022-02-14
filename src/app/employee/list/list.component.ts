import { IEmployee } from './../../interfaces/employee.interface';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'LastName',
    'Job',
    'HireDate',
    'Role',
    'Action',
  ];

  constructor(private EmService: EmployeeService, private dialog: MatDialog) {}

  data$ = this.EmService.Employees$;

  ngOnInit(): void {}

  feedTable(): void {
    // this.dataSource = new MatTableDataSource<IEmployee>(
    //   this.EmService.ELEMENT_DATA
    // );
  }

  addButton(): void {
    let dialogRef = this.dialog.open(AddComponent, {});
    // dialog closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.EmService.add(result[0]);
      }
    });
  }

  editeButton(row: IEmployee): void {
    let dialogRef = this.dialog.open(AddComponent, { data: row });
    //dialog closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.EmService.update(result[0]);
      }
    });
  }

  removeButton(Id: number): void {
    this.EmService.remove(Id);
    // .then((res) => {
    //   this.feedTable();
    // });
  }
}
