import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Chart, registerables, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  title = 'true';

  time = new Date();
  // rxTime = new Date();
  intervalId: any;
  subscription: any;

  result: any;
  freeEmployees: number[] = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ];
  busyEmployees: number[] = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ];
  freeEmbgColor!: string;
  busyEmbgColor!: string;
  chartLabels: any[] = [
    this.time.toLocaleTimeString(),
    this.time.toLocaleTimeString(),
    this.time.toLocaleTimeString(),
    this.time.toLocaleTimeString(),
    this.time.toLocaleTimeString(),
  ];
  chart: any = [];

  constructor() {
    Chart.register(...registerables);
    setInterval(() => {
      this.time = new Date();
    }, 1);
  }

  ngOnInit(): void {
    // this.coinName.push(this.time.toLocaleTimeString());

    // this.service.criptoData().then((res) => {
    //   this.result = res;
    //   console.log(this.result);

    // });

    this.intervalId = setInterval(() => {
      this.time = new Date();
      this.handleChartData();
      this.handleChartDataBgColor();
    }, 2000);

    // Using RxJS Timer
    // this.subscription = timer(0, 2000)
    //   .pipe(
    //     map(() => new Date()),
    //     share()
    //   )
    //   .subscribe((time) => {
    //     this.rxTime = time;
    //     // console.log(time.toLocaleTimeString());
    //   });

    //show chart data
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.chartLabels, //
        datasets: [
          {
            label: 'free Em',
            data: this.freeEmployees, //
            borderWidth: 3,
            fill: false,
            backgroundColor: 'red',
            borderColor: 'red',
          },
          {
            label: 'busy Em',
            data: this.busyEmployees, //
            borderWidth: 3,
            fill: false,
            backgroundColor: 'green',
            borderColor: 'green',
          },
        ],
      },
    });
  }

  handleChartData() {
    this.chartLabels.push(this.time.toLocaleTimeString());

    let freeItem = Math.floor(Math.random() * 100);
    this.freeEmployees.push(freeItem);
    this.busyEmployees.push(100 - freeItem);

    this.chartLabels.shift();
    this.freeEmployees.shift();
    this.busyEmployees.shift();

    this.chart.update();
  }
  handleChartDataBgColor(): void {
    let calcNum = this.freeEmployees[this.freeEmployees.length - 1];
    if (calcNum <= 100 && calcNum >= 70) {
      this.freeEmbgColor = 'red';
      this.busyEmbgColor = 'red';
      return;
    } else if (calcNum < 70 && calcNum >= 40) {
      this.freeEmbgColor = 'orange';
      this.busyEmbgColor = 'orange';
      return;
    } else if (calcNum < 40 && calcNum >= 0) {
      this.freeEmbgColor = 'green';
      this.busyEmbgColor = 'green';
      return;
    }
    // this.chart.update();
  }

  // ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.chart.destroy();
    }
  }
}
