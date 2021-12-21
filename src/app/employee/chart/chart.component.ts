import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  chart : any;
  constructor() { }

  ngOnInit(): void {
    this.chart = document.getElementById('my-chart')
    Chart.register(...registerables);
    this.loadChart()
  }


  loadChart(): void{
    new Chart(this.chart,{
      type: 'line',
      data: {
        datasets:[{
          data:[5 ,10 ,15, 20, 25,30],
          label:'series 1',
          tension: 0.2,
          backgroundColor: 'red',
          borderColor:'red'
        },
      ],
        labels:[
          0,
          2,
          4,
          6,
          7,
          8,
        ]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        scales:{
          y:{
            beginAtZero:true
          },
          x:{
            display:false
          }

        }
      }
    })
  }

}
