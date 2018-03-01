import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleService {

  constructor(private httpClient: HttpClient) {
    this.idCount = 100;
  }
  public crate(article: Article): Observable<Article>{
    let newArticle = JSON.parse(JSON.srtingify(article));
    newArticle.id = this.idCount++;
    return Observable.of(newArticle);
  }
  public update(article: Article): Observable<Article>{
    return Observable.of(JSON.parse(JSON.srtingify(article)));
  }

  public list(): Observable<Array<Article>>{
    return this.httpClient.get<Array<Article>>('assets/articles.json')
  }
}
