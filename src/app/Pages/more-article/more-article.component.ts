import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { InfoArticleService } from 'src/app/services/infoArticle';

@Component({
  selector: 'app-more-article',
  templateUrl: './more-article.component.html',
  styleUrls: ['./more-article.component.css']
})
export class MoreArticleComponent implements OnInit {
  article!:Article;
  constructor(private infoArt:InfoArticleService) { }

  ngOnInit(): void {

      this.article=this.infoArt.getArticle();
      console.log(this.article);
   
  }


}
