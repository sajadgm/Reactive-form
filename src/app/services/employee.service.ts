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
  ELEMENT_DATA: IEmployee[] = [
    {
      ID: 1,
      LastName: 'rezaei',
      Job: 'employer',
      HireDate: '12/23/2021',
      Role: 'manager',
    },
    {
      ID: 2,
      LastName: 'ghafori',
      Job: 'employer',
      HireDate: '12/23/2021',
      Role: 'guest',
    },
    {
      ID: 3,
      LastName: 'jafari',
      Job: 'employer',
      HireDate: '12/23/2021',
      Role: 'customer',
    },
  ];

  data$ = this.http.get<IEmployee[]>('/assets/mock/data.json').pipe(
    // tap((d) => console.log(d, 'd'))
    shareReplay(1)
  );

  //add employee subject

  //add employee subject
  private insertEmployeeSubject = new Subject<IEmployee>();
  insertEmployeeAction$ = this.insertEmployeeSubject.asObservable();

  EmployeeWithAdd$: Observable<IEmployee[]> = merge(
    this.data$,
    this.insertEmployeeAction$
  ).pipe(
    // tap((d) => console.log(d, 'add')),
    scan(
      (acc: IEmployee[], value: any) => [...acc, value]
      // {
      //   if (value.ID) {
      //     var x = acc.filter((i) => i.ID !== value.ID);
      //     x.push(value);
      //     acc = x;
      //     console.log([...acc], 'res');

      //     [...acc];
      //   } else {
      //     console.log(value, 'else');
      //     // value.ID =

      //     [...acc, value];
      //   }
      // }
    ),
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
    tap((log) => console.log('selectedProduct', log))
  );

  ////////////////
  private EmployeeSubject = new Subject<IEmployee>();
  EmployeeAction$ = this.EmployeeSubject.asObservable();

  Employees$: Observable<IEmployee[]> = merge(
    this.EmployeeWithAdd$,
    this.EmployeeWithUpdate$
  );

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  add(newEm: IEmployee[]) {
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
    this.insertEmployeeSubject.next(newEm[0]);
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
    return new Promise((resolver, reject) => {
      // add new user
      let data = this.ELEMENT_DATA;
      data = data.filter((item) => item.ID !== row);
      this.ELEMENT_DATA = data;
      resolver(data);
      reject('somthing is wrong');
    });
  }
}
