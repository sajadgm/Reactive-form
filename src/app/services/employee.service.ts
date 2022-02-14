import {
  shareReplay,
  Subject,
  merge,
  scan,
  Observable,
  combineLatest,
  map,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from './../interfaces/employee.interface';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements OnInit {
  data$ = this.http
    .get<IEmployee[]>('/assets/mock/data.json')
    .pipe(shareReplay(1));

  //add employee
  private insertEmployeeSubject = new Subject<IEmployee>();
  insertEmployeeAction$ = this.insertEmployeeSubject.asObservable();
  EmployeeWithAdd$: Observable<IEmployee[]> = merge(
    this.data$,
    this.insertEmployeeAction$
  ).pipe(
    scan((acc: IEmployee[], value: any) => [...acc, value]),
    shareReplay(1)
  );
  ////////////////

  //update employee
  private updateEmployeeSubject = new Subject<IEmployee>();
  updateEmployeeAction$ = this.updateEmployeeSubject.asObservable();
  EmployeeWithUpdate$: Observable<IEmployee[]> = combineLatest([
    this.EmployeeWithAdd$,
    this.updateEmployeeAction$,
  ]).pipe(
    map(([allEmployees, selectedEmployees]) => {
      var x = allEmployees.filter((i) => i.ID !== selectedEmployees.ID);
      x.push(selectedEmployees);
      return x;
    }),
    shareReplay(1)
  );
  ////////////////

  //delete employee
  private deleteEmployeeSubject = new Subject<number>();
  deleteEmployeeAction$ = this.deleteEmployeeSubject.asObservable();
  EmployeeWithdelete$: Observable<IEmployee[]> = combineLatest([
    this.EmployeeWithAdd$,
    this.deleteEmployeeAction$,
  ]).pipe(
    map(([allEmployees, deletedEmployee]) => {
      var x = allEmployees.filter((i) => i.ID !== deletedEmployee);
      return x;
    }),
    shareReplay(1)
  );
  /////////

  // data for shown //automaticily update data when add or update done
  Employees$: Observable<IEmployee[]> = merge(
    this.EmployeeWithdelete$,
    this.EmployeeWithAdd$,
    this.EmployeeWithUpdate$
  ).pipe(tap((d) => console.log(d)));

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  add(newEm: IEmployee) {
    let x = this.Employees$.subscribe((d) => {
      newEm.ID = d.length + 1;
    });
    x.unsubscribe();
    this.insertEmployeeSubject.next(newEm);
  }

  update(userData: IEmployee) {
    this.updateEmployeeSubject.next(userData);
  }

  remove(Id: number) {
    this.deleteEmployeeSubject.next(Id);
    // return new Promise((resolver, reject) => {
    //   // add new user
    //   let data = this.ELEMENT_DATA;
    //   data = data.filter((item) => item.ID !== row);
    //   this.ELEMENT_DATA = data;
    //   resolver(data);
    //   reject('somthing is wrong');
    // });
  }
}
