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
    })
  );
  ////////////////

  // data for shown //automaticily update data when add or update done
  Employees$: Observable<IEmployee[]> = merge(
    this.EmployeeWithAdd$,
    this.EmployeeWithUpdate$
  ).pipe(tap((d) => console.log(d)));

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  add(newEm: IEmployee) {
    // let newVal = newEm[0];
    // return new Promise((resolver, reject) => {
    //   // add new user
    //   let data = this.ELEMENT_DATA;
    //   newVal.ID = data.length + 1;
    //   data.push(newVal);
    //   this.ELEMENT_DATA = data;
    //   resolver(newVal);
    //   reject('somthing is wrong');
    // });
    //data length for find new user ID
    // let newUserId;
    let x = this.Employees$.subscribe((d) => {
      newEm.ID = d.length + 1;
    });
    x.unsubscribe();

    this.insertEmployeeSubject.next(newEm);
  }

  update(userData: IEmployee[]) {
    //index 0 is user new data from form
    //index 1 is id of that user
    // return new Promise((resolver, reject) => {
    // this.updateEmployeeSubject.next(userData[0]);
    this.updateEmployeeSubject.next(userData[0]);

    // let data = this.ELEMENT_DATA.map((item, index) => {
    //   if (item.ID === userData[1]) {
    //     //user Id
    //     item = {
    //       ID: userData[1],
    //       LastName: user.LastName,
    //       Job: user.Job,
    //       HireDate: user.HireDate,
    //       Role: user.Role,
    //     };
    //   }
    //   return item;
    // });
    // this.ELEMENT_DATA = data;
    // resolver(data);
    // reject('somthing is wrong');
    // });
  }

  remove(row: number) {
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
