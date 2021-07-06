import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ArticleChildren } from 'src/app/model/ArticleChildren';
import { ContentService } from 'src/app/services/content.service';
import { InfoArticleService } from 'src/app/services/infoArticle';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  public articles!: Array<Article>;
  dataSource=  new MatTableDataSource<Article>();
  displayedColums: string[] = ['id', 'title', 'keywords','type', 'actions'];
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  color: ThemePalette = 'primary';
  constructor(private service:ContentService, private router:Router, private infoArt:InfoArticleService) { }

  ngOnInit(): void {
    environment.mapArticle=new Array<ArticleChildren>();
    this.showList();
  }


  showList(){
    this.service.consultArticles().subscribe((result: { data: Article[]; })=>{
      if(!result){
        return;
      }
    ;
      this.articles=result.data;
      this.dataSource = new MatTableDataSource(this.articles);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/usr/articulo`]));
  }

  moreArticle(article:Article){
    this.infoArt.setArticle(article);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/usr/mas-articulo`]));
  }

  changeVisibility(event: MatSlideToggleChange, user:Article){
    let article=new Article;
    article.visibility=event.checked?"1":"0";
    this.service.editVisibilityArticle(user.id,article.visibility).subscribe(()=>{
      this.showList();
    })
  }

}


