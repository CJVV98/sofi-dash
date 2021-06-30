import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { ContentService } from 'src/app/services/content.service';
import { InfoArticleService } from 'src/app/services/infoArticle';

@Component({
  selector: 'app-more-article',
  templateUrl: './more-article.component.html',
  styleUrls: ['./more-article.component.css']
})
export class MoreArticleComponent implements OnInit {
  article!:Article;
  constructor(private infoArt:InfoArticleService, private service:ContentService) { }

  ngOnInit(): void {
    this.article=this.infoArt.getArticle();
    setTimeout(() => {
      this.service.getArticle(this.article.id, this.article.state).subscribe((result: { data: Article })=>{
        if (!result) {
          return;
        };
        this.article = result.data;
        console.log(this.article.state);
      });
    },10);
  }


}
