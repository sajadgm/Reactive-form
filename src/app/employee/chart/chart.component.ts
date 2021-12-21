import { Component, OnInit } from '@angular/core';
import { Chart, registerables, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  chart: any;
  busyEmployees: number[] = [];
  freeEmployees: number[] = [];
  constructor() {}

  ngOnInit(): void {
    this.chart = document.getElementById('my-chart');
    Chart.register(...registerables);
    this.loadChart();

    setInterval(() => {
      this.randomNum();
    }, 1000);
  }

  randomNum() {
    this.busyEmployees.push(Math.floor(Math.random() * 100));
    // let lastItem =

    // this.freeEmployees.push(100 -  this.busyEmployees.pop())
  }

  public lineChartData: ChartDataset[] = [
    { data: [61, 59, 80, 65, 45, 55, 40, 56, 76, 65, 77, 60], label: 'free' },
    { data: [57, 50, 75, 87, 43, 46, 37, 48, 67, 56, 70, 50], label: 'busy' },
  ];

  loadChart(): void {
    new Chart(this.chart, {
      type: 'line',
      data: {
        datasets: this.lineChartData,
        labels: [this.freeEmployees],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              borderDash: [0.6],
            },
            beginAtZero: true,
          },
          x: {
            display: false,
          },
        },
      },
    });
  }
}
