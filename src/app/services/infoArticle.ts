import { Injectable } from "@angular/core";
import { Article } from "../model/Article";

@Injectable({
    providedIn: 'root'
  })
export class InfoArticleService {
    private article!: Article;
    private state!: boolean;

    setState(state:boolean) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    setArticle(article:Article) {
        this.article = article;
    }

    getArticle() {
        return this.article;
    }
}
