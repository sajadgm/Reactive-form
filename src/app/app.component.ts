import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy {
  title = 'form-Doc';




  public intervalSubscription!: Subscription


  ngOnInit(): void {

  }






  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe()
  }








}

