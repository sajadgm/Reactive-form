import { IEmployee } from './../../interfaces/employee.interface';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { MatTableDataSource } from '@angular/material/table';
import { map, take, tap, share, shareReplay } from 'rxjs';

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

  // dataSource!: MatTableDataSource<IEmployee>;
  data$ = this.EmService.EmployeeWithAdd$.pipe(shareReplay(1));
  constructor(private EmService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // console.log(this.EmService.data$);
    // this.EmService.data$.pipe(tap((d) => console.log(d)));
    // this.feedTable();
  }

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
        this.EmService.add(result);
        // .then((res) => {
        //   this.feedTable();
        // })
        // .catch((err) => {
        //   console.log(err, 'err');
        // });
      }
    });
  }

  editeButton(row: IEmployee): void {
    let dialogRef = this.dialog.open(AddComponent, { data: row });
    //dialog closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.EmService.update(result)
          .then((res) => {
            this.feedTable();
          })
          .catch((err) => {
            console.log(err, 'err');
          });
      }
    });
  }

  removeButton(row: number): void {
    this.EmService.remove(row).then((res) => {
      console.log(res);
      this.feedTable();
    });
  }
}
