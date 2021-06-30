import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
 // Doughnut
 public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 public doughnutChartData: MultiDataSet = [
   [350, 450, 100],
   [50, 150, 120],
   [250, 130, 70],
 ];
 public doughnutChartType: ChartType = 'doughnut';

 constructor() { }

 ngOnInit(): void {
 }

 // events
 public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
   console.log(event, active);
 }

 public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
   console.log(event, active);
 }
}