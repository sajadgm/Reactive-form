import { share, tap, shareReplay } from 'rxjs';
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
    tap((d) => console.log(d, 'd'))
    // shareReplay(1)
  );

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  add(newEm: IEmployee[]): Promise<unknown> {
    let newVal = newEm[0];
    return new Promise((resolver, reject) => {
      // add new user
      let data = this.ELEMENT_DATA;
      newVal.ID = data.length + 1;
      data.push(newVal);
      this.ELEMENT_DATA = data;
      resolver(newVal);
      reject('somthing is wrong');
    });
  }

  update(userData: any[]) {
    //index 0 is user new data from form
    //index 1 is id of that user
    return new Promise((resolver, reject) => {
      let user = userData[0]; // user data

      let data = this.ELEMENT_DATA.map((item, index) => {
        if (item.ID === userData[1]) {
          //user Id
          item = {
            ID: userData[1],
            LastName: user.LastName,
            Job: user.Job,
            HireDate: user.HireDate,
            Role: user.Role,
          };
        }
        return item;
      });
      this.ELEMENT_DATA = data;
      resolver(data);
      reject('somthing is wrong');
    });
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
