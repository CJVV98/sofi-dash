import { Component, OnInit, } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { Article } from 'src/app/model/Article';
import { ReportService } from 'src/app/services/report.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  articles= new Array<Article>();
  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
     this.loadScore();
  }
  loadScore(){
    this.reportService.consultScore(1).subscribe((result: { data: any; })=>{
      if(!result){
        return;
      };
      this.articles=result.data.articlesscorereport;
    });
  }
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    []
  ];
  doughnutChartType: ChartType = 'doughnut';
}