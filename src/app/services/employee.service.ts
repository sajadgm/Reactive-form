import {
  shareReplay,
  Subject,
  merge,
  scan,
  Observable,
  combineLatest,
  map,
  tap,
  concat,
  BehaviorSubject,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from './../interfaces/employee.interface';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements OnInit {
  // data$: Observable<IEmployee[]>;
  x!: IEmployee[];

  private allEmployeeSubject = new Subject<IEmployee[]>();
  reloadEmployeeAction$ = this.allEmployeeSubject.asObservable();
  Employees$: Observable<IEmployee[]> = this.reloadEmployeeAction$;

  //add employee
  private insertEmployeeSubject = new Subject<IEmployee>();
  insertEmployeeAction$ = this.insertEmployeeSubject.asObservable();
  EmployeeWithAdd$: Observable<IEmployee[]> = merge(
    this.Employees$,
    this.insertEmployeeAction$
  ).pipe(scan((acc: IEmployee[], value: any) => [...acc, value]));
  ////////////////end of add

  //remove employee 222222
  private deleteEmployeeSubject = new Subject<number>();
  deleteEmployeeAction$ = this.deleteEmployeeSubject.asObservable();
  EmployeeWithdelete$: Observable<IEmployee[]> = merge(
    this.Employees$,
    this.deleteEmployeeAction$
  ).pipe(
    tap((d) => console.log(d, 'sss')),
    scan((acc: IEmployee[], val: any) => {
      acc = acc.filter(function (item) {
        return item.ID !== val;
      });
      console.log(acc, 'axx');
      return this.allEmployeeSubject.next(acc);
    })
  );
  /////////end of remove

  //update employee
  private updateEmployeeSubject = new Subject<IEmployee>();
  updateEmployeeAction$ = this.updateEmployeeSubject.asObservable();
  EmployeeWithUpdate$: Observable<IEmployee[]> = combineLatest([
    this.Employees$,
    this.updateEmployeeAction$,
  ]).pipe(
    map(([allEmployees, selectedEmployees]) => {
      var x = allEmployees.filter((i) => i.ID !== selectedEmployees.ID);
      x.push(selectedEmployees);
      return x;
    })
  );
  ////////////////end of update

  // data for shown //automaticily update data when add or update done

  ////////////////end of add
  // Employees$: Observable<IEmployee[]> = merge(
  //   this.EmployeeWithAdd$,
  //   this.EmployeeWithdelete$,
  //   this.EmployeeWithUpdate$
  // ).pipe(tap((d) => console.log(d)));

  constructor(private http: HttpClient) {
    this.http.get<IEmployee[]>('/assets/mock/data.json').subscribe((res) => {
      this.allEmployeeSubject.next(res);
    });
  }

  ngOnInit() {}
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
