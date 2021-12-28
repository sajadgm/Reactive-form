import { ITask } from './../../interfaces/settings.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  time = new Date();
  // rxTime = new Date();
  intervalId: any;
  subscription: any;

  freeLabelVisibility!: boolean;
  busyLabelVisibility!: boolean;
  ChartVisibility!: boolean;

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
  chartLabels: any[] = [
    this.time.toLocaleTimeString(),
    this.time.toLocaleTimeString(),
    this.time.toLocaleTimeString(),
    this.time.toLocaleTimeString(),
    this.time.toLocaleTimeString(),
  ];
  freeEmbgColor!: string;
  busyEmbgColor!: string;

  chart: any = [];

  constructor(private _settingService: SettingsService) {
    //config
    Chart.register(...registerables);
    setInterval(() => {
      this.time = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.ShowChart();

    // set setting
    this._settingService.task.subtasks?.map((item) => {
      switch (item.id) {
        case 'chart':
          this.ChartVisibility = item.completed;
          if (!item.completed) {
            this.chart.destroy();
          }
          break;
        case 'free':
          this.freeLabelVisibility = item.completed;
          break;
        case 'busy':
          this.busyLabelVisibility = item.completed;
          break;
      }
    });

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
  }

  ShowChart() {
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

    //نمیشد برای canvas
    //از
    //ng-if استفاده کنیم
    //ارور چرتی میداد
    if (this.ChartVisibility) {
      this.chart.update();
    }
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
    //در صورت استفاده از  rxjs timer
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
    this.chart.destroy();
  }
}
