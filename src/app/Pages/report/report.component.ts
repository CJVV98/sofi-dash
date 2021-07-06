import { Component, OnInit, } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { Article } from 'src/app/model/Article';
import { RFavorite } from 'src/app/model/RFavorite';
import { RKeyword } from 'src/app/model/RKeyword';
import { RUser } from 'src/app/model/RUser';
import { ReportService } from 'src/app/services/report.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  articles= new Array<Article>();
  keywordRepo=new Array<RKeyword>();
  articlesFav= new Array<RFavorite>();
  userReport= new Array<RUser>();
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [[12,12,12,12]];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartOptions={
    title:{
        text:"Articulos vs Score",
        display:true
    }
  }
  doughnutChartLabels1: Label[] = [];
  doughnutChartData1: MultiDataSet = [[12,12,12,12]];
  doughnutChartType1: ChartType = 'doughnut';
  doughnutChartOptions1={
    title:{
        text:"Articulos vs Favoritismo",
        display:true
    }
  }
  doughnutChartLabels2: Label[] = [];
  doughnutChartData2: MultiDataSet = [[12,12,12,12]];
  doughnutChartType2: ChartType = 'doughnut';
  doughnutChartOptions2={
    title:{
        text:"Creacion de usuarios",
        display:true
    }
  }
  doughnutChartLabels3: Label[] = [];
  doughnutChartData3: MultiDataSet = [[12,12,12,12]];
  doughnutChartType3: ChartType = 'doughnut';
  doughnutChartOptions3={
    title:{
        text:"Palabras mas usadas",
        display:true
    }
  }

  colors: Color[] = [
    {
      backgroundColor: this.loadColor(50),
    }
  ];
  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
     this.loadScore();
     this.loadFavorite();
     this.loadUser();
     this.loadKeyword();
  }
  loadScore(){
    let multidataSet=new Array<number[]>();
    let score=new Array<number>();
    let label=new Array<string>();
    this.reportService.consultScore(1).subscribe((result: { data: any; })=>{
      if(!result){
        return;
      };
      this.articles=result.data.articlesscorereport;
      this.articles.forEach(element => {
          
          label.push(element.title);
          score.push(Number.parseInt(element.total_score.toString()));
      });
      this.loadColor(score.length)
      multidataSet.push(score);
      this.doughnutChartData=multidataSet; 
      this.doughnutChartLabels=label;   
    });
  }
  loadFavorite(){
    let multidataSet=new Array<number[]>();
    let score=new Array<number>();
    let label=new Array<string>();
    this.reportService.consultFavorite(1).subscribe((result: { data: any; })=>{
      if(!result){
        return;
      };
      this.articlesFav=result.data.report;
      console.log(this.articlesFav);
      this.articlesFav.forEach(element => {
        if(element.ammountfavorites>0){
          label.push(element.article.title);
          score.push(Number.parseInt(element.ammountfavorites.toString()));
        }
      });
      multidataSet.push(score);
      this.doughnutChartData1=multidataSet; 
      this.doughnutChartLabels1=label;   
    });
  }


  loadUser(){
    let multidataSet=new Array<number[]>();
    let score=new Array<number>();
    let label=new Array<string>();
    this.reportService.consultUser(1).subscribe((result: { data: any; })=>{
      if(!result){
        return;
      };
      this.userReport=result.data.usersregisteredreport;
      this.userReport.forEach(element => { 
          label.push(element.period);
          score.push(Number.parseInt(element.ammountusers.toString()));

      });
      multidataSet.push(score);
      this.doughnutChartData2=multidataSet; 
      this.doughnutChartLabels2=label;   
    });
  }

  loadKeyword(){
    let multidataSet=new Array<number[]>();
    let score=new Array<number>();
    let label=new Array<string>();
    this.reportService.consultKeyword(0).subscribe((result: { data: any; })=>{
      if(!result){
        return;
      };
      
      this.keywordRepo=result.data;
      console.log(this.keywordRepo);
      this.keywordRepo.forEach(element => {
          
          label.push(element.keywordname);
          score.push(Number.parseInt(element.ammountarticles.toString()));
      });
      this.loadColor(score.length)
      multidataSet.push(score);
      this.doughnutChartData3=multidataSet; 
      this.doughnutChartLabels3=label;   
    });
  }

  loadColor(size:number):any{ 
      let letters = '0123456789ABCDEF';
      let col=new Array<string>();
      col.push("#1B4F72");col.push("#4D5656");
      col.push("#2874A6");col.push("#DC7633");
      col.push("#34495E");col.push("#1B4F72");
      col.push("#616A6B");col.push("#1B4F72");
      col.push("#148F77");col.push("#1B4F72");
      col.push("#B03A2E");col.push("#1B4F72");
      col.push("#A9CCE3");col.push("#1B4F72");
      col.push("#85929E");col.push("#1B4F72");
      return col;
  }
}