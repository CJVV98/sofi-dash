import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ArticleChildren } from 'src/app/model/ArticleChildren';
import { ContentService } from 'src/app/services/content.service';
import { InfoArticleService } from 'src/app/services/infoArticle';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-more-article',
  templateUrl: './more-article.component.html',
  styleUrls: ['./more-article.component.css']
})
export class MoreArticleComponent implements OnInit {
  article!:Article;
  articleConsult=new Array<ArticleChildren>();
  articleChildren=new Array<ArticleChildren>();
  constructor(private infoArt:InfoArticleService, private router:Router, private service:ContentService) { }
  dataSource=  new MatTableDataSource<ArticleChildren>();
  displayedColums: string[] = ['title'];
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  ngOnInit(): void {
    this.article=this.infoArt.getArticle();
    setTimeout(() => {
      this.service.getArticle(this.article.id, "").subscribe((result: { article: any,articlesChildren:any },)=>{
        if (!result) {
          return;
        };
        this.article = result.article;
        this.articleChildren=result.articlesChildren;
        this.dataSource = new MatTableDataSource(this.articleChildren);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        let articleSel=new ArticleChildren();
        articleSel.id=this.article.id;
        articleSel.title=this.article.title;
        environment.mapArticle.push(articleSel);
        this.articleConsult=environment.mapArticle;
      });
    },1000);
  }
  moreArticle(article:ArticleChildren){
    let articleS=new Article();
    console.log(article, this.articleConsult);
    let index=-1;
    articleS.id=article.id;
    articleS.title=article.title;
    for(let i=0;i<this.articleConsult.length;i++){
      if(this.articleConsult[i].id==article.id){
        index=i;
        let pos=this.articleConsult.length-index;
        this.articleConsult.splice(index,pos);
        environment.mapArticle.splice(index,pos);
        break;
      }
    }
    this.infoArt.setArticle(articleS);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/usr/mas-articulo`]));
  }


}
